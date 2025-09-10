import classes from "./UserInfo.module.css";

type UserInfoProps = {
  nickname: string;
};

const ProfileSection = ({ nickname }: UserInfoProps) => {
  return (
    <div className={classes.profileSection}>
      <div>
        <p>{nickname} 님, 안녕하세요!</p>
      </div>
    </div>
  );
};

export default ProfileSection;
