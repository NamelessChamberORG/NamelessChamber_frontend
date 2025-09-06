import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CardList.module.css";
import CardSkeleton from "./CardSkeleton";
import CardList from "./CardList";
import StoryPrompt from "../storyPrompt/StoryPrompt";
import type { DiaryPreview } from "../../types/types";
import { usePostAccess } from "../../hooks/usePostAccess";
import Modal from "../../../../components/modal/Modal";
import { PATHS } from "../../../../constants/path";
import { useToast } from "../../../../contexts/ToastContext";

type Props = {
  diaries: DiaryPreview[];
  coin: number;
  isLoading: boolean;
  isEmpty: boolean;
};

const CardListContainer = ({ diaries, isLoading, isEmpty }: Props) => {
  const navigate = useNavigate();
  const { canView, recordView } = usePostAccess();
  const { showToast } = useToast();

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);

  const onClickCard = (id: string) => {
    if (!canView()) {
      showToast("보실 수 있는 일기를 모두 만나봤어요", "info");
      return;
    }
    setPendingId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setPendingId(null);
  };

  const confirmView = () => {
    if (!pendingId) return;
    recordView();
    navigate(PATHS.DIARY_DETAIL_ID(pendingId));
    closeModal();
  };

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
        to={PATHS.HOME}
        paddingSize="small"
      />

      <ul className={classes.cardList}>
        <CardList diaries={diaries} onClickCard={onClickCard} />
      </ul>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        aria-labelledby="preview-title"
      >
        <Modal.Title id="preview-title">
          <>
            일기를 작성하면 다른 사람의 고백을 하나 볼 수 있습니다.
            <br />
            선택하신 고백으로 읽어보시겠어요?
          </>
        </Modal.Title>

        <Modal.Actions>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
          <button type="button" onClick={confirmView}>
            선택하기
          </button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CardListContainer;
