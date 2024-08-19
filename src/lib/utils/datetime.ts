export function getDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function getDateAndTime(date: string) {
  return new Date(date).toLocaleString("en-GB");
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
