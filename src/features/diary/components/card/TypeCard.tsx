import classes from "./TypeCard.module.css";
type TypeCardProps = {
  title: string;
  firstLine: string;
  secondLine: string;
};

const TypeCard = ({ title, firstLine, secondLine }: TypeCardProps) => {
  return (
    <div className={classes.typeCard}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.guide}>
        <p>{firstLine}</p>
        <p>{secondLine}</p>
      </div>
    </div>
  );
};

export default TypeCard;
