import { useState, useRef, useEffect, RefObject } from "react";

/**
 * Custom hook to track hover state of an element.
 * @returns A tuple containing a ref object and a boolean indicating whether the element is hovered.
 *
 * @example```tsx
 * const Component = () => {
 *    const [hoverRef, isHovered] = useHover();
 *
 *   return (
 *     <div ref={hoverRef}>
 *      {isHovered ? "Hovered" : "Not Hovered"}
 *    </div>
 * )};
 * ```
 */
function useHover(): [RefObject<HTMLElement>, boolean] {
	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef<HTMLElement>(null);

	const handleMouseOver = () => setIsHovered(true);
	const handleMouseOut = () => setIsHovered(false);

	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener("mouseover", handleMouseOver);
			node.addEventListener("mouseout", handleMouseOut);

			return () => {
				node.removeEventListener("mouseover", handleMouseOver);
				node.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, [ref.current]);

	return [ref, isHovered];
}

export default useHover;
