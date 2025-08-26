// DiaryWritePage.tsx
import { useRef, useState, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/text/TextArea";
import TextCount from "../components/text/TextCount";
import classes from "./DiaryWritePage.module.css";
import Button from "../../../components/button/Button";
import { useNavigate, useParams } from "react-router";
import Modal from "../../../components/modal/Modal";
import { useToast } from "../../../contexts/ToastContext";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";
import { useCreateDiary } from "../hooks/useCreateDiary";
import { usePostAccess } from "../hooks/usePostAccess";

const FORM_ID = "diary-form";

function DiaryWritePage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { recordWrite } = usePostAccess();

  const { type } = useParams<{ type: string }>();
  const upper = type?.toUpperCase();
  const diaryType: "SHORT" | "LONG" =
    upper === "SHORT" || upper === "LONG" ? upper : "SHORT";

  const { mutateAsync } = useCreateDiary(diaryType, {
    onSuccess: () => {
      recordWrite();

      formRef.current?.clear();
      setTitle("");
      setContent("");
      setCount(0);
      navigate("/diary/submit", {
        replace: true,
        state: {
          next: `/diary`,
          stayMs: 1600,
          message: "작성해주신 소중한 마음은 소중히 보관할게요",
        },
      });
    },
  });

  async function handleSave() {
    if (submitting) return;

    if (content.trim().length < 100) {
      showToast("조금 더 이야기해주세요. 100자 이상 입력해주세요.", "info");
      return;
    }

    try {
      setSubmitting(true);
      await mutateAsync({ title: title.trim(), content: content.trim() });
    } finally {
      setSubmitting(false);
      setShowConfirm(false);
    }
  }

  function handleOpenConfirm() {
    if (content.trim().length < 100) {
      showToast("조금 더 이야기해주세요. 100자 이상 입력해주세요.", "info");
      return;
    }
    setShowConfirm(true);
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setContent(val);
    setCount(val.length);
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
              onClick={handleOpenConfirm}
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
          작성하신 일기를 한마디로 표현해주세요
        </Modal.Title>

        <Modal.Textarea
          name="title"
          form={FORM_ID}
          placeholder="제목을 작성하기..."
          value={title}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
          disabled={submitting}
        />

        <Modal.Actions>
          <button type="button" onClick={() => setShowConfirm(false)}>
            닫기
          </button>
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
