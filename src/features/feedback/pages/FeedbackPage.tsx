import { useRef, useState, type ChangeEvent } from "react";
import Button from "../../../components/button/Button";
import Form, { type FormHandle } from "../../../components/form/Form";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";
import TextArea from "../../diary/components/text/TextArea";
import classes from "./FeedbackPage.module.css";
import { useToast } from "../../../contexts/ToastContext";

const FORM_ID = "feedback-form";

function FeedbackPage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { showToast } = useToast();

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function handleSave() {
    if (submitting) return;

    try {
      setSubmitting(true);

      formRef.current?.clear();
      setContent("");
      showToast("소중한 피드백 감사합니다. 빠르게 살펴볼게요!", "check");
    } catch (e) {
      showToast(
        "제출 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
        "cancel"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={classes.feedback} ref={containerRef}>
      <div className={classes.topActions}>
        <FullscreenToggleButton
          targetRef={containerRef}
          disabled={submitting}
        />
      </div>
      <Form id={FORM_ID} onSave={handleSave} ref={formRef}>
        <h2>솔직한 피드백이 좋아요!</h2>

        <TextArea
          name="content"
          value={content}
          onChange={handleTextChange}
          disabled={submitting}
          required
          placeholder="무명소 사용 중 겪은 불편 사항이나 제안하고 싶은 점을 자유롭게 적어주세요..."
        />

        <div className={classes.actions}>
          <Button type="submit" disabled={submitting}>
            {submitting ? "전송 중..." : "무명소에 제보하기"}
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default FeedbackPage;
