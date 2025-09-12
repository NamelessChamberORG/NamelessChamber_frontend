import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CardList.module.css";
import CardSkeleton from "./CardSkeleton";
import CardList from "./CardList";
import type { DiaryPreview } from "../../types/types";
import Modal from "../../../../components/modal/Modal";
import { PATHS } from "../../../../constants/path";
import Button from "../../../../components/button/Button";

type InteractionMode = "modal" | "direct";

type Props = {
  diaries: DiaryPreview[];
  coin: number;
  isLoading: boolean;
  isEmpty: boolean;
  type: "daily" | "mind";
  emptyMessage: string;
  interactionMode?: InteractionMode;
};

const CardListContainer = ({
  diaries,
  coin,
  isLoading,
  isEmpty,
  type,
  emptyMessage,
  interactionMode = "modal",
}: Props) => {
  const navigate = useNavigate();

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isCoinEmptyOpen, setCoinEmptyOpen] = useState(false);

  useEffect(() => {
    if (coin <= 0 && isConfirmOpen) {
      setConfirmOpen(false);
      setPendingId(null);
    }
  }, [coin, isConfirmOpen]);

  const onClickCard = (id: string) => {
    if (interactionMode === "direct") {
      navigate(PATHS.DIARY_DETAIL_ID(id));
      return;
    }
    if (coin <= 0) {
      setCoinEmptyOpen(true);
      return;
    }
    setPendingId(id);
    setConfirmOpen(true);
  };

  if (isLoading) {
    return (
      <ul className={classes.cardList}>
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (isEmpty) {
    return (
      <ul className={classes.cardList}>
        <li className={classes.empty}>{emptyMessage}</li>
      </ul>
    );
  }

  return (
    <>
      <ul className={classes.cardList}>
        <CardList diaries={diaries} onClickCard={onClickCard} />
      </ul>

      {interactionMode === "modal" && (
        <>
          <Modal
            isOpen={isCoinEmptyOpen}
            onClose={() => setCoinEmptyOpen(false)}
            aria-labelledby="coin-title"
          >
            <Modal.Title id="coin-title">
              <>
                열람 가능한 횟수가 없어요.
                <br />
                당신의 이야기를 남기면 다른 사람의 고백 한 편이 열립니다.
              </>
            </Modal.Title>
            <Modal.Actions>
              <Button
                type="button"
                alwaysHoverStyle
                variant="main"
                state="default"
                onClick={() => setCoinEmptyOpen(false)}
              >
                닫기
              </Button>
              <Button
                type="button"
                alwaysHoverStyle
                variant="main"
                state="default"
                onClick={() => navigate(PATHS.DIARY_NEW_TYPE(type))}
              >
                글 쓰러 가기
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal
            isOpen={isConfirmOpen}
            onClose={() => {
              setConfirmOpen(false);
              setPendingId(null);
            }}
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
              <Button
                type="button"
                alwaysHoverStyle
                variant="main"
                state="default"
                onClick={() => {
                  setConfirmOpen(false);
                  setPendingId(null);
                }}
              >
                닫기
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (!pendingId) return;
                  navigate(PATHS.DIARY_DETAIL_ID(pendingId));
                  setConfirmOpen(false);
                  setPendingId(null);
                }}
              >
                선택하기
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
};

export default CardListContainer;
