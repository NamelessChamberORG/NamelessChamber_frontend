import { useNavigate } from "react-router";
import Card from "./Card";
import classes from "./CardList.module.css";
import type { DiaryPreview } from "../../types/types";

type CardListProps = {
  diaries: DiaryPreview[];
};

const CardList = ({ diaries }: CardListProps) => {
  const navigate = useNavigate();

  return (
    <ul className={classes.cardList}>
      {diaries.map((diary, idx) => (
        <Card
          onClick={() => navigate(`/diary/${diary.id}`)}
          key={diary.id}
          title={diary.title}
          isAuthor={idx === diaries.length - 1}
          textCount={diary.contentLength}
        />
      ))}
    </ul>
  );
};

export default CardList;
