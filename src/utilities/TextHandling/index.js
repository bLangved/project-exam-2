/**
 * @description Takes a string as a parameter, and replaces special characters with a space.
 * @param {string} input
 * @returns A string
 */
export function replaceSpecialCharacters(input) {
  const text = input;
  const pattern = /[,.\-_]/g;

  return text.replace(pattern, " ");
}

export function capitalizeWords(input) {
  const text = input;
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
