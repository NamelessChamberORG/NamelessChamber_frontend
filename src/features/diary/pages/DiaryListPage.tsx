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

  const { data, isLoading, isError, error, refetch, isFetching } = useDiaries({
    type: listType,
  });

  if (isError)
    return (
      <InlineError
        isFetching={isFetching}
        onRetry={() => void refetch()}
        message={error.message}
      />
    );

  const diaries = data?.posts ?? [];
  const coin = data?.coin ?? 0;

  const isEmpty = !isLoading && !isError && diaries.length === 0;

  return (
    <div className={classes.list}>
      <CardListContainer
        diaries={diaries}
        coin={coin}
        isLoading={isFetching}
        isEmpty={isEmpty}
        type={type ?? "daily"}
      />
    </div>
  );
}

export default DiaryListPage;
