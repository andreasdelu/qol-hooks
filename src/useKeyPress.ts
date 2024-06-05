import { useState, useEffect } from "react";

/**
 * Custom hook to detect if a specific key is pressed.
 * @param {string} targetKey - The key to detect.
 * @returns {boolean} Whether the key is currently pressed or not.
 *
 * @example```tsx
 * const Component = () => {
 *   const isKeyPressed = useKeyPress("Enter");
 *
 *  return (
 *   <div>
 *    {isKeyPressed ? "Enter key is pressed" : "Enter key is not pressed"}
 *  </div>
 * )};
 * ```
 */
function useKeyPress(targetKey: string): boolean {
	const [keyPressed, setKeyPressed] = useState<boolean>(false);

	function downHandler(event: KeyboardEvent): void {
		if (event.key === targetKey) {
			setKeyPressed(true);
		}
	}

	function upHandler(event: KeyboardEvent): void {
		if (event.key === targetKey) {
			setKeyPressed(false);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	}, []);

	return keyPressed;
}

export default useKeyPress;
