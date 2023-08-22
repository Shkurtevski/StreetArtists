export const store = {};

export function setToStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStore(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export const extractArtistNameFromPath = (extractArtistNameFromPath) => {
  const pathParts = window.location.pathname.split("/");
  const artistNameIndex = pathParts.indexOf("artist") + 2;
  return decodeURIComponent(pathParts[artistNameIndex]);
};