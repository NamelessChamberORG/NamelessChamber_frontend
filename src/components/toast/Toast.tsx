import type { ToastType } from "../../types/toast.type";
import classes from "./Toast.module.css";
import checkLogo from "../../assets/icons/icon_check.svg";
import infoLogo from "../../assets/icons/icon_info.svg";
import cancelLogo from "../../assets/icons/icon_cancel.svg";

type ToastProps = {
  message: string;
  type: ToastType;
};

const logo = {
  check: checkLogo,
  info: infoLogo,
  cancel: cancelLogo,
};

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={`${classes.toast} ${classes[type]}`}
      style={
        {
          "--glow-left": "-25%",
          "--glow-size": "212px",
          "--glow-opacity": 0.08,
        } as React.CSSProperties
      }
    >
      <img src={logo[type]} alt="" />
      <span className={classes.msg}>{message}</span>
    </div>
  );
};

export default Toast;
