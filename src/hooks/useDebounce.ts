import { useEffect, useRef, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  const timeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeRef.current);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
