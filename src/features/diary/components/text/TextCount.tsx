import classes from "./TextCount.module.css";

type TextCountProps = {
  count: number;
};

const TextCount = ({ count }: TextCountProps) => {
  return (
    <div className={classes.textCount}>
      {count == 0 ? <p>0자</p> : <p>{500 - count} 자 남음...</p>}
    </div>
  );
};

export default TextCount;
