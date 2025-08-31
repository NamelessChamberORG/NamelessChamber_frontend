import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./DiaryPostSubmitPage.module.css";
import FullscreenToggleButton from "../../../components/fullsrceen/FullscreenToggleButton";
import { PATHS } from "../../../constants/path";

type State = {
  next?: string;
  stayMs?: number;
  message?: string;
};

function DiaryPostSubmitPage() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as State;

  const { type: diaryType } = useParams<{ type: string }>();
  const typeLower = diaryType === "SHORT" ? "short" : "long";

  const next = state.next ?? PATHS.DIARY_LIST_TYPE(typeLower);
  const stayMs = state.stayMs ?? 1600;
  const message = state.message ?? "작성해주신 소중한 마음은 소중히 보관할게요";

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => nav(next, { replace: true }), stayMs);
    return () => clearTimeout(t);
  }, [next, stayMs, nav]);

  return (
    <main
      className={classes.wrap}
      ref={wrapRef}
      aria-live="polite"
      aria-busy="true"
    >
      <div className={classes.fullscreenBtn}>
        <FullscreenToggleButton alwaysHoverStyle={true} targetRef={wrapRef} />
      </div>

      <p className={classes.message}>{message}</p>
    </main>
  );
}

export default DiaryPostSubmitPage;
