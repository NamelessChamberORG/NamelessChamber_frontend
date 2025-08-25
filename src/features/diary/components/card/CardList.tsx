import type { DiaryPreview } from "../../types/types";
import Card from "./Card";

type CardListProps = {
  diaries: DiaryPreview[];
  onClickCard: (id: string) => void;
};

const CardList = ({ diaries, onClickCard }: CardListProps) => {
  return (
    <>
      {diaries.map((diary, idx) => (
        <li key={diary.id}>
          <Card
            onClick={() => onClickCard(diary.id)}
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
