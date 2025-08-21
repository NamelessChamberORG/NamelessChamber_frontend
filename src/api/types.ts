export type ApiResponse<T> = {
  success: boolean;
  errorMsg: string;
  errorCode: number;
  data: T;
};
