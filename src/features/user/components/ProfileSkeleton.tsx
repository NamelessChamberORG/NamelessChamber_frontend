import classes from "./ProfileSkeleton.module.css";

export default function ProfileSkeleton() {
  return (
    <div className={classes.profileSection}>
      <div className={`${classes.skeleton} ${classes.nickname}`} />

      <div className={`${classes.skeleton} ${classes.coin}`} />

      <div className={`${classes.skeleton} ${classes.button}`} />

      <div className={`${classes.skeleton} ${classes.feedback}`} />

      <div className={`${classes.skeleton} ${classes.logout}`} />
    </div>
  );
}
