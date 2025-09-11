import { Link } from "react-router";
import { useEffect, useState } from "react";
import Text from "../../../components/text/Text";
import Button from "../../../components/button/Button";
import classes from "./LandingPage.module.css";
import { PATHS } from "../../../constants/path";
import { useEnsureSession } from "../../auth/hooks/useEnsureSession";

function LandingPage() {
  const [step, setStep] = useState(0);
  const { ensure, ensuring } = useEnsureSession(false);

  const handleClick = async () => {
    setStep(1);
    try {
      await ensure();
      setStep(2);
    } catch (e) {
      console.error("세션 확보 실패:", e);
      setStep(0);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (step === 2) {
      timer = setTimeout(() => setStep(3), 1000);
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step]);

  return (
    <div className={classes.landing}>
      {step === 0 && (
        <Button
          revealOnMount
          revealDelay={400}
          onClick={handleClick}
          disabled={ensuring}
        >
          익명의 기록을 시작합니다
        </Button>
      )}

      {step > 0 && (
        <div className={classes.textGroup}>
          <div className={classes.left}>
            {step >= 2 && (
              <Link to={PATHS.DIARY_NEW_TYPE("daily")} className={classes.link}>
                <Button revealOnMount revealDelay={400} disabled={ensuring}>
                  오늘 있었던 일 작성
                </Button>
              </Link>
            )}
          </div>

          <div className={classes.center}>
            {step >= 3 && (
              <Text
                revealOnMount
                revealDelay={200}
                alwaysHoverStyle
                className={classes.centerText}
              >
                아니면
              </Text>
            )}
          </div>

          <div className={classes.right}>
            {step >= 4 && (
              <Link to={PATHS.DIARY_NEW_TYPE("mind")} className={classes.link}>
                <Button revealOnMount revealDelay={400} disabled={ensuring}>
                  마음 속 큰 고민 작성
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default LandingPage;
