import { Link } from "react-router";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import classes from "./Header.module.css";
import { PATHS } from "../../constants/path";

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to={PATHS.HOME} className={classes.logoLink}>
        <Logo />
      </Link>
      <Link to={PATHS.LOGIN}>
        <Button alwaysHoverStyle>로그인하기</Button>
      </Link>
    </header>
  );
};

export default Header;
