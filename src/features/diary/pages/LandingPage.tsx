import { Link } from "react-router";
import Text from "../../../components/text/Text";
import classes from "./LandingPage.module.css";
import { useState } from "react";

function LandingPage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={classes.landing}>
      {!isClicked && <Text onClick={handleClick}>작성 시작</Text>}
      {isClicked && (
        <>
          <Link to="/diary/new" className={classes.link}>
            <Text>오늘 있었던 일 작성</Text>
          </Link>
          <Text alwaysHoverStyle>아니면</Text>
          <Link to="/diary/new" className={classes.link}>
            <Text>마음 속 큰 고민 작성</Text>
          </Link>
        </>
      )}
    </div>
  );
}

export default LandingPage;
