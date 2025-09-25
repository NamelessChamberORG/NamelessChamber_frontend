import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import classes from "./Text.module.css";

type TextVariant = "t1" | "t2" | "p1" | "c1";
type TextColor = "default" | "gray-2" | "gray-3" | "gray-4";

type TextProps = ComponentPropsWithoutRef<"span"> & {
  children: React.ReactNode;
  alwaysHoverStyle?: boolean;
  revealOnMount?: boolean;
  revealDelay?: number;
  revealDurationMs?: number;
  revealEasing?: string;
  variant?: TextVariant;
  color?: TextColor;
};

const Text = ({
  children,
  alwaysHoverStyle,
  revealOnMount = false,
  revealDelay = 0,
  revealDurationMs = 800,
  revealEasing = "ease-in",
  variant = "p1",
  color = "default",
  ...props
}: TextProps) => {
  const [revealed, setRevealed] = useState(!revealOnMount);

  useEffect(() => {
    if (!revealOnMount) return;
    const t = setTimeout(() => setRevealed(true), revealDelay);
    return () => clearTimeout(t);
  }, [revealOnMount, revealDelay]);

  const combinedClassName = [
    classes.text,
    classes[variant],
    classes[color],
    alwaysHoverStyle && classes["hover-style"],
    revealed ? classes.revealed : classes.hidden,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties & Record<string, string | number> = {
    "--reveal-delay": `${revealDelay}ms`,
    "--reveal-duration": `${revealDurationMs}ms`,
    "--reveal-easing": revealEasing,
  };

  return (
    <span {...props} className={combinedClassName} style={style}>
      {children}
    </span>
  );
};

export default Text;
