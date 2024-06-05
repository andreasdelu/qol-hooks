import { useEffect, useRef } from "react";

/**
 * @description A hook to call a function after a specified delay
 * @param {() => void} callback The function to call after the specified delay
 * @param {number | null | undefined} delay The delay in milliseconds
 *
 * @example```tsx
 * useTimeout(() => console.log("Hello, World!"), 1000); // Logs "Hello, World!" after 1 second
 * ```
 */

function useTimeout(callback: () => void, delay: number | null | undefined) {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}
		if (delay !== null && delay !== undefined) {
			const id = setTimeout(tick, delay);
			return () => clearTimeout(id);
		}
	}, [delay]);
}

export default useTimeout;
