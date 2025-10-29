import WeekDot from "./WeekDot";
import classes from "./WeekProgress.module.css";

const KOR_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

type WeekProgressProps = {
  days: boolean[];
  counts?: number[];
};

function WeekProgress({ days }: WeekProgressProps) {
  return (
    <div className={classes.weekContainer}>
      <div className={classes.weekLabels}>
        {KOR_DAYS.map((d) => (
          <span key={d} className={classes.weekLabel}>
            {d}
          </span>
        ))}
      </div>

      <div
        className={classes.weekDots}
        role="list"
        aria-label="이번 주 작성 현황"
      >
        {days.map((done, i) => (
          <WeekDot key={i} active={done} label={KOR_DAYS[i]} />
        ))}
      </div>
    </div>
  );
}

export default WeekProgress;
