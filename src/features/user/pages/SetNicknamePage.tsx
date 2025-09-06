import { useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import AuthButton from "../../auth/components/AuthButton";
import classes from "./SetNicknamePage.module.css";
import { useCreateNickname } from "../hooks/useCreateNickname";
import { useNavigate } from "react-router";
import { PATHS } from "../../../constants/path";
import { useToast } from "../../../contexts/ToastContext";

function SetNicknamePage() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    mutate: createNickname,
    isPending,
    error,
  } = useCreateNickname({
    onSuccess: () => {
      setNickname(nickname);
      navigate(PATHS.HOME);
    },
    onError: (err) => {
      showToast(err.message, "cancel");
    },
  });

  function handleSubmit() {
    const value = nickname.trim();
    if (value.length < 2) {
      return;
    }
    createNickname(value);
  }

  const disabled = isPending || nickname.trim().length < 2;

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
        />
        <AuthButton type="submit" disabled={disabled}>
          {isPending ? "설정 중..." : "설정하기"}
        </AuthButton>
      </Form>

      {error && (
        <p className={classes.error} aria-live="polite">
          {error.message}
        </p>
      )}
    </section>
  );
}

export default SetNicknamePage;
