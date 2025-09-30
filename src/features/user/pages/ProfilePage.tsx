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
import { useEffect, useMemo, useState } from "react";
import CardListContainer from "../../diary/components/card/CardListContainer";
import { useWrittenDiaries } from "../hooks/useWrittenDiaries";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { useLogout } from "../../auth/hooks/useAuth";
import LoadingDots from "../../../components/loading/LoadingDots";
import { useToast } from "../../../contexts/ToastContext";
import { ApiError } from "../../../api/types";

function ProfilePage() {
  const [currentTab, setCurrentTab] = useState<"written" | "read">("written");
  const { data: me, isLoading: isMeLoading, error, isError } = useUserMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isError) return;
    if (error instanceof ApiError && error.code === 1018) {
      navigate(PATHS.NICKNAME, {
        replace: true,
        state: { from: PATHS.PROFILE },
      });
    }
  }, [isError, error, navigate]);

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

  const { showToast } = useToast();

  function handleProfileEditClick() {
    showToast("준비 중인 기능입니다.", "info");
  }

  function handleCoinClick() {
    if (!me?.coin) {
      showToast("열람권이 없어요! 글을 작성하고 열람권을 받아보세요.", "info");
    } else {
      navigate(PATHS.DIARY_ALL);
    }
  }

  return (
    <section className={classes.profile}>
      <div className={classes.profileSection}>
        {isMeLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <UserInfo nickname={me?.nickname ?? ""} />
            <CoinInfo coin={me?.coin ?? 0} onClick={handleCoinClick} />
            <Button alwaysHoverStyle={true} onClick={handleProfileEditClick}>
              프로필 편집
            </Button>
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
