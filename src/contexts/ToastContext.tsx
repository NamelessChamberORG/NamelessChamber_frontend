import { createContext, useContext } from "react";

export type ToastType = "check" | "info" | "cancel";

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

export type ToastContextValue = {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType, durationMs?: number) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("ToastProvider'로 앱을 감싸주세요.");
  }
  return ctx;
}
