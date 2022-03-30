import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <div className={classes.Circle}></div>
        <div className={classes.Circle}></div>
        <div className={classes.Circle}></div>
      </div>
      <h4>Loading...</h4>
    </div>
  );
};

export default Spinner;
