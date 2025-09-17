import { useNavigate } from "react-router";
import Button from "../../../components/button/Button";
import CoinInfo from "../components/CoinInfo";
import FeedbackCard from "../components/FeedbackCard";
import UserInfo from "../components/UserInfo";
import { useUserMe } from "../hooks/useUser";
import classes from "./ProfilePage.module.css";
import { PATHS } from "../../../constants/path";
import DiaryTabs from "../components/DiaryTabs";
import { useReadDiaries } from "../hooks/useReadDiaries";
import { useMemo, useState } from "react";
import CardListContainer from "../../diary/components/card/CardListContainer";
import { useWrittenDiaries } from "../hooks/useWrittenDiaries";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { useLogout } from "../../auth/hooks/useAuth";
import LoadingDots from "../../../components/loading/LoadingDots";

function ProfilePage() {
  const [currentTab, setCurrentTab] = useState<"written" | "read">("written");
  const { data: me, isLoading: isMeLoading } = useUserMe();
  const navigate = useNavigate();

  const { data: readData, isLoading: isReadLoading } = useReadDiaries(
    currentTab === "read"
  );
  const { data: writtenData, isLoading: isWrittenLoading } =
    useWrittenDiaries();

  const diaries = useMemo(() => {
    if (currentTab === "read") return readData?.posts ?? [];
    return writtenData ?? [];
  }, [currentTab, readData, writtenData]);

  const isListLoading =
    currentTab === "read" ? isReadLoading : isWrittenLoading;

  const isEmpty = !isListLoading && (diaries?.length ?? 0) === 0;

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  function handleLogout() {
    logout(undefined, {
      onSettled: () => {
        navigate(PATHS.HOME);
      },
    });
  }

  return (
    <section className={classes.profile}>
      <div className={classes.profileSection}>
        {isMeLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <UserInfo nickname={me?.nickname ?? ""} />
            <CoinInfo coin={me?.coin ?? 0} />
            <Button alwaysHoverStyle={true}>프로필 편집</Button>
            <FeedbackCard />
            <button
              className={classes.logout}
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
            >
              {isLoggingOut ? <LoadingDots /> : "로그아웃"}
            </button>
          </>
        )}
      </div>

      <div className={classes.listSection}>
        <DiaryTabs onChange={(id) => setCurrentTab(id as "written" | "read")} />
        <CardListContainer
          diaries={diaries}
          isLoading={isListLoading}
          isEmpty={isEmpty}
          coin={me?.coin ?? 0}
          type="daily"
          emptyMessage={
            currentTab === "read"
              ? "아직 열람한 글이 없어요."
              : "아직 작성한 글이 없어요."
          }
          interactionMode="direct"
        />
      </div>
    </section>
  );
}

export default ProfilePage;
