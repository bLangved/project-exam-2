import { useCallback, useContext } from "react";
import { UserProfileContext } from "../contexts/ProfileDataContext";

/**
 * Custom hook for POST, PUT, and DELETE operations to an API.
 * @param {string} url - The endpoint URL for the API.
 * @param {string} method - Request operation, like GET, POST, PUT or DELETE.
 * @param {object} data - Object data.
 */

function useManageUser(url) {
  const { userData, setUserData } = useContext(UserProfileContext);
  const sendRequest = useCallback(
    async (method, data = null) => {
      const apikey = import.meta.env.VITE_API_KEY;
      const accessToken = userData.accessToken;

      if (!accessToken) {
        console.error("Access token is missing");
        throw new Error("Access token is missing");
      }

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
        } else if (response.status === 204) {
          return response.status;
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
