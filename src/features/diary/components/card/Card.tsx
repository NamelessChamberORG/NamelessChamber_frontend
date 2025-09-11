import type { ComponentPropsWithoutRef } from "react";
import classes from "./Card.module.css";
import Title from "../title/Title";
import Count from "../count/Count";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  title: string;
  tags?: string[];
  isAuthor?: boolean;
  textCount: number;
};

const Card = ({
  title,
  textCount,
  isAuthor,
  className,
  ...props
}: CardProps) => {
  const authorType = isAuthor ? "self" : "other";

  return (
    <article
      className={`${classes.card} ${classes[authorType]} ${className ?? ""}`}
      {...props}
    >
      <Title authorType={authorType}>{title}</Title>
      <div>
        <Count className={classes.count}>{textCount}</Count>
      </div>
    </article>
  );
};

export default Card;
