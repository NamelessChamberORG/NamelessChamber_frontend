import mockDiarys from "../../../../mock/mockDiary";
import Card from "./Card";
import classes from "./CardList.module.css";

const CardList = () => {
  return (
    <ul className={classes.cardList}>
      {mockDiarys.map((diary) => (
        <Card
          key={diary.title}
          title={diary.title}
          tags={diary.tags}
          authorType={diary.authorType}
        />
      ))}
    </ul>
  );
};

export default CardList;
