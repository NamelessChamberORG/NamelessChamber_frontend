import { useEffect, useMemo, useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import AuthButton from "../../auth/components/AuthButton";
import classes from "./SetNicknamePage.module.css";
import { useCreateNickname } from "../hooks/useCreateNickname";
import { useNavigate } from "react-router";
import { PATHS } from "../../../constants/path";
import { useToast } from "../../../contexts/ToastContext";
import InputMessage from "../../../components/input/InputMessage";
import { validateNickname } from "../../auth/validation/validators";
import { firstError, hasError } from "../../auth/validation/validationHelpers";

function SetNicknamePage() {
  const [nickname, setNickname] = useState("");
  const [serverError, setServerError] = useState<string>("");

  const navigate = useNavigate();
  const { showToast } = useToast();

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
      showToast(err.message, "cancel");
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

  return (
    <section className={classes.nickname}>
      <Paragraph>닉네임</Paragraph>
      <p className={classes.description}>
        이곳에서 당신은 무슨 이름으로 불리고 싶나요?
      </p>

      <Form onSave={handleSubmit}>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          aria-invalid={clientInvalid || !!serverError}
        />

        {clientInvalid ? (
          <InputMessage type="error">{clientErrorMsg}</InputMessage>
        ) : serverError ? (
          <InputMessage type="error">{serverError}</InputMessage>
        ) : (
          <InputMessage type="error">
            8~16자의 영문 또는 영문+숫자 조합
          </InputMessage>
        )}

        <AuthButton type="submit" disabled={disabled}>
          {isPending ? "설정 중..." : "설정하기"}
        </AuthButton>
      </Form>
    </section>
  );
}

export default SetNicknamePage;
