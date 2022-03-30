import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { AiFillCloseCircle } from "react-icons/ai";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  if (!props.show) return "";
  const content = (
    <div
      className={`${classes.Container} ${props.className} 
      ${props.show ? "SlideDown" : "SlideUp"}`}
      style={props.style}
    >
      <span className={classes.CloseButton}>
        <AiFillCloseCircle onClick={() => props.onClose()} />
      </span>
      {props.show && <Backdrop onClick={props.onClose} />}
      {
        <header
          className={`${classes.Header} ${props.headerClass}`}
          style={props.headerStyle}
        >
          <h4>{props.headerContent}</h4>
        </header>
      }
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div
          className={`${classes.Content} ${props.contentClass}`}
          style={props.contentStyle}
        >
          {props.children}
        </div>
        <footer
          className={`${classes.Footer} ${props.footerclass}`}
          style={props.style}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("Modal"));
};

export default Modal;
