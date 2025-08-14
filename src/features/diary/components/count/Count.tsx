import type { ComponentPropsWithRef } from "react";
import classes from "./Count.module.css";

type CountProps = ComponentPropsWithRef<"p">;

const Count = ({ children, ...props }: CountProps) => {
  return (
    <p className={classes.count} {...props}>
      {children}자
    </p>
  );
};

export default Count;
