import { useState } from "react";

/**
 * @description A hook to store or get a value in localStorage
 *
 * @param {string} key The key to store the value in localStorage
 * @param {string} initialValue The initial value to store in localStorage
 * @returns {[string, (value: string) => void]} A tuple containing the stored value and a function to set the value
 *
 * @example```tsx
 * const [value, setValue] = useLocalStorage
 *
 * setValue("Hello, World!");
 * console.log(value); // Hello, World!
 * ```
 */

function useLocalStorage(
	key: string,
	initialValue: string
): [string, (value: string) => void] {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: string | ((value: string) => void)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
