import Button from "../../../components/button/Button";
import { getNickname } from "../../auth/api/tokenStore";
import CoinInfo from "../components/CoinInfo";
import FeedbackCard from "../components/FeedbackCard";
import UserInfo from "../components/UserInfo";
import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const nickname = getNickname();
  return (
    <section className={classes.profile}>
      <div className={classes.profileSection}>
        <UserInfo nickname={nickname ?? ""} />
        <CoinInfo coin={0} />
        <Button alwaysHoverStyle={true}>프로필 편집</Button>
        <FeedbackCard />
        <button className={classes.logout}>로그아웃</button>
      </div>
    </section>
  );
}

export default ProfilePage;
