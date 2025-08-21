import { useNavigate } from "react-router";
import Card from "./Card";
import classes from "./CardList.module.css";
import type { DiaryPreview } from "../../types/types";
import CardSkeleton from "./CardSkeleton";

type CardListProps = {
  diaries: DiaryPreview[];
  isLoading: boolean;
};

const CardList = ({ diaries, isLoading }: CardListProps) => {
  const navigate = useNavigate();

  return (
    <ul className={classes.cardList}>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
      ) : diaries.length > 0 ? (
        diaries.map((diary, idx) => (
          <Card
            key={diary.id}
            onClick={() => navigate(`/diary/${diary.id}`)}
            title={diary.title}
            isAuthor={idx === 0}
            textCount={diary.contentLength}
          />
        ))
      ) : (
        <div className={classes.empty}>아직 등록된 글이 없어요.</div>
      )}
    </ul>
  );
};

export default CardList;
