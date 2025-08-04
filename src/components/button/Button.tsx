import classes from "./Button.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  alwaysHoverStyle?: boolean;
};

const Button = ({
  children,
  alwaysHoverStyle,
  className = "",
  ...props
}: ButtonProps) => {
  const combinedClassName = [
    classes.button,
    alwaysHoverStyle && classes["hover-style"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
