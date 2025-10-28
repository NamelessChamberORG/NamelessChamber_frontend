import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./DiaryPostSubmitPage.module.css";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";
import { PATHS } from "../../../constants/path";
import type { UiType } from "../types/typeMap";
import { SUBMIT_LOADING_MESSAGE } from "../../../constants/messages";

type State = {
  type?: UiType;
  stayMs?: number;
  message?: string;
  streakState?: {
    calendar: { weekStart: string; days: boolean[]; counts: number[] };
    coin: number;
    totalPosts: number;
    postId: string;
  };
};

function DiaryPostSubmitPage() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as State;

  const { type: urlTypeParam } = useParams<{ type: UiType }>();
  const routeType = urlTypeParam ?? state.type ?? "daily";

  const stayMs = state.stayMs ?? 1600;
  const message = state.message ?? SUBMIT_LOADING_MESSAGE;

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      nav(PATHS.DIARY_STREAK_TYPE(routeType), {
        replace: true,
        state: state.streakState,
      });
    }, stayMs);
    return () => clearTimeout(t);
  }, [nav, routeType, stayMs, state.streakState]);

  return (
    <main
      className={classes.wrap}
      ref={wrapRef}
      aria-live="polite"
      aria-busy="true"
    >
      <div className={classes.fullscreenBtn}>
        <FullscreenToggleButton alwaysHoverStyle targetRef={wrapRef} />
      </div>
      <p className={classes.message}>{message}</p>
    </main>
  );
}

export default DiaryPostSubmitPage;
