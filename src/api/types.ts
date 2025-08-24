export type ApiFail = {
  success: false;
  errorMsg?: string;
  errorCode?: number;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFail;

export class ApiError extends Error {
  code?: number;
  status?: number;
  constructor(message: string, code?: number, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}
