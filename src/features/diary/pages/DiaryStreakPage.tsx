import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { UiType } from "../types/typeMap";
import { PATHS } from "../../../constants/path";
import classes from "./DiaryStreakPage.module.css";
import { isAuthenticatedUser } from "../../auth/api/tokenStore";
import Button from "../../../components/button/Button";
import Text from "../../../components/text/Text";

type StreakState = {
  calendar: { weekStart: string; days: boolean[]; counts: number[] };
  coin: number;
  totalPosts: number;
  postId: string;
  totalStreakDays?: number;
};

const KOR_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;
const isWeekArr = (a?: unknown[]) => Array.isArray(a) && a.length === 7;

function DiaryStreakPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: UiType }>();
  const { state } = useLocation() as { state?: StreakState };
  const routeType: UiType = type ?? "daily";
  const isLoggedIn = isAuthenticatedUser();

  useEffect(() => {
    if (!state) {
      navigate(PATHS.DIARY_LIST_TYPE(routeType), { replace: true });
    }
  }, [state, navigate, routeType]);

  if (!state) {
    return (
      <main className={classes.wrap}>
        <p className={classes.loading}>기록을 불러오고 있어요…</p>
      </main>
    );
  }

  const days = isWeekArr(state.calendar.days)
    ? state.calendar.days
    : [false, false, false, false, false, false, false];

  const weekStreak = days.filter(Boolean).length;
  const streakDays = state.totalStreakDays ?? weekStreak;

  const goList = () =>
    navigate(PATHS.DIARY_LIST_TYPE(routeType), { replace: true });
  const goSignup = () => navigate(PATHS.SIGN_UP);

  return (
    <main className={classes.wrap} aria-live="polite">
      <section className={classes.card}>
        {/* <div className={classes.avatar} aria-hidden /> */}

        <div className={classes.streakInfo} aria-live="assertive">
          <Text variant="t1" className={classes.streakCount} color="yellow">
            {streakDays}
            <span>일</span>
          </Text>
          <Text variant="p1" color="yellow">
            연속 작성
          </Text>
        </div>

        <div className={classes.weekContainer}>
          <div className={classes.weekLabels} aria-hidden="true">
            {KOR_DAYS.map((d) => (
              <span key={d} className={classes.weekLabel}>
                {d}
              </span>
            ))}
          </div>

          <div
            className={classes.weekDots}
            role="list"
            aria-label="이번 주 작성 현황"
          >
            {days.map((done, i) => (
              <div
                key={i}
                role="listitem"
                className={`${classes.dot} ${done ? classes.active : ""}`}
                title={`${KOR_DAYS[i]}요일 ${done ? "작성함" : "미작성"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className={classes.messageContainer}>
          {isLoggedIn ? (
            <div className={classes.message}>
              <Text variant="t2" color="gray-2">
                오늘도 스스로와
              </Text>
              <Text variant="t2" color="gray-2">
                가까워졌어요
              </Text>
            </div>
          ) : (
            <div className={classes.message}>
              <Text variant="t2" color="gray-2">
                가입으로 횟수를
              </Text>
              <Text variant="t2" color="gray-2">
                기록해보세요
              </Text>
            </div>
          )}
        </div>

        <div className={classes.actions}>
          <Button
            variant="sub"
            state="active"
            onClick={isLoggedIn ? goList : goSignup}
          >
            {isLoggedIn ? "다음" : "회원가입"}
          </Button>

          {!isLoggedIn && <Button onClick={goList}>다음에</Button>}
        </div>
      </section>
    </main>
  );
}

export default DiaryStreakPage;
