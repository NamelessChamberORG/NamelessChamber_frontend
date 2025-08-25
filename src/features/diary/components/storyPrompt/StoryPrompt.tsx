import { Link } from "react-router";
import Paragraph from "../../../../components/paragraph/Paragraph";
import Button from "../../../../components/button/Button";
import classes from "./StoryPrompt.module.css";

type StoryPromptProps = {
  lines: [string, string]; // 두 줄 문구
  to: string; // 버튼 링크
  buttonLabel?: string; // 버튼 라벨 (기본값 제공)
};

export default function StoryPrompt({
  lines,
  to,
  buttonLabel = "한 번 더 흘려보내기",
}: StoryPromptProps) {
  return (
    <div className={classes.closing}>
      <div>
        <Paragraph>{lines[0]}</Paragraph>
        <Paragraph>{lines[1]}</Paragraph>
      </div>
      <Link to={to} className={classes.link}>
        <Button>{buttonLabel}</Button>
      </Link>
    </div>
  );
}
