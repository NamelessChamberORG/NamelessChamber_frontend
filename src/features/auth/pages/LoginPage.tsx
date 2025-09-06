import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./LoginPage.module.css";
import { PATHS } from "../../../constants/path";
import { useLogin } from "../hooks/useAuth";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";
import AuthButton from "../components/AuthButton";
import InputMessage from "../../../components/input/InputMessage";

function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState<string>("");

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      showToast("로그인에 성공했습니다", "check");
      navigate(PATHS.HOME);
    },
    onError: (err) => {
      const msg = getErrorMessage(err);
      setServerError(msg);
    },
  });

  function handleLogin() {
    const id = email.trim();
    const pw = password.trim();
    if (!id || !pw) {
      setServerError("아이디와 비밀번호를 모두 입력해주세요");
      return;
    }
    setServerError("");
    login({ email: id, password: pw });
  }

  return (
    <section className={classes.login}>
      <Paragraph>로그인</Paragraph>
      <Form onSave={handleLogin}>
        <Input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => {
            if (serverError) setServerError("");
            setEmail(e.target.value);
          }}
          autoComplete="username"
        />
        <InputMessage />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            if (serverError) setServerError("");
            setPassword(e.target.value);
          }}
          autoComplete="current-password"
        />

        {serverError ? (
          <InputMessage type="error" aria-live="polite">
            {serverError}
          </InputMessage>
        ) : (
          <InputMessage />
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인 하기"}
        </Button>
      </Form>

      <div>
        <p>하루에 한번의 기록,</p>
        <p>무명소</p>
      </div>

      <div className={classes.authButtons}>
        <Link to={PATHS.SIGN_UP}>
          <AuthButton>무명소에 합류하기</AuthButton>
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
