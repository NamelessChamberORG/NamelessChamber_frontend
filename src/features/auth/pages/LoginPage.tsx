import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useMemo } from "react";
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
import LoadingDots from "../../../components/loading/LoadingDots";
import { validateEmail } from "../validation/validators";
import { firstError, hasError } from "../validation/validationHelpers";

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

  const trimmedEmail = email.trim();
  const hasTypedEmail = trimmedEmail.length > 0;

  const emailIssues = useMemo(
    () => validateEmail(trimmedEmail),
    [trimmedEmail]
  );
  const emailValid = !hasError(emailIssues);
  const emailError = firstError(emailIssues);

  const canSubmit =
    step === "password" && emailValid && password.trim().length > 0;

  function goNextOrSubmit() {
    if (step === "email") {
      if (!emailValid) return;
      setServerError("");
      setStep("password");
      return;
    }

    if (!password.trim()) {
      setServerError("비밀번호를 입력해주세요");
      return;
    }

    if (!emailValid) {
      setServerError("올바른 이메일 형식을 입력해주세요");
      return;
    }

    setServerError("");
    login({ email: trimmedEmail, password: password.trim() });
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
    if (step === "password" && !emailValid) {
      setStep("email");
      setPassword("");
    }
  }, [emailValid, step]);

  const buttonLabel = isPending ? (
    <LoadingDots />
  ) : step === "email" ? (
    hasTypedEmail ? (
      "다음"
    ) : (
      "로그인 하기"
    )
  ) : (
    "로그인 하기"
  );

  const isButtonEnabled = step === "email" ? emailValid : canSubmit;

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
            aria-invalid={hasTypedEmail && !emailValid}
          />
          {hasTypedEmail && !emailValid ? (
            <InputMessage type="error" aria-live="polite">
              {emailError ?? "올바른 이메일 형식을 입력해주세요"}
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

        <div className={classes.btn}>
          <Button
            type="submit"
            disabled={isPending || !isButtonEnabled}
            variant={isButtonEnabled ? "main" : "sub"}
            state={isButtonEnabled ? "active" : "default"}
            className={classes.submit}
          >
            {buttonLabel}
          </Button>
        </div>

        <div
          className={`${classes.signUpArea} ${
            step === "email" && !hasTypedEmail ? classes.show : ""
          }`}
          aria-hidden={step !== "email" || hasTypedEmail}
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
