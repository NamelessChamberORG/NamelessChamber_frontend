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
  validateId,
  validatePassword,
  validatePasswordConfirm,
} from "../validation/validators";
import { firstError, hasError } from "../validation/validationHelpers";
import Button from "../../../components/button/Button";

type Step = "id" | "pw" | "pwc";

function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // ====== states ======
  const [step, setStep] = useState<Step>("id");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // refs for auto focus
  const idRef = useRef<HTMLInputElement>(null);
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
  const trimmedId = email.trim();
  const idIssues = useMemo(() => validateId(trimmedId), [trimmedId]);
  const pwIssues = useMemo(() => validatePassword(password), [password]);
  const pwcIssues = useMemo(
    () => validatePasswordConfirm(password, passwordConfirm),
    [password, passwordConfirm]
  );

  const idError = firstError(idIssues);
  const pwError = firstError(pwIssues);
  const pwcError = firstError(pwcIssues);

  const hasId = trimmedId.length > 0;
  const hasPw = password.length > 0;
  const hasPwc = passwordConfirm.length > 0;

  const showIdError = hasId && hasError(idIssues);
  const showPwError = hasPw && hasError(pwIssues);
  const showPwcError = hasPwc && hasError(pwcIssues);

  const showIdSuccess = hasId && !hasError(idIssues);
  const showPwSuccess = hasPw && !hasError(pwIssues);
  const showPwcSuccess = hasPwc && !hasError(pwcIssues);

  const disabled =
    isPending ||
    hasError(idIssues) ||
    hasError(pwIssues) ||
    hasError(pwcIssues);

  // ====== handlers ======
  function handleSignup() {
    if (disabled) return;
    signup({ email: trimmedId, password });
  }

  function handleIdKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!hasError(idIssues) && hasId) {
      setStep("pw");
    }
  }

  function handlePwKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!hasError(pwIssues) && hasPw) {
      setStep("pwc");
    }
  }

  function handlePwcKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (
      !hasError(pwcIssues) &&
      hasPwc &&
      !hasError(pwIssues) &&
      !hasError(idIssues)
    ) {
      handleSignup();
    }
  }

  useEffect(() => {
    if (step === "id") idRef.current?.focus();
    if (step === "pw") pwRef.current?.focus();
    if (step === "pwc") pwcRef.current?.focus();
  }, [step]);

  return (
    <section className={classes.signup}>
      <Paragraph>환영합니다</Paragraph>

      <Form
        onSave={handleSignup}
        className={`${classes.form} ${classes.controlWidth}`}
      >
        <div className={classes.fieldGroup}>
          <Input
            ref={idRef}
            type="text"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleIdKeyDown}
            autoComplete="username"
            aria-invalid={showIdError}
            aria-describedby="signup-id-help"
          />
          {showIdError ? (
            <InputMessage type="error" aria-live="polite">
              {idError}
            </InputMessage>
          ) : showIdSuccess ? (
            <InputMessage type="success" aria-live="polite">
              사용 가능합니다.
            </InputMessage>
          ) : (
            <InputMessage />
          )}
        </div>

        <div
          className={`${classes.pwArea} ${step !== "id" ? classes.show : ""}`}
          aria-hidden={step === "id"}
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
            aria-describedby="signup-pw-help"
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
        </div>

        <div
          className={`${classes.pwcArea} ${step === "pwc" ? classes.show : ""}`}
          aria-hidden={step !== "pwc"}
        >
          <Input
            ref={pwcRef}
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onKeyDown={handlePwcKeyDown}
            autoComplete="new-password"
            aria-invalid={showPwcError}
            aria-describedby="signup-pwc-help"
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

          <Button
            type="submit"
            disabled={disabled}
            variant={!disabled ? "sub" : "sub"}
            state={!disabled ? "active" : "default"}
          >
            {isPending ? "가입 중..." : "가입하기"}
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default SignupPage;
