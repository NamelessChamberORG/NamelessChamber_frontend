import type { ComponentPropsWithoutRef } from "react";
import classes from "./AuthButton.module.css";

type AuthButtonProps = ComponentPropsWithoutRef<"button">;

const AuthButton = ({ children, ...props }: AuthButtonProps) => {
  return (
    <button className={classes.authButton} {...props}>
      {children}
    </button>
  );
};

export default AuthButton;
