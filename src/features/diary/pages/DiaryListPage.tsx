import { useParams } from "react-router";
import QueryBoundary from "../../../components/status/QueryBoundary";
import CardListContainer from "../components/card/CardListContainer";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./DiaryListPage.module.css";

function DiaryListPage() {
  const { type } = useParams<{ type: string }>();
  const lower = type?.toLowerCase();

  const listType: "SHORT" | "LONG" = lower === "short" ? "SHORT" : "LONG";

  const {
    data: diaries = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDiaries({ type: listType });

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
          isLoading={isFetching}
          isEmpty={isEmpty}
        />
      </QueryBoundary>
    </div>
  );
}

export default DiaryListPage;
