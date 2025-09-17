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

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

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

  const canGoNext = isValidEmail(email);
  const canSubmit =
    step === "password" && canGoNext && password.trim().length > 0;

  function goNextOrSubmit() {
    if (step === "email") {
      if (!canGoNext) {
        setServerError("올바른 이메일 형식을 입력해주세요");
        return;
      }
      setServerError("");
      setStep("password");
      return;
    }

    if (!password.trim()) {
      setServerError("비밀번호를 입력해주세요");
      return;
    }

    setServerError("");
    login({ email: email.trim(), password: password.trim() });
  }

  function handleEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      goNextOrSubmit();
    }
  }

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (step === "password") passwordRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (step === "password" && !isValidEmail(email)) {
      setStep("email");
      setPassword("");
    }
  }, [email, step]);

  return (
    <section className={classes.login}>
      <Paragraph>로그인</Paragraph>

      <Form
        onSave={goNextOrSubmit}
        className={`${classes.form} ${classes.controlWidth}`}
      >
        <div className={classes.fieldGroup}>
          <Input
            ref={emailRef}
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              if (serverError) setServerError("");
              setEmail(e.target.value);
            }}
            onKeyDown={handleEmailKeyDown}
            autoComplete="username"
          />
          {serverError && step === "email" ? (
            <InputMessage type="error" aria-live="polite">
              {serverError}
            </InputMessage>
          ) : (
            <InputMessage />
          )}
        </div>

        <div
          className={`${classes.passwordArea} ${
            step === "password" ? classes.show : ""
          }`}
          aria-hidden={step !== "password"}
        >
          <Input
            ref={passwordRef}
            type="password"
            placeholder="비밀번호 (영문, 숫자 포함 8-15자)"
            value={password}
            onChange={(e) => {
              if (serverError) setServerError("");
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />

          {serverError && step === "password" ? (
            <InputMessage type="error" aria-live="polite">
              {serverError}
            </InputMessage>
          ) : (
            <InputMessage />
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || !canSubmit}
          variant={canSubmit ? "main" : "sub"}
          state={canSubmit ? "active" : "default"}
          className={classes.submit}
        >
          {step === "email"
            ? "로그인하기"
            : isPending
            ? "로그인 중..."
            : "로그인 하기"}
        </Button>

        <div
          className={`${classes.signUpArea} ${
            step === "email" ? classes.show : ""
          }`}
          aria-hidden={step !== "email"}
        >
          <Link to={PATHS.SIGN_UP} className={classes.fullWidth}>
            <Button variant="sub" state="active" className={classes.fullWidth}>
              회원가입
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default LoginPage;
