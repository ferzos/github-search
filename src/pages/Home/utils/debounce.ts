export const debounce = <T>(cb: (args?: T) => void, delay = 300) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: T[]) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
