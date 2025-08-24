import QueryBoundary from "../../../components/status/QueryBoundary";
import FadeInOnView from "../components/FadeInOnView";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./DiaryDetailPage.module.css";
import { useMemo } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams, Navigate } from "react-router";

function DetailContent({
  content,
  isLoading,
}: {
  content?: string;
  isLoading: boolean;
}) {
  const paragraphs = useMemo(() => {
    const trimmed = content?.trim();
    return trimmed ? trimmed.split(/\n{2,}/g) : [];
  }, [content]);

  return (
    <section className={`${classes.diary} ${classes.detail}`}>
      <Paragraph className={classes.intro}>
        곰곰이 시간을 들여서 다른 고민을 읽어보세요
      </Paragraph>

      <div className={classes.lines} aria-busy={isLoading}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={classes.paragraphSkeleton} />
          ))
        ) : paragraphs.length > 0 ? (
          paragraphs.map((p, i) => (
            <FadeInOnView key={i} className={classes.paragraph} once>
              {p}
            </FadeInOnView>
          ))
        ) : (
          <div className={classes.empty} role="status" aria-live="polite">
            아직 내용이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}

export default function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch, isFetching } = useDiary(id);

  if (!id) return <Navigate to="/diaries" replace />;

  return (
    <QueryBoundary
      isError={isError || (!isLoading && !data)}
      error={error}
      isFetching={isFetching}
      onRetry={() => void refetch()}
      variant="detail"
    >
      <DetailContent
        content={data?.content}
        isLoading={isLoading || isFetching}
      />
    </QueryBoundary>
  );
}
