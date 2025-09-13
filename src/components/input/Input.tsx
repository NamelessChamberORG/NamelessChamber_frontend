import { forwardRef, type ComponentPropsWithoutRef } from "react";
import classes from "./Input.module.css";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`${classes.input} ${className ?? ""}`}
      {...props}
    />
  );
});

export default Input;
