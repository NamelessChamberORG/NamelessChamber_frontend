import { useRef, useState, type ChangeEvent } from "react";
import Button from "../../../components/button/Button";
import Form, { type FormHandle } from "../../../components/form/Form";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";
import TextArea from "../../diary/components/text/TextArea";
import classes from "./FeedbackPage.module.css";
import { useToast } from "../../../contexts/ToastContext";
import { useCreateFeedback } from "../hooks/useCreateFeedback";
import { useNavigate } from "react-router";
import { PATHS } from "../../../constants/path";

const FORM_ID = "feedback-form";

function FeedbackPage() {
  const navigate = useNavigate();
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { showToast } = useToast();
  const createFeedback = useCreateFeedback();

  const [content, setContent] = useState("");

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function handleSave() {
    try {
      await createFeedback.mutateAsync({ content: content.trim() });

      formRef.current?.clear();
      setContent("");
      showToast("소중한 피드백 감사합니다. 빠르게 살펴볼게요!", "check");
      navigate(PATHS.PROFILE);
    } catch (e) {
      showToast(
        "제출 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
        "cancel"
      );
    }
  }

  return (
    <section className={classes.feedback} ref={containerRef}>
      <div className={classes.topActions}>
        <FullscreenToggleButton
          targetRef={containerRef}
          disabled={createFeedback.isPending}
        />
      </div>
      <Form id={FORM_ID} onSave={handleSave} ref={formRef}>
        <h2>솔직한 피드백이 좋아요!</h2>

        <TextArea
          name="content"
          value={content}
          onChange={handleTextChange}
          disabled={createFeedback.isPending}
          required
        />

        <div className={classes.actions}>
          <Button type="submit" disabled={createFeedback.isPending}>
            {createFeedback.isPending ? "전송 중..." : "무명소에 제보하기"}
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default FeedbackPage;
