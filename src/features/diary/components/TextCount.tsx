type TextCountProps = {
  count: number;
};

const TextCount = ({ count }: TextCountProps) => {
  return <div>{count}</div>;
};

export default TextCount;
