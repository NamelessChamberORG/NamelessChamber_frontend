import Paragraph from "../../../components/paragraph/Paragraph";
import CardList from "../components/card/CardList";
import classes from "./SubmitDiaryPage.module.css";

function SubmitDiaryPage() {
  return (
    <div className={classes.submit}>
      <Paragraph>작성해주신 마음은 소중히 보관하겠습니다.</Paragraph>
      <Paragraph>무명보관소</Paragraph>
      <CardList />
    </div>
  );
}

export default SubmitDiaryPage;
