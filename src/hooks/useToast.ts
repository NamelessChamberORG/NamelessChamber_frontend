import { useState, useCallback } from "react";
import type { ToastType } from "../types/toast.type";

export const useToast = () => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: ToastType }[]
  >([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000); // 3초 후 자동 삭제
  }, []);

  return { toasts, showToast };
};
