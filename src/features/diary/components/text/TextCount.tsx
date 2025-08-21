import classes from "./TextCount.module.css";

type TextCountProps = {
  count: number;
};

const TextCount = ({ count }: TextCountProps) => {
  return (
    <div className={classes.textCount}>
      {count == 0 && <p>0자</p>}
      {0 < count && count <= 500 && <p>{500 - count}자 남음...</p>}
      {count > 500 && <p>{count - 500}자 넘음...</p>}
    </div>
  );
};

export default TextCount;
