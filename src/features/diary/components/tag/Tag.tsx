import type { ComponentPropsWithoutRef } from "react";
import classes from "./Tag.module.css";

type TagProps = ComponentPropsWithoutRef<"div">;

const Tag = ({ children }: TagProps) => {
  return <div className={classes.tag}>{children}</div>;
};

export default Tag;
