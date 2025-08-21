import type { ComponentPropsWithoutRef } from "react";
import classes from "./Card.module.css";
// import TagList from "../tag/TagList";
import Title from "../title/Title";
import Count from "../count/Count";

type CardProps = ComponentPropsWithoutRef<"li"> & {
  title: string;
  tags?: string[];
  isAuthor?: boolean;
  textCount: number;
};

const Card = ({ title, textCount, isAuthor, ...props }: CardProps) => {
  const authorType = isAuthor ? "self" : "other";

  return (
    <li className={`${classes.card} ${classes[authorType]}`} {...props}>
      <Title authorType={authorType}>{title}</Title>
      <div>
        <Count className={classes.count}>{textCount}</Count>
      </div>
    </li>
  );
};

export default Card;
