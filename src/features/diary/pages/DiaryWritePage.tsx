import { useRef, useState, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/text/TextArea";
import TextCount from "../components/text/TextCount";
import classes from "./DiaryWritePage.module.css";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router";
import Modal from "../../../components/modal/Modal";
import { useToast } from "../../../contexts/ToastContext";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";

function DiaryWritePage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState<number>(0);
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

  function confirmSubmit() {
    setShowConfirm(false);
    hiddenSubmitRef.current?.click();
  }

  return (
    <div className={classes.diaryForm} ref={containerRef}>
      <div>
        <FullscreenToggleButton
          targetRef={containerRef}
          disabled={submitting}
        />
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

export default DiaryWritePage;
