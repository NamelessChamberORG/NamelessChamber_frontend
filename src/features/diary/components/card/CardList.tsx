import { useNavigate } from "react-router";
import mockDiarys from "../../../../mock/mockDiary";
import Card from "./Card";
import classes from "./CardList.module.css";

const CardList = () => {
  const navigate = useNavigate();

  return (
    <ul className={classes.cardList}>
      {mockDiarys.map((diary) => (
        <Card
          onClick={() => navigate(`/diary/${diary.id}`)}
          key={diary.title}
          title={diary.title}
          tags={diary.tags}
          authorType={diary.authorType}
          textCount={diary.textCount}
        />
      ))}
    </ul>
  );
};

export default CardList;
