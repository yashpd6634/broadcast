import { useRef } from "react";

function useThrottle(callback, limit = 500) {
  let inCoolingPeriod = useRef(false);
  let lastArgs = useRef(null);
  let timeoutRef = useRef(null);

  const throttleFunction = (...args) => {
    lastArgs.current = args;

    if (!inCoolingPeriod.current) {
      callback(...args);
      inCoolingPeriod = true;

      timeoutRef.current = setTimeout(() => {
        inCoolingPeriod = false;
        if (lastArgs.current !== null) {
          callback(...lastArgs.current);
          lastArgs.current = null;
        }
      }, limit);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttleFunction;
}

export default useThrottle;
