import { useEffect } from "react";

/**
 * @description A hook to call a function when a click event occurs outside a specified element
 * @param {React.RefObject<HTMLElement>} ref The reference to the element to check if the click event occurred outside
 * @param {(event: MouseEvent | TouchEvent) => void} handler The function to call when the click event occurs outside the element
 *
 * @example```tsx
 * const ref = useRef(null);
 * useOnClickOutside(ref, () => console.log("Clicked outside!"));
 *
 * return <div ref={ref}>Click outside me!</div>;
 * ```
 */

function useOnClickOutside(
	ref: React.RefObject<HTMLElement>,
	handler: (event: MouseEvent | TouchEvent) => void
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
