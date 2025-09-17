import classes from "./LoadingDots.module.css";

const LoadingDots = () => {
  return (
    <div className={classes.loadingDots}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
export default LoadingDots;
