import RightArrow from "../../../assets/icons/RightArrow";
import Button from "../../../components/button/Button";
import classes from "./FeedbackCard.module.css";

const FeedbackCard = () => {
  return (
    <div className={classes.feedbackCard}>
      <div>
        뭐든지 피드백 주세요.
        <br />더 좋은 서비스로 보답할게요!
      </div>
      <Button>
        <RightArrow />
      </Button>
    </div>
  );
};

export default FeedbackCard;
