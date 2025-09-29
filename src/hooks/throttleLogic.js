function throttle(callback, limit = 1000) {
  let inThrottle = false;
  let lastArgs = null;

  return (...args) => {
    lastArgs = args;

    if (!inThrottle) {
      callback(...lastArgs);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (lastArgs !== null) {
          callback(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    }
  };
}
