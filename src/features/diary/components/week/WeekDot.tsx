import classes from "./WeekDot.module.css";

type WeekDotProps = {
  active: boolean;
  label: string;
};

function WeekDot({ active, label }: WeekDotProps) {
  return (
    <div
      role="listitem"
      className={`${classes.dot} ${active ? classes.active : ""}`}
      title={`${label}요일 ${active ? "작성함" : "미작성"}`}
    ></div>
  );
}

export default WeekDot;
