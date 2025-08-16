import { useRef, useState, useEffect, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/text/TextArea";
import TextCount from "../components/text/TextCount";
import classes from "./WriteDiaryPage.module.css";
import Button from "../../../components/button/Button";
import FullScreenOn from "../../../assets/icons/FullScreenOn";
import FullScreenOff from "../../../assets/icons/FullScreenOff";
import { useNavigate } from "react-router";
import Modal from "../../../components/modal/Modal";
import { useToast } from "../../../contexts/ToastContext";

function WriteDiaryPage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const navigate = useNavigate();

  async function handleSave(value: unknown) {
    if (submitting) return;
    try {
      setSubmitting(true);

      console.log(value);

      formRef.current?.clear();

      navigate("/diary/submit", {
        replace: true,
        state: {
          next: `/diary`,
          stayMs: 1600,
          message: "작성해주신 소중한 마음은 소중히 보관할게요",
        },
      });
    } catch (err) {
      console.error("저장 실패:", err);
      showToast("무명 일기 저장에 실패했습니다. 다시 시도해주세요", "cancel");
      setSubmitting(false);
    }
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setCount(text.length);
  }

  function handleFullScreen() {
    const elem = containerRef.current;
    if (!document.fullscreenElement) {
      elem
        ?.requestFullscreen()
        .catch((err) => console.error("전체 화면 진입 실패:", err));
    } else {
      document
        .exitFullscreen()
        .catch((err) => console.error("전체 화면 종료 실패:", err));
    }
  }

  // 전체 화면 상태 변화 감지
  useEffect(() => {
    const handleChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  function confirmSubmit() {
    setShowConfirm(false);
    hiddenSubmitRef.current?.click();
  }

  return (
    <div className={classes.diaryForm} ref={containerRef}>
      <div>
        <Button onClick={handleFullScreen} disabled={submitting}>
          {isFullscreen ? <FullScreenOff /> : <FullScreenOn />}
        </Button>
      </div>

      <Form onSave={handleSave} ref={formRef}>
        <TextArea onChange={handleTextChange} disabled={submitting} />

        {/* 실제 제출은 hidden 버튼이 담당 */}
        <button
          ref={hiddenSubmitRef}
          type="submit"
          style={{ display: "none" }}
          aria-hidden="true"
          tabIndex={-1}
        />

        <div>
          {count > 0 && (
            <Button
              type="button"
              onClick={() => setShowConfirm(true)}
              disabled={submitting}
            >
              {submitting ? "보관 중..." : "무명소에 흘러보내기"}
            </Button>
          )}
        </div>
      </Form>

      <TextCount count={count} />

      {/* 확인 모달 */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <Modal.Title id="submit-title">
          작성하신 일기를 정리해주세요
        </Modal.Title>

        <Modal.Textarea placeholder="제목을 작성하기..." />

        <Modal.Actions>
          <button onClick={() => setShowConfirm(false)}>닫기</button>
          <button onClick={confirmSubmit}>완료하기</button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default WriteDiaryPage;
