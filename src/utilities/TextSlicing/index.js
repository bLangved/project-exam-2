/**
 *
 * @param {string} text Text thats going to be sliced
 * @param {number} limit Amount of words before text slice
 * @returns A string with text sliced off, and "..." at the end
 */
export default function sliceText(text, limit) {
  if (text == null) {
    return "";
  }

  let slicedText = "";

  if (text.length >= limit) {
    slicedText = text.slice(0, limit) + "...";
  } else {
    slicedText = text.slice(0, limit);
  }
  return slicedText;
}
