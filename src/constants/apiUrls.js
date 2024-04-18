export const API_BASE_URL = "https://v2.api.noroff.dev/holidaze/";
export const SEARCH_ENDPOINT = `${API_BASE_URL}?search=`;
export const API_AUTH_ENDPOINT = "https://v2.api.noroff.dev/auth/";

export function PRODUCT_ENDPOINT(id) {
  const url = `${API_BASE_URL}${id}`;
  return url;
}
