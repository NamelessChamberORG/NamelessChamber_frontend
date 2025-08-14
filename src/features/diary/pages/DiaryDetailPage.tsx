import FadeInOnView from "../components/FadeInOnView";
import classes from "./DiaryDetailPage.module.css";
import mockDiaryDetail from "../../../mock/mockDiaryDetail";
import Paragraph from "../../../components/paragraph/Paragraph";

function DiaryDetailPage() {
  return (
    <section className={`${classes.diary} ${classes.detail}`}>
      <Paragraph>곰곰히 시간을 들여서 다른 고민을 읽어보세요</Paragraph>

      <div className={classes.lines}>
        {mockDiaryDetail.content.split("\n").map((line, index) => (
          <FadeInOnView key={index} className={classes.content} once={true}>
            {line}
          </FadeInOnView>
        ))}
      </div>
    </section>
  );
}

export default DiaryDetailPage;
