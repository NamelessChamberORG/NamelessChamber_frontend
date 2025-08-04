import { Link } from "react-router";
import Text from "../../../components/text/Text";
import classes from "./LandingPage.module.css";
import { useEffect, useState } from "react";

function LandingPage() {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    setStep(1);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (step === 1) {
      timer = setTimeout(() => setStep(2), 2000);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000);
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className={classes.landing}>
      {step === 0 && (
        <Text onClick={handleClick} className={classes["fade-in"]}>
          작성 시작
        </Text>
      )}
      {step >= 1 && (
        <Link
          to="/diary/new"
          className={`${classes.link} ${classes["fade-in"]}`}
        >
          <Text>오늘 있었던 일 작성</Text>
        </Link>
      )}
      {step >= 2 && (
        <Text alwaysHoverStyle className={classes["fade-in"]}>
          아니면
        </Text>
      )}
      {step >= 3 && (
        <Link
          to="/diary/new"
          className={`${classes.link} ${classes["fade-in"]}`}
        >
          <Text>마음 속 큰 고민 작성</Text>
        </Link>
      )}
    </div>
  );
}

export default LandingPage;
