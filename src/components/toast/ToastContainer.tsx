import type { ToastType } from "../../types/toast.type";
import Toast from "./Toast";
// import styles from "./ToastContainer.module.css";

type ToastItem = { id: number; message: string; type: ToastType };

type ToastContainerProps = {
  toasts: ToastItem[];
};

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};
