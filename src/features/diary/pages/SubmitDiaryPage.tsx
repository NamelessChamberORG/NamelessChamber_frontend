import CardList from "../components/card/CardList";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./SubmitDiaryPage.module.css";

function SubmitDiaryPage() {
  const { data: diaries, isLoading } = useDiaries();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.submit}>
      <img
        src="/logo_kr.png"
        alt="nameless_chamber_logo"
        style={{ width: "5rem" }}
      ></img>
      <CardList diaries={diaries ?? []} />
    </div>
  );
}

export default SubmitDiaryPage;
