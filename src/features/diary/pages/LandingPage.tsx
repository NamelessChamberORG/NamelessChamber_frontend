import { Link } from "react-router";
import { useEffect, useState } from "react";
import Text from "../../../components/text/Text";
import Button from "../../../components/button/Button";
import classes from "./LandingPage.module.css";
import { PATHS } from "../../../constants/path";
import { useEnsureSession } from "../../auth/hooks/useEnsureSession";
import Paragraph from "../../../components/paragraph/Paragraph";

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
        <div className={classes.content}>
          <div className={classes.guide}>
            <div className={classes.guideText}>
              <Text variant="t2">기록의 깊이를 선택해주세요.</Text>
              <Paragraph>당신의 말은 짧아도, 길어도 좋습니다.</Paragraph>
            </div>
          </div>

          <div className={classes.textGroup}>
            <div
              className={`${classes.slot} ${
                step >= 2 ? classes["fade-in"] : classes["hidden"]
              } ${classes.left}`}
            >
              {step >= 2 ? (
                <Link
                  to={PATHS.DIARY_NEW_TYPE("daily")}
                  className={classes.link}
                >
                  <Button revealOnMount revealDelay={200} disabled={ensuring}>
                    오늘 인상 깊었던 일
                  </Button>
                </Link>
              ) : (
                <div className={classes.placeholder} aria-hidden="true" />
              )}
            </div>

            <div
              className={`${classes.slot} ${
                step >= 3 ? classes["fade-in"] : classes["hidden"]
              } ${classes.center}`}
            >
              {step >= 3 ? (
                <Text
                  revealOnMount
                  revealDelay={200}
                  alwaysHoverStyle
                  className={classes.centerText}
                  variant="c1"
                  color="gray-3"
                >
                  아니면
                </Text>
              ) : (
                <div className={classes.placeholder} aria-hidden="true" />
              )}
            </div>

            <div
              className={`${classes.slot} ${
                step >= 4 ? classes["fade-in"] : classes["hidden"]
              } ${classes.right}`}
            >
              {step >= 4 ? (
                <Link
                  to={PATHS.DIARY_NEW_TYPE("mind")}
                  className={classes.link}
                >
                  <Button revealOnMount revealDelay={200} disabled={ensuring}>
                    마음 속 큰 고민
                  </Button>
                </Link>
              ) : (
                <div className={classes.placeholder} aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LandingPage;
