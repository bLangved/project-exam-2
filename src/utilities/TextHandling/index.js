/**
 * @description Takes a string as a parameter, and replaces special characters with a space.
 * @param {string} input
 * @returns A string
 */
export function replaceSpecialCharacters(input) {
  if (!input) return input;
  const text = input;
  const pattern = /[,.\-_]/g;

  return text.replace(pattern, " ");
}

/**
 * @description Takes a string as a parameter, and capitalizes the first letter of each word.
 * @param {string} input
 * @returns A string
 */
export function capitalizeWords(input) {
  if (!input) return input;
  const text = input;
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
