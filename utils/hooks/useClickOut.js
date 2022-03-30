import { useRef, useEffect } from "react";

const useClickOut = (handler) => {
  let DOMNode = useRef();
  useEffect(() => {
    const handleClickOut = (e) => {
      if (DOMNode.current && !DOMNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [handler]);

  return DOMNode;
};

export default useClickOut;
