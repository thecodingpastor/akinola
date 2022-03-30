import classes from "./Card.module.scss";

const Card = ({ children, style, className }) => {
  return (
    <div
      className={`${classes.Container} ${className ? className : ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
