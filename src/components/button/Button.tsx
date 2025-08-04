import classes from "./Button.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  alwaysHoverStyle?: boolean; // ← 이게 true면 hover 스타일 항상 적용
};

const Button = ({
  children,
  alwaysHoverStyle,
  className = "",
  ...props
}: ButtonProps) => {
  const combinedClassName = [
    classes.button,
    alwaysHoverStyle && classes["hover-style"], // hover 효과를 항상 주는 경우
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
