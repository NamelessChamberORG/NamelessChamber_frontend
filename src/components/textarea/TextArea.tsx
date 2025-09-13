import type { ComponentPropsWithoutRef } from "react";
import classes from "./TextArea.module.css";

type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

const TextArea = ({ ...props }: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={classes.textarea}
      spellCheck={false}
    ></textarea>
  );
};

export default TextArea;
