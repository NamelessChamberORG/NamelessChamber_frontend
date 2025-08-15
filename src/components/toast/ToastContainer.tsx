import { useToast } from "../../contexts/ToastContext";
import Toast from "./Toast";
import classes from "./ToastContainer.module.css";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className={classes.container}>
      {toasts.map((t) => (
        <div key={t.id} className={classes["toast-enter"]}>
          <Toast message={t.message} type={t.type} />
        </div>
      ))}
    </div>
  );
}
