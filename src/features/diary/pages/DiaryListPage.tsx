import { useParams } from "react-router-dom";
import QueryBoundary from "../../../components/status/QueryBoundary";
import CardListContainer from "../components/card/CardListContainer";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./DiaryListPage.module.css";
import type { UiType } from "../types/typeMap";

function DiaryListPage() {
  const { type } = useParams<{ type: UiType }>();
  const lower = type?.toLowerCase();

  const listType: "SHORT" | "LONG" = lower === "daily" ? "SHORT" : "LONG";

  const { data, isLoading, isError, error, refetch, isFetching } = useDiaries({
    type: listType,
  });
  const diaries = data?.posts ?? [];
  const coin = data?.coin ?? 0;

  const isEmpty = !isLoading && !isError && diaries.length === 0;

  return (
    <div className={classes.list}>
      <QueryBoundary
        isError={isError}
        error={error}
        isFetching={isFetching}
        onRetry={() => void refetch()}
        isEmpty={isEmpty}
        variant="list"
      >
        <CardListContainer
          diaries={diaries}
          coin={coin}
          isLoading={isFetching}
          isEmpty={isEmpty}
        />
      </QueryBoundary>
    </div>
  );
}

export default DiaryListPage;
