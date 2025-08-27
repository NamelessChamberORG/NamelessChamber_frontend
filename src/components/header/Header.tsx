import { Link } from "react-router";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import classes from "./Header.module.css";
import { useToast } from "../../contexts/ToastContext";
import { PATHS } from "../../constants/path";

const Header = () => {
  const { showToast } = useToast();
  return (
    <header className={classes.header}>
      <Link to={PATHS.HOME} className={classes.logoLink}>
        <Logo />
      </Link>
      <Button
        alwaysHoverStyle
        onClick={() => showToast("아직 준비되지 않은 기능입니다", "info")}
      >
        로그인하기
      </Button>
    </header>
  );
};

export default Header;
