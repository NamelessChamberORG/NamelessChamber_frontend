import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import AuthButton from "../../auth/components/AuthButton";
import classes from "./SetNicknamePage.module.css";

function SetNicknamePage() {
  function handleSubmit() {}

  return (
    <section className={classes.nickname}>
      <Paragraph>닉네임</Paragraph>
      <p className={classes.description}>
        이곳에서 당신은 무슨 이름으로 불리고 싶나요?
      </p>
      <Form onSave={handleSubmit}>
        <Input type="text" placeholder="닉네임을 입력해주세요" />
        <AuthButton type="submit">설정하기</AuthButton>
      </Form>
    </section>
  );
}

export default SetNicknamePage;
