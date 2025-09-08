export type AppErrorCode =
  | "INVALID_ACCESS"
  | "NO_COIN"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "SERVER_ERROR"
  | "NETWORK"
  | "UNKNOWN";

export type AppError = {
  code: AppErrorCode;
  httpStatus?: number;
  message?: string;
  raw?: unknown;
};

const mapErrorCode = (n?: number): AppErrorCode => {
  switch (n) {
    case 1011:
      return "NO_COIN";
    case 1012:
      return "INVALID_ACCESS";
    default:
      return "UNKNOWN";
  }
};

export function toAppError(err: any): AppError {
  if (err && typeof err === "object" && "code" in err) {
    return err as AppError;
  }

  const res = err?.response;
  if (!res) return { code: "NETWORK", message: "네트워크 오류", raw: err };

  const api = res.data;
  if (api && api.success === false && typeof api.errorCode === "number") {
    const code = mapErrorCode(api.errorCode);
    return { code, message: api.errorMsg, httpStatus: res.status, raw: err };
  }

  switch (res.status) {
    case 401:
      return { code: "INVALID_ACCESS", httpStatus: 401, raw: err };
    case 403:
      return { code: "FORBIDDEN", httpStatus: 403, raw: err };
    case 404:
      return { code: "NOT_FOUND", httpStatus: 404, raw: err };
    case 500:
      return { code: "SERVER_ERROR", httpStatus: 500, raw: err };
    default:
      return { code: "UNKNOWN", httpStatus: res.status, raw: err };
  }
}
