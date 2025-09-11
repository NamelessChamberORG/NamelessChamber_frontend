import { Link, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import classes from "./Header.module.css";
import { PATHS } from "../../constants/path";
import { getEmail } from "../../features/auth/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(getEmail());

  useEffect(() => {
    const update = () => setEmail(getEmail());
    window.addEventListener("auth:update", update);
    return () => window.removeEventListener("auth:update", update);
  }, []);

  function handleProfile() {
    navigate(PATHS.PROFILE);
  }

  const hiddenPaths = [
    PATHS.LOGIN,
    PATHS.SIGN_UP,
    PATHS.NICKNAME,
    PATHS.PROFILE,
  ] as const;

  const shouldHideButton = hiddenPaths.some((p) => p === location.pathname);

  return (
    <header className={classes.header}>
      <Link to={PATHS.HOME} className={classes.logoLink}>
        <Logo />
      </Link>

      {!shouldHideButton &&
        (email && email !== "anonymous" ? (
          <div className={classes.userArea}>
            <Button alwaysHoverStyle onClick={handleProfile}>
              마이페이지
            </Button>
          </div>
        ) : (
          <Link to={PATHS.LOGIN}>
            <Button alwaysHoverStyle>로그인하기</Button>
          </Link>
        ))}
    </header>
  );
};

export default Header;
