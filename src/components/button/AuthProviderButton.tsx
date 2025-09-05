import type { ComponentPropsWithoutRef } from "react";
import classes from "./AuthProviderButton.module.css";

type AuthProviderButtonProps = ComponentPropsWithoutRef<"button"> & {
  provider: "kakao" | "naver" | "email";
};

const AuthProviderButton = ({
  children,
  ...props
}: AuthProviderButtonProps) => {
  return (
    <button
      className={`${classes.authButton} ${classes[props.provider]}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default AuthProviderButton;
