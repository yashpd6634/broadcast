const { useEffect } = require("react");

function useDebounce(callback, delay) {
  let timeoutRef = useRef(undefined);

  const callbackFunction = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return callbackFunction;
}

export default useDebounce;
