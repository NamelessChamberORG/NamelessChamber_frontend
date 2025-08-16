import FadeInOnView from "../components/FadeInOnView";
import classes from "./DiaryDetailPage.module.css";
import mockDiaryDetail from "../../../mock/mockDiaryDetail";
import Paragraph from "../../../components/paragraph/Paragraph";
import { useMemo } from "react";

function DiaryDetailPage() {
  const paragraphs = useMemo(
    () => mockDiaryDetail.content.trim().split(/\n{2,}/g),
    []
  );

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
