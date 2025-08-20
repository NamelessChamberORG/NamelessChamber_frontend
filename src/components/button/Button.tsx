import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import classes from "./Button.module.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  alwaysHoverStyle?: boolean;
  revealOnMount?: boolean;
  revealDelay?: number;
  revealDurationMs?: number;
  revealEasing?: string;
};

const Button = ({
  children,
  alwaysHoverStyle,
  className = "",
  revealOnMount = false,
  revealDelay = 0,
  revealDurationMs = 800,
  revealEasing = "ease-in",
  ...props
}: ButtonProps) => {
  // revealOnMount=false면 초기에 바로 보이도록
  const [revealed, setRevealed] = useState(!revealOnMount);

  useEffect(() => {
    if (!revealOnMount) return;
    const t = setTimeout(() => setRevealed(true), revealDelay);
    return () => clearTimeout(t);
  }, [revealOnMount, revealDelay]);

  const combinedClassName = [
    classes.button,
    alwaysHoverStyle && classes["hover-style"],
    revealed ? classes.revealed : classes.hidden,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties = {
    "--reveal-delay": `${revealDelay}ms`,
    "--reveal-duration": `${revealDurationMs}ms`,
    "--reveal-easing": revealEasing,
  } as CSSProperties;

  return (
    <button {...props} className={combinedClassName} style={style}>
      {children}
    </button>
  );
};

export default Button;
