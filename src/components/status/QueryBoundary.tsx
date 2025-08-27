import type { ReactNode } from "react";
import classes from "./QueryBoundary.module.css";
import Button from "../button/Button";

type Props = {
  // react-query 상태 값
  isLoading?: boolean;
  isError: boolean;
  error?: unknown;
  isFetching?: boolean;

  isEmpty?: boolean;

  onRetry?: () => void;

  // 화면 구성
  variant?: "list" | "detail";
  skeleton?: ReactNode;
  empty?: ReactNode;
  errorRender?: (error: unknown) => ReactNode;
  children: ReactNode;
};

function DefaultSkeleton({
  variant = "list",
}: {
  variant?: "list" | "detail";
}) {
  if (variant === "detail") {
    return (
      <div className={classes.detailSkeleton}>
        <div className={classes.line} />
        <div className={classes.line} />
        <div className={classes.line} />
        <div className={classes.lineShort} />
      </div>
    );
  }
  return (
    <ul className={classes.listSkeleton}>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className={classes.cardSkeleton} />
      ))}
    </ul>
  );
}

function DefaultError({
  error,
  onRetry,
  isFetching,
}: {
  error?: unknown;
  onRetry?: () => void;
  isFetching?: boolean;
}) {
  const status = (error as any)?.response?.status;
  const msg =
    status === 404
      ? "대상을 찾을 수 없습니다."
      : "불러오는 중 문제가 발생했어요. 네트워크 상태를 확인해 주세요.";

  return (
    <div className={classes.error}>
      <p>{msg}</p>
      {onRetry && (
        <Button onClick={onRetry} disabled={isFetching}>
          {isFetching ? "다시 시도 중…" : "다시 시도"}
        </Button>
      )}
    </div>
  );
}

function DefaultEmpty({ variant = "list" }: { variant?: "list" | "detail" }) {
  const msg =
    variant === "detail" ? "아직 내용이 없습니다." : "아직 등록된 글이 없어요.";
  return <div className={classes.empty}>{msg}</div>;
}

export default function QueryBoundary({
  isLoading,
  isError,
  error,
  isFetching,
  isEmpty,
  onRetry,
  variant = "list",
  skeleton,
  empty,
  errorRender,
  children,
}: Props) {
  if (isLoading)
    return <>{skeleton ?? <DefaultSkeleton variant={variant} />}</>;

  if (isError) {
    return (
      <>
        {errorRender ? (
          errorRender(error)
        ) : (
          <DefaultError
            error={error}
            onRetry={onRetry}
            isFetching={isFetching}
          />
        )}
      </>
    );
  }

  if (isEmpty) return <>{empty ?? <DefaultEmpty variant={variant} />}</>;

  return <>{children}</>;
}
