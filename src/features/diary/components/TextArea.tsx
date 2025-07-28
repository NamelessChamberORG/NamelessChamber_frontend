import type { ComponentPropsWithoutRef } from "react";

type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

const TextArea = ({ ...props }: TextAreaProps) => {
  return <textarea {...props} name="diary"></textarea>;
};

export default TextArea;
