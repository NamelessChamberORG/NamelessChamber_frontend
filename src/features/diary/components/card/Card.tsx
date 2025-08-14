import type { ComponentPropsWithoutRef } from "react";
import classes from "./Card.module.css";
import TagList from "../tag/TagList";
import Title from "../title/Title";
import Count from "../count/Count";

type CardProps = ComponentPropsWithoutRef<"li"> & {
  title: string;
  tags: string[];
  authorType: "self" | "other";
};

const Card = ({ title, tags, authorType, ...props }: CardProps) => {
  return (
    <li className={`${classes.card} ${classes[authorType]}`} {...props}>
      <Title authorType={authorType}>{title}</Title>
      <div>
        <TagList tags={tags} />
        <Count>{234}</Count>
      </div>
    </li>
  );
};

export default Card;
