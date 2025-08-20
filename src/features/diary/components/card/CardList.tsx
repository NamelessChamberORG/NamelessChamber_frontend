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
      {diaries.map((diary) => (
        <Card
          onClick={() => navigate(`/diary/${diary.id}`)}
          key={diary.title}
          title={diary.title}
          // tags={diary.tags}
          isAuthor={Number(diary.id) === diaries.length - 1}
          textCount={diary.contentLength}
        />
      ))}
    </ul>
  );
};

export default CardList;
