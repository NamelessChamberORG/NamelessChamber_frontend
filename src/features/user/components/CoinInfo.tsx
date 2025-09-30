import { type ComponentPropsWithoutRef } from "react";
import classes from "./CoinInfo.module.css";

type CoinInfoProps = {
  coin: number;
} & ComponentPropsWithoutRef<"div">;

const CoinInfo = ({ coin, ...rest }: CoinInfoProps) => {
  return (
    <div className={classes.coin} {...rest}>
      <p>열람권</p>
      <p>{coin}개</p>
    </div>
  );
};

export default CoinInfo;
