import { useState } from "react";

/**
 * Custom hook for sending data to an API.
 * Supports POST, PUT, and DELETE operations, especially for user profiles.
 *
 * @param {string} url - The endpoint URL for the API.
 */
function useManageUser(url) {
  const sendRequest = async (method, data) => {
    const config = {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        const responseBody = await response.json();
        error.responseBody = responseBody;
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  return { sendRequest };
}

export default useManageUser;