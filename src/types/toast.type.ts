export type ToastType = "check" | "info" | "cancel";

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};
