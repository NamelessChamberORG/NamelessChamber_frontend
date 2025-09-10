type Props = {
  size?: number;
  color?: string;
};

export default function RightArrow({ size = 24, color = "#D9D9D9" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 76"
      width={size}
      height={size}
      fill={color}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(-0.44, 0)">
        <path d="M1.5 75.804a1.5 1.5 0 0 1-1.06-2.56L34 39.684a2.53 2.53 0 0 0 0-3.564L.44 2.56A1.5 1.5 0 0 1 2.56.44l33.56 33.56a5.53 5.53 0 0 1 0 7.807L2.56 75.244A1.5 1.5 0 0 1 1.5 75.804Z" />
      </g>
    </svg>
  );
}
