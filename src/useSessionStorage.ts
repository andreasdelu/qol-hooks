import { useState } from "react";

/**
 * @description A hook to store or get a value in sessionStorage
 *
 * @param {string} key The key to store the value in sessionStorage
 * @param {string} initialValue The initial value to store in sessionStorage
 * @returns {[string, (value: string) => void]} A tuple containing the stored value and a function to set the value
 *
 * @example```tsx
 * const [value, setValue] = useSessionStorage
 *
 * setValue("Hello, World!");
 * console.log(value); // Hello, World!
 * ```
 */

function useSessionStorage(
	key: string,
	initialValue: string
): [string, (value: string) => void] {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.sessionStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: string | ((value: string) => void)) => {
		if (typeof window === "undefined") return;
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}

export default useSessionStorage;
