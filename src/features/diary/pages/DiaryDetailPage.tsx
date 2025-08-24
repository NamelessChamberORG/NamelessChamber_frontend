import FadeInOnView from "../components/FadeInOnView";
import classes from "./DiaryDetailPage.module.css";
import Paragraph from "../../../components/paragraph/Paragraph";
import { useMemo } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams, Navigate } from "react-router";

function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useDiary(id);

  const paragraphs = useMemo(() => {
    const content = data?.content?.trim();
    return content ? content.split(/\n{2,}/g) : [];
  }, [data?.content]);

  return (
    <>
      {!id ? (
        <Navigate to="/diaries" replace />
      ) : isLoading ? (
        <div>일기를 불러오고 있습니다...</div>
      ) : isError || !data ? (
        <div>일기를 불러오지 못했습니다.</div>
      ) : (
        <section className={`${classes.diary} ${classes.detail}`}>
          <Paragraph className={classes.intro}>
            곰곰이 시간을 들여서 다른 고민을 읽어보세요
          </Paragraph>

          <div className={classes.lines}>
            {paragraphs.map((p, i) => (
              <FadeInOnView key={i} className={classes.paragraph} once>
                {p}
              </FadeInOnView>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default DiaryDetailPage;
