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
import { PATHS } from "../../../constants/path";
import {
  API_TO_UI,
  UI_TO_API,
  type ApiType,
  type UiType,
} from "../types/typeMap";

const FORM_ID = "diary-form";
const SHORT_MIN_LENGTH = 30;
const LONG_MIN_LENGTH = 100;

const isContentValid = (s: string, minLength: number) =>
  s.length >= minLength && s.trim().length > 0;

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

  const { type } = useParams<{ type: UiType }>();
  const diaryType: ApiType =
    type && UI_TO_API[type] ? UI_TO_API[type] : "SHORT";

  const MIN_LENGTH = diaryType === "SHORT" ? SHORT_MIN_LENGTH : LONG_MIN_LENGTH;
  const TITLE =
    diaryType === "SHORT"
      ? "짧은 기록 순간의 생각을 가볍게 남겨요."
      : "마음 깊은 곳의 이야기를 꺼내보아요.";
  const PLACEHOLDER_MESSAGE =
    diaryType === "SHORT"
      ? "지금 떠오른 생각이나, 단 하나의 문장으로도 괜찮습니다."
      : "이곳 무명소는 고해성사를 담는 장소입니다. 말하지 못한 속마음을 조용히 흘려보내세요.";

  const { mutateAsync } = useCreateDiary(diaryType, {
    onSuccess: () => {
      formRef.current?.clear();
      setTitle("");
      setContent("");
      setCount(0);
      const typeLower = API_TO_UI[diaryType];

      navigate(PATHS.DIARY_SUBMIT_TYPE(typeLower), {
        replace: true,
        state: {
          next: PATHS.DIARY_LIST_TYPE(typeLower),
          stayMs: 1600,
          message: "작성해주신 소중한 마음은 소중히 보관할게요",
        },
      });
    },
  });

  async function handleSave() {
    if (submitting) return;

    if (!isContentValid(content, MIN_LENGTH)) {
      showToast(`${MIN_LENGTH}자 이상 입력해주세요.`, "info");
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
    if (!isContentValid(content, MIN_LENGTH)) {
      showToast(`${MIN_LENGTH}자 이상 입력해주세요.`, "info");
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
      <h2 className={classes.title}>{TITLE}</h2>
      <Form id={FORM_ID} onSave={handleSave} ref={formRef}>
        <TextArea
          name="content"
          onChange={handleTextChange}
          disabled={submitting}
          required
          aria-describedby="submit-title"
          placeholder={PLACEHOLDER_MESSAGE}
        />

        <div>
          {count > 0 && (
            <Button
              type="button"
              onClick={handleOpenConfirm}
              disabled={submitting}
            >
              {submitting ? "보관 중..." : "무명소에 흘려보내기"}
            </Button>
          )}
        </div>
      </Form>

      <TextCount count={count} minLength={MIN_LENGTH} />

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <Modal.Title id="submit-title">
          작성하신 글을 한마디로 표현해주세요
        </Modal.Title>

        <Modal.Textarea
          name="title"
          form={FORM_ID}
          placeholder="제목 작성하기.."
          value={title}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
          disabled={submitting}
        />

        <Modal.Actions>
          <Button
            type="button"
            alwaysHoverStyle
            variant="main"
            state="default"
            onClick={() => setShowConfirm(false)}
          >
            닫기
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            alwaysHoverStyle
            variant="main"
            state="default"
            disabled={submitting || !title.trim()}
          >
            완료하기
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default DiaryWritePage;
