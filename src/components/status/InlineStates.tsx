import Button from "../button/Button";
import classes from "./InlineStates.module.css";

export function InlineLoading() {
  return <div style={{ padding: 24 }}>로딩 중…</div>;
}

export function InlineEmpty({ message = "표시할 내용이 없어요." }) {
  return <div style={{ padding: 24 }}>{message}</div>;
}

type InlineErrorProps = {
  onRetry?: () => void;
  isFetching?: boolean;
  message?: string;
};

export function InlineError({
  onRetry,
  isFetching,
  message = "문제가 발생했어요. 잠시 후 다시 시도해주세요.",
}: InlineErrorProps) {
  return (
    <div className={classes.container}>
      <p className={classes.message}>{message}</p>
      <div className={classes.actions}>
        {onRetry && (
          <Button
            className={classes.button}
            onClick={onRetry}
            disabled={isFetching}
          >
            {isFetching ? "다시 시도 중…" : "다시 시도"}
          </Button>
        )}
      </div>
    </div>
  );
}
