import QueryBoundary from "../../../components/status/QueryBoundary";
import CardListContainer from "../components/card/CardListContainer";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./DiaryListPage.module.css";

function DiaryListPage() {
  const {
    data: diaries = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDiaries();

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
