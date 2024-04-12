export default function sliceDescription(text) {
  let slicedText = "";

  if (text.length >= 75) {
    slicedText = text.slice(0, 75) + "...";
  } else {
    slicedText = text.slice(0, 75);
  }
  return slicedText;
}
