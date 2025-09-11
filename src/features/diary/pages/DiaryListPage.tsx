import { useState } from "react";
import { useParams } from "react-router-dom";
import CardListContainer from "../components/card/CardListContainer";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./DiaryListPage.module.css";
import type { UiType } from "../types/typeMap";
import { InlineError } from "../../../components/status/InlineStates";

function DiaryListPage() {
  const { type } = useParams<{ type: UiType }>();
  const lower = type?.toLowerCase();

  const listType: "SHORT" | "LONG" = lower === "daily" ? "SHORT" : "LONG";

  const { data, isLoading, isError, error, refetch } = useDiaries({
    type: listType,
  });

  const [retrying, setRetrying] = useState(false);

  if (isError) {
    const message =
      error && typeof (error as any).message === "string"
        ? (error as any).message
        : "문제가 발생했어요. 잠시 후 다시 시도해주세요.";

    return (
      <InlineError
        isLoading={retrying}
        onRetry={async () => {
          try {
            setRetrying(true);
            await refetch();
          } finally {
            setRetrying(false);
          }
        }}
        message={message}
      />
    );
  }

  const diaries = data?.posts ?? [];
  const coin = data?.coin ?? 0;
  const isEmpty = !isLoading && diaries.length === 0;

  return (
    <div className={classes.list}>
      <CardListContainer
        diaries={diaries}
        coin={coin}
        isLoading={isLoading}
        isEmpty={isEmpty}
        type={(type as UiType) ?? "daily"}
        emptyMessage="아직 등록된 글이 없어요"
      />
    </div>
  );
}

export default DiaryListPage;
