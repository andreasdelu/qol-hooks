import { useState, useEffect } from "react";

type FetchResult = [any | null, boolean, Error | null];

/**
 * @description A hook to fetch data from an API
 * @param {string | (() => string)} url The URL to fetch data from
 * @param {RequestInit} options The fetch options
 * @returns {FetchResult} The data, loading state, and error
 *
 * @example```tsx
 * const [data, loading, error] = useFetch("https://api.example.com/data", {
 * 	method: "GET",
 * 	headers: {
 * 		"Content-Type": "application/json",
 * 	},
 * });
 * if (loading) {
 * 	return <p>Loading...</p>;
 * }
 * if (error) {
 * 	return <p>Error: {error.message}</p>;
 * }
 * return <pre>{JSON.stringify(data, null, 2)}</pre>;
 * ```
 */

function useFetch(
	url: string | (() => string),
	options: RequestInit
): FetchResult {
	const [data, setData] = useState<any | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const fetchUrl = typeof url === "function" ? url() : url;
				const response = await fetch(fetchUrl, options);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const result = await response.json();
				setData(result);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				} else {
					setError(new Error(String(error)));
				}
			}
			setLoading(false);
		};
		fetchData();
	}, [url, options]);

	return [data, loading, error];
}

export default useFetch;
