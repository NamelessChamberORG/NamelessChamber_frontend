import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./LoginPage.module.css";
import { PATHS } from "../../../constants/path";
import { useLogin } from "../hooks/useAuth";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";
import InputMessage from "../../../components/input/InputMessage";

function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState<string>("");

  const [step, setStep] = useState<"email" | "password">("email");
  const passwordRef = useRef<HTMLInputElement>(null);

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

  function handleEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && email.trim()) {
      e.preventDefault();
      setStep("password");
    }
  }

  useEffect(() => {
    if (step === "password") {
      passwordRef.current?.focus();
    }
  }, [step]);

  const showSignUp = step === "email" && email.trim().length === 0;

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
          onKeyDown={handleEmailKeyDown}
          autoComplete="username"
        />
        <InputMessage />

        {step === "password" && (
          <>
            <Input
              ref={passwordRef}
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
          </>
        )}
      </Form>

      {showSignUp && (
        <>
          <div>
            <Paragraph>하루에</Paragraph>
            <Paragraph>한 번의 기록, 무명소</Paragraph>
          </div>

          <div className={classes.authButtons}>
            <Link to={PATHS.SIGN_UP} className={classes.fullWidth}>
              <Button
                variant="sub"
                state="active"
                className={classes.fullWidth}
              >
                무명소에 합류하기
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default LoginPage;
