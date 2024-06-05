import { useEffect, useRef } from "react";

/**
 * @description A hook to add an event listener to an element
 *
 * @param {keyof WindowEventMap} eventName The event name
 * @param {(event: Event) => void} handler The event handler
 * @param {HTMLElement | Window} element The element to add the event listener to
 *
 */

function useEventListener(
	eventName: keyof WindowEventMap | string,
	handler: (event: Event) => void,
	element: HTMLElement | Window = window
) {
	const savedHandler = useRef<(event: Event) => void>();

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const isSupported = element && element.addEventListener;
		if (!isSupported) return;

		const eventListener = (event: Event) => savedHandler.current!(event);
		element.addEventListener(eventName, eventListener);

		return () => {
			element.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}

export default useEventListener;
