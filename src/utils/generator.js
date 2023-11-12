export function randomInt(min = 10, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randomPercen = () =>
  Math.floor(Math.random() * (100 - 10 + 1) + 10);

export const getBlobRadius = () =>
  `${randomPercen()}% ${randomPercen()}% ${randomPercen()}% ${randomPercen()}% / ${randomPercen()}% ${randomPercen()}% ${randomPercen()}% ${randomPercen()}%`;

export function generateTime(time) {
  let now = time ? new Date(time) : new Date();
  let month = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ][now.getMonth()];
  let amOrPm = now.getHours() > 12 ? "PM" : "AM";

  return `${month} ${now.getDate().toString().padStart(2)} ${now
    .getHours()
    .toString()
    .padStart(2)}:${now.getMinutes().toString().padStart(2)} ${amOrPm}`;
}

export function generateID(len = 10) {
  let chars = "abcdefghijllmnopqrstuvwxyz0123456789".split("");
  let result = "";

  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}