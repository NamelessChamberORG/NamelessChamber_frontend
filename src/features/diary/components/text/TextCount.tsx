import classes from "./TextCount.module.css";

type TextCountProps = {
  count: number;
  minLength: number;
};

const TextCount = ({ count, minLength }: TextCountProps) => {
  return (
    <div className={classes.textCount}>
      {count == 0 && <p>0자</p>}
      {0 < count && count <= minLength && <p>{minLength - count}자 남음...</p>}
      {count > 500 && <p>{count - minLength}자 넘음...</p>}
    </div>
  );
};

export default TextCount;
