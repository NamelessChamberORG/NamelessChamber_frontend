import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "../components/header/Header";
import { useToast } from "../hooks/useToast";
import { useEffect, useRef } from "react";
import { PATHS } from "../constants/path";

function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const firedRef = useRef(false);

  useEffect(() => {
    const onAuthExpired = () => {
      if (firedRef.current) return;
      firedRef.current = true;

      showToast("토큰이 유효하지 않습니다. 다시 로그인해주세요.", "cancel");

      const returnTo = location.pathname + location.search;
      navigate(
        `${PATHS.LOGIN}?returnTo=${encodeURIComponent(
          returnTo
        )}&reason=expired`,
        { replace: true }
      );

      setTimeout(() => {
        firedRef.current = false;
      }, 2000);
    };

    window.addEventListener("auth:expired", onAuthExpired as EventListener);
    return () =>
      window.removeEventListener(
        "auth:expired",
        onAuthExpired as EventListener
      );
  }, [location.pathname, location.search, navigate, showToast]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
