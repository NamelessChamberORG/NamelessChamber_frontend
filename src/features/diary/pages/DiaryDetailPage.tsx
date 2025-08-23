import FadeInOnView from "../components/FadeInOnView";
import classes from "./DiaryDetailPage.module.css";
import Paragraph from "../../../components/paragraph/Paragraph";
import { useMemo } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams } from "react-router";

function DiaryDetailPage() {
  const { id } = useParams<keyof { id: string }>() as { id: string };
  const { data, isLoading } = useDiary(id);

  const paragraphs: string[] = useMemo(() => {
    if (!data?.content) return [];
    return data.content.trim().split(/\n{2,}/g);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={`${classes.diary} ${classes.detail}`}>
      <Paragraph>곰곰이 시간을 들여서 다른 고민을 읽어보세요</Paragraph>

      <div className={classes.lines}>
        {paragraphs.map((p, i) => (
          <FadeInOnView key={i} className={classes.paragraph} once>
            {p}
          </FadeInOnView>
        ))}
      </div>
    </section>
  );
}

export default DiaryDetailPage;
