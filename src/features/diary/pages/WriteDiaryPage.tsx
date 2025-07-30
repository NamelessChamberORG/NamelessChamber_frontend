import { useRef, useState, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/TextArea";
import TextCount from "../components/TextCount";
import classes from "./WriteDiaryPage.module.css";
import Button from "../../../components/button/Button";
// import FullScreenOn from "../../../assets/icons/FullScreenOn";
import FullScreenOff from "../../../assets/icons/FullScreenOff";

function WriteDiaryPage() {
  const formRef = useRef<FormHandle>(null);
  const [count, setCount] = useState<number>(0);

  function handleSave(value: unknown) {
    console.log("Saved value:", value);
    formRef.current?.clear();
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setCount(text.length);
  }

  function handleFullScreen() {
    console.log("Full screen toggled");
  }

  return (
    <div className={classes.diaryForm}>
      <div>
        <Button onClick={handleFullScreen}>
          <FullScreenOff />
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
