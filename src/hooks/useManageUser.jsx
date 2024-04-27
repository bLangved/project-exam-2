import { useCallback } from "react";

/**
 * Custom hook for POST, PUT, and DELETE operations to an API.
 * @param {string} url - The endpoint URL for the API.
 * @param {string} method - Request operation, like GET, POST, PUT or DELETE.
 * @param {object} data - Object data.
 */
function useManageUser(url) {
  const sendRequest = useCallback(
    async (method, data = null) => {
      const apikey = import.meta.env.VITE_API_KEY;
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apikey,
        },
        body: data ? JSON.stringify(data) : null,
      };

      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          const error = response;
          console.log(error);
          throw error;
        } else {
          return await response.json();
        }
      } catch (error) {
        console.log(error);
        console.error("API error:", error);
        throw error;
      }
    },
    [url]
  );

  return { sendRequest };
}

export default useManageUser;
