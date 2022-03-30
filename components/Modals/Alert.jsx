import { useEffect, useContext } from "react";
import ReactDOM from "react-dom";

import GlobalContext from "../../context/General/GlobalContext";
import { MdOutlineCancel } from "react-icons/md";

import classes from "./Alert.module.scss";

const Alert = () => {
  const { SetAlert, AlertPopup } = useContext(GlobalContext);
  useEffect(() => {
    const timer = setTimeout(
      () => SetAlert(null),
      AlertPopup?.duration || AlertPopup?.type === "error" ? 10000 : 6000
    );

    return () => clearTimeout(timer);
  }, [AlertPopup]);

  if (AlertPopup?.message)
    return ReactDOM.createPortal(
      <div
        className={`${classes.Container} ${
          AlertPopup?.type === "error" && classes.Error
        }`}
      >
        <div className={classes.Inner}>
          <MdOutlineCancel onClick={() => SetAlert(null)} />
          <h2>
            {AlertPopup?.type === "success" && !AlertPopup?.title
              ? "Success"
              : AlertPopup?.type === "error" && !AlertPopup?.title
              ? "Error"
              : AlertPopup?.title}
          </h2>
          <p>{AlertPopup?.message}</p>
        </div>
      </div>,
      document.getElementById("Alert")
    );

  return "";
};

export default Alert;
