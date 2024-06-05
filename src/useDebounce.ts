import { useState, useEffect } from "react";

type DebouncedValue =
	| number
	| string
	| boolean
	| object
	| number[]
	| string[]
	| boolean[]
	| object[];

/**
 * @description A hook to debounce a value
 *
 * @param {DebouncedValue} value The value to debounce
 * @param {number} delay The delay in milliseconds
 *
 * @returns {DebouncedValue} The debounced value
 *
 * @example```tsx
 * const debouncedValue = useDebounce(value, 1000);
 * console.log(debouncedValue); // The debounced value
 * ```
 */

function useDebounce(value: DebouncedValue, delay: number): DebouncedValue {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
