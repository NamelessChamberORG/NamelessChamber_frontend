import type { DiaryPreview } from "../../types/types";
import Card from "./Card";

type CardListProps = {
  diaries: DiaryPreview[];
  onClickCard: (postId: string) => void;
};

const CardList = ({ diaries, onClickCard }: CardListProps) => {
  return (
    <>
      {diaries.map((diary, idx) => (
        <li key={diary.postId}>
          <Card
            onClick={() => onClickCard(diary.postId)}
            title={diary.title}
            isAuthor={idx === 0}
            textCount={diary.contentLength}
          />
        </li>
      ))}
    </>
  );
};

export default CardList;
