import { Link, useNavigate } from "react-router";
import { useState } from "react";
import AuthProviderButton from "../../../components/button/AuthProviderButton";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./LoginPage.module.css";
import { PATHS } from "../../../constants/path";
import { useLogin } from "../hooks/useAuth";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";

function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      showToast("로그인에 성공했습니다", "check");
      navigate(PATHS.HOME);
    },
    onError: (err) => {
      showToast(getErrorMessage(err), "cancel");
    },
  });

  function handleLogin() {
    const id = email.trim();
    const pw = password.trim();

    if (!id || !pw) {
      showToast("아이디와 비밀번호를 모두 입력해주세요", "info");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(pw)) {
      showToast("비밀번호는 숫자·영문 포함 8-15자여야 합니다", "info");
      return;
    }

    login({ email: id, password: pw });
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
        <Input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <Input
          type="password"
          placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인 하기"}
        </Button>
      </Form>
    </section>
  );
}

export default LoginPage;
