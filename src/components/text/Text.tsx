import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import classes from "./Text.module.css";

type TextProps = ComponentPropsWithoutRef<"span"> & {
  children: React.ReactNode;
  alwaysHoverStyle?: boolean;
  revealOnMount?: boolean;
  revealDelay?: number;
  revealDurationMs?: number;
  revealEasing?: string;
};

const Text = ({
  children,
  alwaysHoverStyle,
  revealOnMount = false,
  revealDelay = 0,
  revealDurationMs = 800,
  revealEasing = "ease-in",
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
    alwaysHoverStyle && classes["hover-style"],
    revealed ? classes.revealed : classes.hidden,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties = {
    "--reveal-delay": `${revealDelay}ms`,
    "--reveal-duration": `${revealDurationMs}ms`,
    "--reveal-easing": revealEasing,
  } as CSSProperties;

  return (
    <span {...props} className={combinedClassName} style={style}>
      {children}
    </span>
  );
};

export default Text;
