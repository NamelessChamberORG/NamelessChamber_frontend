import type { ComponentPropsWithoutRef } from "react";
import classes from "./Card.module.css";

type CardProps = ComponentPropsWithoutRef<"li"> & {
  children: string;
};

const Card = ({ children, ...props }: CardProps) => {
  const texts = children.split("\n").map((text) => text.trim());
  console.log(texts);

  return (
    <li className={classes.card} {...props}>
      {texts.map((text) => (
        <p>{text}</p>
      ))}
    </li>
  );
};

export default Card;
