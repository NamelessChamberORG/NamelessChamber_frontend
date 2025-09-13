import classes from "./TextCount.module.css";

type TextCountProps = {
  count: number;
};

const TextCount = ({ count }: TextCountProps) => {
  return <div className={classes.textCount}>{count}자</div>;
};

export default TextCount;
