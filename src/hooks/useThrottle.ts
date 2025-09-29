import { useEffect, useRef, useState } from "react";

const useThrottle = (value: string, limit: number = 500) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const inCoolingPeriod = useRef(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const lastValue = useRef(value);

  useEffect(() => {
    lastValue.current = value;

    if (!inCoolingPeriod.current) {
      setThrottledValue(lastValue.current);
      inCoolingPeriod.current = true;

      timeoutRef.current = setTimeout(() => {
        inCoolingPeriod.current = false;
        if (lastValue.current !== throttledValue) {
          setThrottledValue(lastValue.current);
        }
      }, limit);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle;
