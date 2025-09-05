import { useState } from "react";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./SignupPage.module.css";
import { useSignup } from "../hooks/useAuth";
import { PATHS } from "../../../constants/path";
import { useNavigate } from "react-router";
import { useToast } from "../../../contexts/ToastContext";
import { getErrorMessage } from "../../../api/helpers";

function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signup, isPending } = useSignup({
    onSuccess: () => {
      showToast("회원가입이 완료되었습니다", "check");
      navigate(PATHS.HOME);
    },
    onError: (err) => {
      showToast(getErrorMessage(err), "cancel");
    },
  });

  function handleSignup() {
    const id = email.trim();
    const pw = password.trim();

    if (!id || !pw) {
      showToast("아이디와 비밀번호를 모두 입력해주세요", "info");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(pw)) {
      showToast("비밀번호는 숫자·영문 포함 8-15자여야 합니다", "info");
      return;
    }

    signup({ email: id, password: pw });
  }

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
        />
        <Input
          type="password"
          placeholder="비밀번호 (숫자, 영문 포함 8-15자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "가입 중..." : "가입하기"}
        </Button>
      </Form>
    </section>
  );
}

export default SignupPage;
