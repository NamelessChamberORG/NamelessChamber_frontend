import { useEffect, useMemo, useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SetNicknamePage.module.css";
import { useCreateNickname } from "../hooks/useCreateNickname";
import { useNavigate } from "react-router";
import { PATHS } from "../../../constants/path";
import InputMessage from "../../../components/input/InputMessage";
import { validateNickname } from "../../auth/validation/validators";
import { firstError, hasError } from "../../auth/validation/validationHelpers";
import Button from "../../../components/button/Button";

function SetNicknamePage() {
  const [nickname, setNickname] = useState("");
  const [serverError, setServerError] = useState<string>("");

  const navigate = useNavigate();

  const nicknameIssues = useMemo(
    () => validateNickname(nickname.trim()),
    [nickname]
  );
  const clientInvalid = hasError(nicknameIssues);
  const clientErrorMsg = firstError(nicknameIssues);

  const { mutate: createNickname, isPending } = useCreateNickname({
    onSuccess: () => {
      navigate(PATHS.HOME);
    },
    onError: (err) => {
      setServerError(err.message);
    },
  });

  useEffect(() => {
    if (serverError) setServerError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  function handleSubmit() {
    const value = nickname.trim();
    if (clientInvalid) return;
    createNickname(value);
  }

  const disabled = isPending || clientInvalid;
  const hasValue = nickname.trim().length > 0;
  const showClientError = clientInvalid && hasValue;
  const showServerError = !!serverError;
  const showSuccess = hasValue && !clientInvalid && !serverError;

  return (
    <section className={classes.nickname}>
      <div className={classes.header}>
        <Paragraph>닉네임</Paragraph>
        <p className={classes.description}>
          이곳에서 당신은 무슨 이름으로 불리고 싶나요?
        </p>
      </div>

      <Form
        onSave={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          name="nickname"
          onChange={(e) => setNickname(e.target.value)}
          aria-invalid={showClientError || showServerError}
        />

        {showClientError ? (
          <InputMessage type="error" aria-live="polite">
            {clientErrorMsg}
          </InputMessage>
        ) : showServerError ? (
          <InputMessage type="error" aria-live="polite">
            {serverError}
          </InputMessage>
        ) : showSuccess ? (
          <InputMessage type="success" aria-live="polite">
            사용 가능합니다.
          </InputMessage>
        ) : (
          <InputMessage></InputMessage>
        )}

        <Button
          type="submit"
          disabled={disabled}
          variant={!disabled ? "main" : "sub"}
          state={!disabled ? "active" : "default"}
        >
          {isPending ? "설정 중..." : "설정하기"}
        </Button>
      </Form>
    </section>
  );
}

export default SetNicknamePage;
