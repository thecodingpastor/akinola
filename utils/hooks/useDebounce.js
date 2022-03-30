import { useState } from "react";

const useDebounce = () => {
  const [TypingTimeout, setTypingTimeout] = useState("");

  const debounce = (func, wait = 3000) => {
    clearTimeout(TypingTimeout);
    const timeout = setTimeout(() => {
      func();
    }, wait);

    setTypingTimeout(timeout);
  };

  return debounce;
};

export default useDebounce;
