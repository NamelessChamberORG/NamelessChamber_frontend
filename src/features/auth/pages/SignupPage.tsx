import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SignupPage.module.css";

function SignupPage() {
  function handleSignup() {
    // 회원가입 처리 로직 추가 예정
  }

  return (
    <section className={classes.signup}>
      <Paragraph>환영합니다</Paragraph>
      <Form onSave={handleSignup}>
        <Input type="text" placeholder="아이디" />
        <Input
          type="password"
          placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
        />
        <Button type="submit">가입하기</Button>
      </Form>
    </section>
  );
}

export default SignupPage;
