import { useRef, useState, type ChangeEvent } from "react";
import Form, { type FormHandle } from "../../../components/form/Form";
import TextArea from "../components/TextArea";
import TextCount from "../components/TextCount";
import classes from "./WriteDiaryPage.module.css";

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

  return (
    <div className={classes.diaryForm}>
      <Form onSave={handleSave} ref={formRef}>
        <TextArea onChange={handleTextChange} />
      </Form>
      <TextCount count={count} />
    </div>
  );
}

export default WriteDiaryPage;
