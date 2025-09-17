import { useMemo, useRef, useState, useEffect } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SignupPage.module.css";
import { useSignup } from "../hooks/useAuth";
import { PATHS } from "../../../constants/path";
import { useNavigate } from "react-router";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";
import InputMessage from "../../../components/input/InputMessage";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../validation/validators";
import { firstError, hasError } from "../validation/validationHelpers";
import Button from "../../../components/button/Button";

type Step = "email" | "pw";

function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // ====== states ======
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // refs for auto focus
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwcRef = useRef<HTMLInputElement>(null);

  // ====== signup mutation ======
  const { mutate: signup, isPending } = useSignup({
    onSuccess: () => {
      navigate(PATHS.NICKNAME);
    },
    onError: (err) => {
      showToast(getErrorMessage(err), "cancel");
    },
  });

  // ====== validators (derive) ======
  const trimmedEmail = email.trim();

  const emailIssues = useMemo(
    () => validateEmail(trimmedEmail),
    [trimmedEmail]
  );
  const pwIssues = useMemo(() => validatePassword(password), [password]);
  const pwcIssues = useMemo(
    () => validatePasswordConfirm(password, passwordConfirm),
    [password, passwordConfirm]
  );

  const emailError = firstError(emailIssues);
  const pwError = firstError(pwIssues);
  const pwcError = firstError(pwcIssues);

  const hasEmail = trimmedEmail.length > 0;
  const hasPw = password.length > 0;
  const hasPwc = passwordConfirm.length > 0;

  const showEmailError = hasEmail && hasError(emailIssues);
  const showPwError = hasPw && hasError(pwIssues);
  const showPwcError = hasPwc && hasError(pwcIssues);

  const showEmailSuccess = hasEmail && !hasError(emailIssues);
  const showPwSuccess = hasPw && !hasError(pwIssues);
  const showPwcSuccess = hasPwc && !hasError(pwcIssues);

  const canGoNextEmail = showEmailSuccess;
  const canSubmitPw = showPwSuccess && showPwcSuccess && !isPending;

  // ====== handlers ======
  function goNextOrSubmit() {
    if (step === "email") {
      if (!canGoNextEmail) return;
      setStep("pw");
      return;
    }
    if (!canSubmitPw) return;
    signup({ email: trimmedEmail, password });
  }

  function handleEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    goNextOrSubmit();
  }

  function handlePwKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!hasError(pwIssues) && hasPw) {
      pwcRef.current?.focus();
    }
  }

  function handlePwcKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    goNextOrSubmit();
  }

  useEffect(() => {
    if (step === "email") emailRef.current?.focus();
    if (step === "pw") pwRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (step === "pw" && hasError(emailIssues)) {
      setStep("email");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [emailIssues, step]);

  const isEnabled = step === "email" ? canGoNextEmail : canSubmitPw;

  return (
    <section className={classes.signup}>
      <Paragraph>회원가입</Paragraph>

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
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            autoComplete="username"
            aria-invalid={showEmailError}
            enterKeyHint="next"
          />
          {showEmailError ? (
            <InputMessage type="error" aria-live="polite">
              {emailError}
            </InputMessage>
          ) : showEmailSuccess ? (
            <InputMessage type="success" aria-live="polite">
              사용 가능합니다.
            </InputMessage>
          ) : (
            <InputMessage />
          )}
        </div>

        <div
          className={`${classes.pwBlock} ${step === "pw" ? classes.show : ""}`}
          aria-hidden={step !== "pw"}
        >
          <Input
            ref={pwRef}
            type="password"
            placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePwKeyDown}
            autoComplete="new-password"
            aria-invalid={showPwError}
            enterKeyHint="next"
          />
          {showPwError ? (
            <InputMessage type="error" aria-live="polite">
              {pwError}
            </InputMessage>
          ) : showPwSuccess ? (
            <InputMessage type="success" aria-live="polite">
              사용 가능합니다.
            </InputMessage>
          ) : (
            <InputMessage />
          )}

          <Input
            ref={pwcRef}
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onKeyDown={handlePwcKeyDown}
            autoComplete="new-password"
            aria-invalid={showPwcError}
            enterKeyHint="done"
          />
          {showPwcError ? (
            <InputMessage type="error" aria-live="polite">
              {pwcError}
            </InputMessage>
          ) : showPwcSuccess ? (
            <InputMessage type="success" aria-live="polite">
              일치합니다.
            </InputMessage>
          ) : (
            <InputMessage />
          )}
        </div>

        <div className={classes.btn}>
          <Button
            type="submit"
            disabled={isPending || !isEnabled}
            variant="sub"
            state={isEnabled ? "active" : "default"}
          >
            {step === "email" ? "다음" : isPending ? "가입 중..." : "가입하기"}
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default SignupPage;
