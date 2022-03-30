import classes from "./Spin.module.scss";

const Spin = (props) => (
  <div
    className={props.white ? classes.White : classes.Loader}
    style={props.style}
  ></div>
);

export default Spin;
