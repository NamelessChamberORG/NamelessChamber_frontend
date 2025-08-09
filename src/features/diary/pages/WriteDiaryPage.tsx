import { useRef, useState, useEffect, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/TextArea";
import TextCount from "../components/TextCount";
import classes from "./WriteDiaryPage.module.css";
import Button from "../../../components/button/Button";
import FullScreenOn from "../../../assets/icons/FullScreenOn";
import FullScreenOff from "../../../assets/icons/FullScreenOff";
import { useNavigate } from "react-router";

function WriteDiaryPage() {
  const formRef = useRef<FormHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSave(value: unknown) {
    console.log("Saved value:", value);
    formRef.current?.clear();
    navigate("/diary/submit");
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setCount(text.length);
  }

  function handleFullScreen() {
    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      elem?.requestFullscreen().catch((err) => {
        console.error("전체 화면 진입 실패:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("전체 화면 종료 실패:", err);
      });
    }
  }

  // 전체 화면 상태 변화 감지
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return (
    <div className={classes.diaryForm} ref={containerRef}>
      <div>
        <Button onClick={handleFullScreen}>
          {isFullscreen ? <FullScreenOff /> : <FullScreenOn />}
        </Button>
      </div>
      <Form onSave={handleSave} ref={formRef}>
        <TextArea onChange={handleTextChange} />
        <div>
          {count > 0 && <Button type="submit">무명소에 흘러보내기</Button>}
        </div>
      </Form>
      <TextCount count={count} />
    </div>
  );
}

export default WriteDiaryPage;
