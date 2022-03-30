import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.Button} ${props.fade && "fade_in"}`}
      style={props.style}
      onClick={props.handleClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
