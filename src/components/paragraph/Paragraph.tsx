import type { ComponentPropsWithoutRef } from "react";
import classes from "./Paragraph.module.css";

type ParagraphProps = ComponentPropsWithoutRef<"p">;

const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return (
    <p {...props} className={classes.paragraph}>
      {children}
    </p>
  );
};

export default Paragraph;
