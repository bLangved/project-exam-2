/**
 * Custom hook for registering and logging in user.
 *
 * @param {string} url - The endpoint URL for the API.
 */
function useRegisterLogin(url) {
  const sendRequest = async (method, data) => {
    const config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = response;
        throw error;
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  return { sendRequest };
}

export default useRegisterLogin;
