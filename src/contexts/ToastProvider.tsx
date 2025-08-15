import { useState, type PropsWithChildren } from "react";
import { ToastContext, type ToastContextValue } from "./ToastContext";
import type { ToastItem, ToastType } from "../types/toast.type";

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function showToast(
    message: string,
    type: ToastType = "info",
    durationMs = 3000
  ) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, durationMs);
  }

  const value: ToastContextValue = { toasts, showToast };
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
