let timeout = 0;

export const debounce = (func, time) => {
  clearTimeout(timeout);
  timeout = setTimeout(func, time);
};

export default debounce;
