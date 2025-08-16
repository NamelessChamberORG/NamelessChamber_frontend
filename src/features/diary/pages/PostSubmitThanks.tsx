import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./PostSubmitThanks.module.css";

type State = {
  next?: string;
  stayMs?: number;
  message?: string;
};

function PostSubmitThanks() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as State;

  const next = state.next ?? "/diary";
  const stayMs = state.stayMs ?? 1600;
  const message = state.message ?? "작성해주신 소중한 마음은 소중히 보관할게요";

  useEffect(() => {
    const t = setTimeout(() => nav(next, { replace: true }), stayMs);
    return () => clearTimeout(t);
  }, [next, stayMs, nav]);

  return (
    <main className={classes.wrap} aria-live="polite" aria-busy="true">
      <p className={classes.message}>{message}</p>
    </main>
  );
}

export default PostSubmitThanks;
