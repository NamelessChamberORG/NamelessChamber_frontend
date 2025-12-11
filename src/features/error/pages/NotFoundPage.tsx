import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import classes from "./NotFoundPage.module.css";
import Button from "../../../components/button/Button";

function NotFoundPage() {
  return (
    <section className={classes.container}>
      <p className={classes.message}>
        존재하지 않는 페이지입니다.
        <br />
        주소를 다시 확인하시거나 홈으로 돌아가주세요.
      </p>
      <Link to={PATHS.HOME}>
        <Button>홈으로 돌아가기</Button>
      </Link>
    </section>
  );
}

export default NotFoundPage;
