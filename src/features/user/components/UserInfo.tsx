import classes from "./UserInfo.module.css";

type UserInfoProps = {
  nickname: string;
};

const UserInfo = ({ nickname }: UserInfoProps) => {
  return (
    <div className={classes.userInfo}>
      <div>
        <p>{nickname} 님, 안녕하세요!</p>
      </div>
    </div>
  );
};

export default UserInfo;
