import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import classes from "./Header.module.css";
import { PATHS } from "../../constants/path";
import { getNickname, clearAuth } from "../../features/auth/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(getNickname());

  useEffect(() => {
    const update = () => setNickname(getNickname());
    window.addEventListener("auth:update", update);
    return () => window.removeEventListener("auth:update", update);
  }, []);

  function handleLogout() {
    clearAuth();
    navigate(PATHS.HOME);
  }

  return (
    <header className={classes.header}>
      <Link to={PATHS.HOME} className={classes.logoLink}>
        <Logo />
      </Link>

      {nickname ? (
        <div className={classes.userArea}>
          <span className={classes.nickname}>{nickname}님</span>
          <Button alwaysHoverStyle onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      ) : (
        <Link to={PATHS.LOGIN}>
          <Button alwaysHoverStyle>로그인하기</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
