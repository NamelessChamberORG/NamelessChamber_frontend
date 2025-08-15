import { createContext, useContext } from "react";
import type { ToastItem, ToastType } from "../types/toast.type";

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
