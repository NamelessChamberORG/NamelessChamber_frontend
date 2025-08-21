import CardList from "../components/card/CardList";
import { useDiaries } from "../hooks/useDiaries";
import classes from "./DiaryListPage.module.css";

function DiaryListPage() {
  const { data: diaries, isLoading } = useDiaries();

  return (
    <div className={classes.submit}>
      <img
        src="/logo_kr.png"
        alt="nameless_chamber_logo"
        style={{ width: "5rem" }}
      ></img>
      <CardList diaries={diaries ?? []} isLoading={isLoading} />
    </div>
  );
}

export default DiaryListPage;
