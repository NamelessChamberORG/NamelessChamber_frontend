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
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 2000);
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className={classes.landing}>
      {step === 0 && <Text onClick={handleClick}>작성 시작</Text>}
      {step > 0 && (
        <div className={classes.textGroup}>
          <div className={classes.left}>
            {step >= 2 && (
              <Link
                to="/diary/new"
                className={`${classes.link} ${
                  step >= 2 ? classes["fade-in"] : classes.hidden
                }`}
              >
                <Text>오늘 있었던 일 작성</Text>
              </Link>
            )}
          </div>

          <div className={classes.center}>
            {step >= 3 && (
              <Text
                alwaysHoverStyle
                className={step >= 3 ? classes["fade-in"] : classes.hidden}
              >
                아니면
              </Text>
            )}
          </div>

          <div className={classes.right}>
            {step >= 4 && (
              <Link
                to="/diary/new"
                className={`${classes.link} ${
                  step >= 4 ? classes["fade-in"] : classes.hidden
                }`}
              >
                <Text>마음 속 큰 고민 작성</Text>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
