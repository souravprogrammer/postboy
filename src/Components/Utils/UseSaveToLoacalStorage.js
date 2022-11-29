import { useEffect, useState, useCallback } from "react";
import debounce from "../Functions/Debounce";

function useSaveTolocalStoreage(key, initial) {
  const [state, setState] = useState(localStorage.getItem(key) ?? initial ?? 0);

  const save = useCallback(
    debounce((k, s) => {
      localStorage.setItem(k, s);
    }),
    []
  );

  useEffect(() => {
    save(key, state);
  }, [state, key]);

  return [state, setState];
}

export default useSaveTolocalStoreage;
