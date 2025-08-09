import type { ComponentPropsWithoutRef } from "react";
import classes from "./Text.module.css";

type TextProps = ComponentPropsWithoutRef<"span"> & {
  children: React.ReactNode;
  alwaysHoverStyle?: boolean;
};

const Text = ({ children, alwaysHoverStyle, ...props }: TextProps) => {
  const combinedClassName = [
    classes.text,
    alwaysHoverStyle && classes["hover-style"],
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span {...props} className={combinedClassName}>
      {children}
    </span>
  );
};

export default Text;
