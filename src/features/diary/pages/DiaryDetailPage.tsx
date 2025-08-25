import QueryBoundary from "../../../components/status/QueryBoundary";
import FadeInOnView from "../components/FadeInOnView";
import Paragraph from "../../../components/paragraph/Paragraph";
import classes from "./DiaryDetailPage.module.css";
import { useMemo } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams, Navigate, Link } from "react-router";
import { formatDiaryTime } from "../../../lib/diary/formatDiaryTime";
import Button from "../../../components/button/Button";

function DetailContent({
  content,
  isLoading,
  createdLabel,
}: {
  content?: string;
  isLoading: boolean;
  createdLabel?: string;
}) {
  const paragraphs = useMemo(() => {
    const trimmed = content?.trim();
    return trimmed ? trimmed.split(/\n{2,}/g) : [];
  }, [content]);

  return (
    <section className={`${classes.diary} ${classes.detail}`}>
      {createdLabel && (
        <Paragraph className={classes.intro} aria-live="polite">
          {createdLabel}
        </Paragraph>
      )}

      <div className={classes.lines} aria-busy={isLoading}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={classes.paragraphSkeleton} />
          ))
        ) : paragraphs.length > 0 ? (
          <>
            {paragraphs.map((p, i) => (
              <FadeInOnView key={i} className={classes.paragraph} once>
                {p}
              </FadeInOnView>
            ))}
            <div className={classes.closing}>
              <div>
                <Paragraph>또 하나의 고백을 만나기 위해,</Paragraph>
                <Paragraph>당신의 이야기를 한 번 더 흘려보내주세요</Paragraph>
              </div>
              <Link to="/diary/new" className={classes.link}>
                <Button>한 번 더 흘려 보내기</Button>
              </Link>
            </div>
          </>
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

  const createdLabel =
    data?.createdAt && !isLoading ? formatDiaryTime(data.createdAt) : undefined;

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
        createdLabel={createdLabel}
      />
    </QueryBoundary>
  );
}
