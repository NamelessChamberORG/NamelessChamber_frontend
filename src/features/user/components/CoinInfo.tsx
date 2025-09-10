import classes from "./CoinInfo.module.css";

type CoinInfoProps = {
  coin: number;
};

const CoinInfo = ({ coin }: CoinInfoProps) => {
  return (
    <div className={classes.coin}>
      <p>열람권</p>
      <p>{coin}개</p>
    </div>
  );
};

export default CoinInfo;
