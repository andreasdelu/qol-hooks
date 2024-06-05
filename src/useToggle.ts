import { useState, useCallback } from "react";

/**
 * @description A hook to toggle a boolean value
 * @param {boolean} initialValue The initial value of the boolean
 * @returns {[boolean, (value: boolean) => void]} A tuple containing the boolean value and a function to toggle the value
 *
 * @example```tsx
 * const [value, toggleValue] = useToggle();
 *
 * <button onClick={toggleValue}>Toggle</button>
 * {value && <div>Visible</div>}
 * ```
 */

function useToggle(
	initialValue: boolean = false
): [boolean, (value: boolean) => void] {
	const [value, setValue] = useState<boolean>(initialValue);
	const toggleValue = useCallback(() => {
		setValue((prevValue) => !prevValue);
	}, []);
	return [value, toggleValue];
}

export default useToggle;
