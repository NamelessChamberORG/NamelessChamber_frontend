import Button from "../../../components/button/Button";
import CoinInfo from "../components/CoinInfo";
import FeedbackCard from "../components/FeedbackCard";
import UserInfo from "../components/UserInfo";
import { useUserMe } from "../hooks/useUser";
import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const { data: me, isLoading: isMeLoading } = useUserMe();

  if (isMeLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className={classes.profile}>
      <div className={classes.profileSection}>
        <UserInfo nickname={me?.nickname ?? ""} />
        <CoinInfo coin={me?.coin ?? 0} />
        <Button alwaysHoverStyle={true}>프로필 편집</Button>
        <FeedbackCard />
        <button className={classes.logout}>로그아웃</button>
      </div>
    </section>
  );
}

export default ProfilePage;
