import mockDiarys from "../../../../mock/mockDiary";
import Card from "./Card";
import classes from "./CardList.module.css";

const CardList = () => {
  return (
    <ul className={classes.cardList}>
      {mockDiarys.map((diary) => (
        <Card>{diary.text}</Card>
      ))}
    </ul>
  );
};

export default CardList;
