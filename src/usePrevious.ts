import { useRef, useEffect } from "react";

/**
 * @description A hook to get the previous value of a variable
 * @param {any} value The value to get the previous value of
 * @returns {any} The previous value of the variable
 *
 * @example```tsx
 * const [value, setValue] = useState(0);
 * const previousValue = usePrevious(value);
 * setValue(1);
 * console.log(previousValue); // 0
 * ```
 */

function usePrevious(value: any): any {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

export default usePrevious;
