import { useRef, useState, useEffect, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../../../components/textarea/TextArea";
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
import { useTopic } from "../hooks/useTopic";
import { SUBMIT_LOADING_MESSAGE } from "../../../constants/messages";

const FORM_ID = "diary-form";
const SHORT_MIN_LENGTH = 30;
const LONG_MIN_LENGTH = 100;

const DRAFT_KEY = "draft:diary-write";

const isContentValid = (s: string, minLength: number) =>
  s.length >= minLength && s.trim().length > 0;

function DiaryWritePage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLElement>(null);

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

  const isToday = type === "today";

  const { data: topic, isLoading: topicLoading } = useTopic(isToday);

  const MIN_LENGTH = diaryType === "LONG" ? LONG_MIN_LENGTH : SHORT_MIN_LENGTH;

  const TITLE = isToday
    ? topicLoading
      ? "오늘의 주제를 불러오는 중…"
      : topic?.title ?? "오늘의 주제를 불러오지 못했어요"
    : diaryType === "SHORT"
    ? "짧은 기록 순간의 생각을 가볍게 남겨요."
    : "마음 깊은 곳의 이야기를 꺼내보아요.";

  const PLACEHOLDER_MESSAGE = isToday
    ? "주제에 대해서 자유롭게 작성해보세요."
    : diaryType === "SHORT"
    ? "지금 떠오른 생각이나, 단 하나의 문장으로도 괜찮습니다."
    : "이곳 무명소는 고해성사를 담는 장소입니다. 말하지 못한 속마음을 조용히 흘려보내세요.";

  const { mutateAsync } = useCreateDiary(diaryType, {
    onSuccess: (data) => {
      formRef.current?.clear();
      setTitle("");
      setContent("");
      setCount(0);
      localStorage.removeItem(DRAFT_KEY);

      const typeLower = API_TO_UI[diaryType];

      navigate(PATHS.DIARY_SUBMIT_TYPE(typeLower), {
        replace: true,
        state: {
          type: typeLower,
          showCalendar: data.showCalendar,
          streakState: data.showCalendar
            ? {
                calendar: data.calendar,
                coin: data.coin,
                totalPosts: data.totalPosts,
                postId: data.postId,
              }
            : undefined,
          stayMs: 1600,
          message: SUBMIT_LOADING_MESSAGE,
        },
      });
    },
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          if ("title" in parsed && typeof parsed.title === "string") {
            setTitle(parsed.title);
          }
          if ("content" in parsed && typeof parsed.content === "string") {
            setContent(parsed.content);
            setCount(parsed.content.length);
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, content }));
      } catch {
        // ignore
      }
    }, 350);
    return () => clearTimeout(id);
  }, [title, content]);

  const canSubmit = isContentValid(content, MIN_LENGTH);

  async function handleSave() {
    if (submitting) return;

    if (!canSubmit) {
      showToast(`${MIN_LENGTH}자 이상 입력해주세요.`, "info");
      return;
    }

    try {
      setSubmitting(true);
      await mutateAsync({ title: title.trim(), content: content.trim() });
    } finally {
      setSubmitting(false);
    }
  }

  function handleOpenConfirm() {
    if (!canSubmit) {
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
    <section className={classes.write} ref={containerRef}>
      <div className={classes.topActions}>
        <FullscreenToggleButton
          targetRef={containerRef}
          disabled={submitting}
        />
      </div>

      <h2 className={classes.title}>{TITLE}</h2>

      <Form id={FORM_ID} onSave={handleSave} ref={formRef}>
        <TextArea
          name="content"
          value={content}
          onChange={handleTextChange}
          disabled={submitting}
          required
          aria-describedby="submit-title"
          placeholder={PLACEHOLDER_MESSAGE}
        />

        <div className={classes.footer}>
          <div
            className={classes.revealWrap}
            data-ready={canSubmit}
            aria-hidden={!canSubmit && count === 0}
          >
            <Button
              type="button"
              onClick={handleOpenConfirm}
              disabled={submitting || !canSubmit}
            >
              {submitting ? "보관 중..." : "무명소에 흘려보내기"}
            </Button>
          </div>

          <div className={classes.countWrap}>
            <TextCount count={count} reqLength={MIN_LENGTH} />
          </div>
        </div>
      </Form>

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
    </section>
  );
}

export default DiaryWritePage;
