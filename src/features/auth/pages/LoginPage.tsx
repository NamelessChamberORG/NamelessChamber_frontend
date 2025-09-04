import { Link } from "react-router";
import AuthProviderButton from "../../../components/button/AuthProviderButton";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./LoginPage.module.css";
import { PATHS } from "../../../constants/path";

function LoginPage() {
  function handleLogin() {
    // 로그인 처리 로직 추가 예정
  }

  return (
    <section className={classes.login}>
      <div>
        <p>하루에 한번의 기록,</p>
        <p>무명소</p>
      </div>
      <div className={classes.authButtons}>
        <Link to={PATHS.SIGN_UP}>
          <AuthProviderButton provider="email">
            무명소에 합류하기
          </AuthProviderButton>
        </Link>
      </div>

      <Paragraph>로그인</Paragraph>
      <Form onSave={handleLogin}>
        <Input type="text" placeholder="아이디 또는 이메일" />
        <Input
          type="password"
          placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
        />
        <Button type="submit">로그인 하기</Button>
      </Form>
    </section>
  );
}

export default LoginPage;
