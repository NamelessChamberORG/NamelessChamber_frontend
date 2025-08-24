import QueryBoundary from "../../../components/status/QueryBoundary";
import CardList from "../components/card/CardList";
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
    <div className={classes.submit}>
      <img
        src="/logo_kr.png"
        alt="nameless_chamber_logo"
        style={{ width: "5rem" }}
      />
      <QueryBoundary
        isError={isError}
        error={error}
        isFetching={isFetching}
        onRetry={() => void refetch()}
        isEmpty={isEmpty}
        variant="list"
      >
        <CardList diaries={diaries} isLoading={isFetching} />
      </QueryBoundary>
    </div>
  );
}

export default DiaryListPage;
