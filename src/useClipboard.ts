import { useState, useCallback } from "react";

/**
 * Custom hook for copying text to the clipboard.
 * @returns An array containing a boolean indicating whether the text has been copied and a function to copy text to the clipboard.
 *
 * @example```tsx
 * const Component = () => {
 *   const [copied, copy] = useClipboard();
 *
 *  return (
 *  <div>
 *   <button onClick={() => copy("Hello, World!")}>Copy</button>
 *  {copied && <p>Copied to clipboard!</p>}
 * </div>
 * )};
 * ```
 */
function useClipboard(): [boolean, (text: string) => void] {
	const [copied, setCopied] = useState(false);

	/**
	 * Copies the specified text to the clipboard.
	 * @param text The text to be copied.
	 */
	const copy = useCallback((text: string) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		}
	}, []);

	return [copied, copy];
}

export default useClipboard;
