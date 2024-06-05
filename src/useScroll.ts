import { useEffect, useState } from "react";

/**
 * Custom hook that tracks the scroll position of the window.
 * @returns {number} The current scroll position in pixels.
 *
 * @example```tsx
 * const Component = () => {
 * const scrollPosition = useScroll();
 *
 * return (
 * <div>
 * <p>Scroll Position: {scrollPosition}</p>
 * </div>
 * )};
 * ```
 */
function useScroll(): { x: number; y: number } {
	const [scrollPosition, setScrollPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		const handleScroll = () => {
			setScrollPosition({
				x: window.scrollX,
				y: window.scrollY,
			} as { x: number; y: number });
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
}

export default useScroll;
