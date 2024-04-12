import { useState, useEffect } from "react";

/**
 * Custom hook for fetching data from an API.
 * Supports fetching single or multiple entries, or performing a search query.
 *
 * @param {string} baseUrl - URL endpoint of the API.
 * @param {string} [searchQuery] - Optional search query for filtering results.
 * @param {object} [config] - Optional configuration object for additional parameters.
 */
function useApi(baseUrl, searchQuery = "", config = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      const url = searchQuery
        ? `${baseUrl}&search=${encodeURIComponent(searchQuery)}`
        : baseUrl;

      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (isMounted) {
          const items = Array.isArray(result.data)
            ? result.data
            : [result.data];
          const filteredData = searchQuery
            ? items.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : items;
          setData(filteredData);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Fetching error:", error);
          setIsError(true);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [baseUrl, searchQuery, JSON.stringify(config)]);

  return { data, isLoading, isError };
}

export default useApi;
