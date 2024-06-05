import { useState, useEffect } from "react";

/**
 * Custom hook to track the online status of the user.
 * @returns {boolean} The online status of the user.
 *
 * @example```tsx
 * const Component = () => {
 *  const isOnline = useOnlineStatus();
 *
 * return (
 *  <div>
 *      {isOnline ? "Online" : "Offline"}
 *  </div>
 * )};
 * ```
 */
function useOnlineStatus(): boolean {
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	useEffect(() => {
		/**
		 * Event handler for the 'online' event.
		 */
		const handleOnline = (): void => setIsOnline(true);

		/**
		 * Event handler for the 'offline' event.
		 */
		const handleOffline = (): void => setIsOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return isOnline;
}

export default useOnlineStatus;
