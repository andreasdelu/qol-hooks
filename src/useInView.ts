import { useCallback, useEffect, useRef, useState } from "react";

/**
 * @description Hook to detect if an element is in view
 * @param {IntersectionObserverInit} options - Options for the IntersectionObserver
 * @param {(inView: boolean, entry: IntersectionObserverEntry) => void = () => {}} onIntersection - Callback function to be called when the element is in view
 *
 * @returns {[React.MutableRefObject<HTMLDivElement>, boolean]} - Returns a ref and a boolean value indicating if the element is in view
 *
 * @example
 * ```tsx
 * const App = () => {
 *  const [ref, inView] = useInView({ threshold: 0.5 });
 *
 * return (
 * <div ref={ref}>
 * {inView ? "In view" : "Not in view"}
 * </div>
 * )};
 * ```
 */

function useInView(
	options: IntersectionObserverInit,
	onIntersection: (
		inView: boolean,
		entry: IntersectionObserverEntry
	) => void = () => {}
): [React.MutableRefObject<HTMLDivElement | undefined>, boolean] {
	const ref = useRef<HTMLDivElement | undefined>();
	const [inView, setInView] = useState(false);

	const callbackFunction = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setInView(true);
					onIntersection(true, entry);
				} else {
					setInView(false);
					onIntersection(false, entry);
				}
			});
		},
		[onIntersection]
	);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(callbackFunction, options);

		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [ref, options, callbackFunction]);

	return [ref, inView] as const;
}

export default useInView;
