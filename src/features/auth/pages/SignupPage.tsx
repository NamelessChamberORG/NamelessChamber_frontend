import { useMemo, useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SignupPage.module.css";
import { useSignup } from "../hooks/useAuth";
import { PATHS } from "../../../constants/path";
import { useNavigate } from "react-router";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";
import AuthButton from "../components/AuthButton";
import InputMessage from "../../../components/input/InputMessage";
import {
  validateId,
  validatePassword,
  validatePasswordConfirm,
} from "../validation/validators";
import { firstError, hasError } from "../validation/validationHelpers";

function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { mutate: signup, isPending } = useSignup({
    onSuccess: () => {
      navigate(PATHS.NICKNAME);
    },
    onError: (err) => {
      showToast(getErrorMessage(err), "cancel");
    },
  });

  function handleSignup() {
    const id = email.trim();
    const pw = password.trim();
    signup({ email: id, password: pw });
  }

  // --- 유효성 검사 & 메시지 상태 계산 ---
  const idIssues = useMemo(() => validateId(email.trim()), [email]);
  const pwIssues = useMemo(() => validatePassword(password), [password]);
  const pwcIssues = useMemo(
    () => validatePasswordConfirm(password, passwordConfirm),
    [password, passwordConfirm]
  );

  const idError = firstError(idIssues);
  const pwError = firstError(pwIssues);
  const pwcError = firstError(pwcIssues);

  const hasId = email.trim().length > 0;
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

  return (
    <section className={classes.signup}>
      <Paragraph>환영합니다</Paragraph>
      <Form onSave={handleSignup}>
        <Input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <InputMessage></InputMessage>
        )}

        <Input
          type="password"
          placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          <InputMessage></InputMessage>
        )}

        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
          <InputMessage></InputMessage>
        )}

        <AuthButton type="submit" disabled={disabled}>
          {isPending ? "가입 중..." : "가입하기"}
        </AuthButton>
      </Form>
    </section>
  );
}

export default SignupPage;
