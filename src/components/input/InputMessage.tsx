import type { ReactNode } from "react";
import classes from "./InputMessage.module.css";

type Props = {
  type?: "error" | "success";
  children?: ReactNode;
  className?: string;
};

export default function InputMessage({
  children,
  className,
  type = "error",
}: Props) {
  const hasContent = Boolean(children);
  return (
    <p
      className={[
        classes.message,
        classes[type],
        !hasContent ? classes.hidden : "",
        className || "",
      ].join(" ")}
      aria-hidden={!hasContent || undefined}
    >
      {hasContent ? children : " "}
    </p>
  );
}
