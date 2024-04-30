import { useCallback } from "react";

function useFetchSearchQueries(baseUrl) {
  const fetchData = useCallback(
    async (query) => {
      const url = `${baseUrl}q=${encodeURIComponent(query)}`;
      console.log(url); // For debugging purposes, you can see the complete URL
      const apikey = import.meta.env.VITE_API_KEY;
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apikey,
        },
      };

      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
    [baseUrl]
  );

  return { fetchData };
}

export default useFetchSearchQueries;
