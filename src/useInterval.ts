import { useEffect, useRef } from "react";

/**
 * @description A hook to call a function at a specified interval
 * @param {() => void} callback The function to call at the specified interval
 * @param {number | null | undefined} delay The delay in milliseconds
 *
 * @example```tsx
 * useInterval(() => console.log("Hello, World!"), 1000); // Logs "Hello, World!" every second
 * ```
 */

function useInterval(callback: () => void, delay: number | null | undefined) {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}
		if (delay !== null && delay !== undefined) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default useInterval;
