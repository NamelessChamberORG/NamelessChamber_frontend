import CardList from "../components/card/CardList";
import classes from "./SubmitDiaryPage.module.css";

function SubmitDiaryPage() {
  return (
    <div className={classes.submit}>
      <img
        src="/logo_kr.png"
        alt="nameless_chamber_logo"
        style={{ width: "5rem" }}
      ></img>
      <CardList />
    </div>
  );
}

export default SubmitDiaryPage;
