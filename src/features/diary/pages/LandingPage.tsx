import { Link } from "react-router";
import { useEffect, useState } from "react";
import Text from "../../../components/text/Text";
import Button from "../../../components/button/Button";
import classes from "./LandingPage.module.css";
import { PATHS } from "../../../constants/path";
import { useEnsureSession } from "../../auth/hooks/useEnsureSession";
import Paragraph from "../../../components/paragraph/Paragraph";
import TypeCard from "../components/card/TypeCard";

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
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step]);

  return (
    <div className={classes.landing}>
      {step === 0 && (
        <div className={classes.content}>
          <div className={classes.title}>
            <Text variant="t1">어디에도 하지 못한 말을</Text>
            <Text variant="t1">이곳 무명소에 흘려보내세요.</Text>
          </div>
          <Button
            revealOnMount
            revealDelay={400}
            onClick={handleClick}
            disabled={ensuring}
          >
            익명의 기록을 시작합니다
          </Button>
        </div>
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
                  <TypeCard
                    title="짧은 기록"
                    firstLine="순간의 생각을"
                    secondLine="가볍게 남겨요."
                    revealOnMount
                    revealDelay={400}
                    revealDurationMs={800}
                    revealEasing="ease-in"
                  />
                </Link>
              ) : (
                <div className={classes.placeholder} aria-hidden="true" />
              )}
            </div>

            <div
              className={`${classes.slot} ${
                step >= 3 ? classes["fade-in"] : classes["hidden"]
              } ${classes.right}`}
            >
              {step >= 3 ? (
                <Link
                  to={PATHS.DIARY_NEW_TYPE("mind")}
                  className={classes.link}
                >
                  <TypeCard
                    title="깊은 고백"
                    firstLine="마음 속 깊은 곳의"
                    secondLine="이야기를 꺼내보아요."
                    revealOnMount
                    revealDelay={400}
                    revealDurationMs={800}
                    revealEasing="ease-in"
                  />
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
