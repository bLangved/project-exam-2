export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}.${month} ${year}`;
}

export function daysSince(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const timeDiff = today - date;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}
