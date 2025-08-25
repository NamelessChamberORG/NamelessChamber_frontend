import { useNavigate } from "react-router-dom";
import classes from "./CardList.module.css";
import CardSkeleton from "./CardSkeleton";
import CardList from "./CardList";
import type { DiaryPreview } from "../../types/types";
import StoryPrompt from "../storyPrompt/StoryPrompt";

type Props = {
  diaries: DiaryPreview[];
  isLoading: boolean;
  isEmpty: boolean;
};

const CardListContainer = ({ diaries, isLoading, isEmpty }: Props) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <ul className={classes.cardList}>
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (isEmpty) {
    return (
      <ul className={classes.cardList}>
        <li className={classes.empty}>아직 등록된 글이 없어요.</li>
      </ul>
    );
  }

  return (
    <>
      <StoryPrompt
        lines={["당신의 이야기를", "한 번 더 흘려보내주세요"]}
        to="/"
        paddingSize="small"
      />
      <ul className={classes.cardList}>
        <CardList
          diaries={diaries}
          onClickCard={(id) => navigate(`/diary/${id}`)}
        />
      </ul>
    </>
  );
};

export default CardListContainer;
