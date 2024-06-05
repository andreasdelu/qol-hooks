import { useState, useEffect } from "react";

type WindowSize = {
	width: number | undefined;
	height: number | undefined;
};

/**
 * @description A hook to get the current window size
 * @returns {WindowSize} The current window size
 *
 * @example ```tsx
 * const { width, height } = useWindowSize();
 * return (
 * 		<p>
 * 			Window width: {width}, window height: {height}
 *		</p>
 * );
 * ```
 */

function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Don't run this code on the server
		if (typeof window === "undefined") return;

		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

export default useWindowSize;
