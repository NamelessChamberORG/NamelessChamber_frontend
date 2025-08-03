import classes from "./Button.module.css";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
