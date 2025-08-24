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
import { useCreateDiary } from "../hooks/useCreateDiary";

const FORM_ID = "diary-form";

function DiaryWritePage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateDiary();

  async function handleSave(value: unknown) {
    if (submitting) return;

    const v = (value ?? {}) as Record<string, FormDataEntryValue>;
    const title = typeof v.title === "string" ? v.title : "";
    const content = typeof v.content === "string" ? v.content : "";

    if (!content.trim()) {
      showToast("내용을 입력해주세요.", "info");
      return;
    }
    if (!title.trim()) {
      showToast("제목을 입력해주세요.", "info");
      return;
    }

    try {
      setSubmitting(true);

      await mutateAsync({
        title,
        content,
      });

      formRef.current?.clear();
      setTitle("");
      setCount(0);

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
      setTitle("");
      setSubmitting(false);
    }
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCount(e.target.value.length);
  }

  return (
    <div className={classes.diaryForm} ref={containerRef}>
      <div>
        <FullscreenToggleButton
          targetRef={containerRef}
          disabled={submitting}
        />
      </div>

      <Form id={FORM_ID} onSave={handleSave} ref={formRef}>
        <TextArea
          name="content"
          onChange={handleTextChange}
          disabled={submitting}
          required
          aria-describedby="submit-title"
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

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <Modal.Title id="submit-title">
          작성하신 일기를 정리해주세요
        </Modal.Title>

        <Modal.Textarea
          name="title"
          form={FORM_ID}
          placeholder="제목을 작성하기..."
          value={title}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
          required
          disabled={submitting}
        />

        <Modal.Actions>
          <button type="button" onClick={() => setShowConfirm(false)}>
            닫기
          </button>
          {/* 실제 폼 제출 트리거 */}
          <button
            type="submit"
            form={FORM_ID}
            disabled={submitting || !title.trim()}
          >
            완료하기
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default DiaryWritePage;
