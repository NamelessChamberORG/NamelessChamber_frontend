import type { ComponentPropsWithoutRef } from "react";
import classes from "./Input.module.css";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = ({ ...props }: InputProps) => {
  return <input className={classes.input} {...props} />;
};

export default Input;
