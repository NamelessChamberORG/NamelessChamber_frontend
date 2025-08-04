import Button from "../button/Button";
import Logo from "../logo/Logo";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Logo />
      <Button alwaysHoverStyle>로그인하기</Button>
    </header>
  );
};

export default Header;
