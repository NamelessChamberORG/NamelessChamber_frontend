import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import classes from "./ErrorPage.module.css";

const COPY: Record<
  string,
  { title: string; desc: string; cta?: string; to?: string }
> = {
  INVALID_ACCESS: {
    title: "잘못된 접근이에요",
    desc: "정상 경로로 다시 시도해주세요.",
    cta: "홈으로 가기",
    to: "/",
  },
  FORBIDDEN: {
    title: "권한이 없어요",
    desc: "이 페이지를 볼 권한이 없습니다.",
    cta: "홈으로 가기",
    to: "/",
  },
  NOT_FOUND: {
    title: "페이지를 찾을 수 없어요",
    desc: "주소가 바뀌었거나 삭제되었을 수 있어요.",
    cta: "홈으로 가기",
    to: "/",
  },
  UNKNOWN: {
    title: "문제가 발생했어요",
    desc: "알 수 없는 오류가 발생했습니다.",
    cta: "홈으로 가기",
    to: "/",
  },
};

export default function ErrorPage() {
  const nav = useNavigate();
  const { state, search } = useLocation() as {
    state?: { code?: string; message?: string };
    search: string;
  };

  let code = state?.code;
  let message = state?.message;

  if (!code) {
    const params = new URLSearchParams(search);
    code = params.get("code") ?? undefined;
    message = message ?? params.get("message") ?? undefined;
  }

  const copy = COPY[code ?? "UNKNOWN"] ?? COPY.UNKNOWN;

  const handleClick = () => {
    if (copy.to) nav(copy.to, { replace: true });
    else window.location.reload();
  };

  return (
    <section className={classes.error}>
      <div className={classes.card}>
        <h1 className={classes.title}>{copy.title}</h1>
        <p className={message ?? classes.desc} aria-live="polite">
          {copy.desc}
        </p>

        {copy.cta && (
          <div className={classes.actions}>
            <Button onClick={handleClick}>{copy.cta}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
