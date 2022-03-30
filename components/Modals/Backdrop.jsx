import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div
      className={classes.Backdrop}
      onClick={props.onClick}
      style={props.style}
    ></div>,
    document.getElementById("BackdropPortal")
  );
};

export default Backdrop;
