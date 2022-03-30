import { useState, useEffect } from "react";
import classes from "./ScrollUpButton.module.scss";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollUpButton = () => {
  const [ScrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollEvent = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  if (ScrollPosition > 500) {
    return (
      <div
        className={classes.Container}
        onClick={() => {
          window.scroll({
            top: 0,
          });
        }}
      >
        <AiOutlineArrowUp />
      </div>
    );
  }

  return "";
};

export default ScrollUpButton;
