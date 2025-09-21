import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SetNicknamePage.module.css";
import { useCreateNickname } from "../hooks/useCreateNickname";
import { PATHS } from "../../../constants/path";
import InputMessage from "../../../components/input/InputMessage";
import { validateNickname } from "../../auth/validation/validators";
import { firstError, hasError } from "../../auth/validation/validationHelpers";
import Button from "../../../components/button/Button";
import LoadingDots from "../../../components/loading/LoadingDots";

type LocationState = { from?: string } | null;

function SetNicknamePage() {
  const [nickname, setNickname] = useState("");
  const [serverError, setServerError] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const from = ((location.state as LocationState)?.from ??
    PATHS.PROFILE) as string;

  const nicknameIssues = useMemo(
    () => validateNickname(nickname.trim()),
    [nickname]
  );
  const clientInvalid = hasError(nicknameIssues);
  const clientErrorMsg = firstError(nicknameIssues);

  const { mutate: createNickname, isPending } = useCreateNickname({
    onSuccess: () => {
      const trimmed = nickname.trim();

      queryClient.setQueryData(["user", "me"], (prev: any) => ({
        ...(prev ?? {}),
        nickname: trimmed,
      }));
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });

      navigate(from, { replace: true });
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
    if (clientInvalid || !value) return;
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
        className={classes.form}
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

        <div className={classes.btn}>
          <Button
            type="submit"
            disabled={disabled}
            variant="main"
            state={isPending || !disabled ? "active" : "default"}
          >
            {isPending ? <LoadingDots /> : "설정하기"}
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default SetNicknamePage;
