export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key) || null);

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
