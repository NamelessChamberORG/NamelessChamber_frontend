import type { AxiosResponse } from "axios";
import { ApiError, type ApiResponse } from "./types.ts";

export function unwrap<T>(res: AxiosResponse<ApiResponse<T>>): T {
  const body = res.data;
  if (body.success !== true) {
    throw new ApiError(
      body.errorMsg || "Request failed",
      body.errorCode,
      res.status
    );
  }
  return body.data;
}

export function unwrapNoContent(
  res: AxiosResponse<ApiResponse<unknown> | undefined | null>
): void {
  const { status, data: payload } = res;

  if (payload && typeof payload === "object" && "success" in (payload as any)) {
    const env = payload as ApiResponse<unknown>;
    if (env.success !== true) {
      throw new ApiError(
        env.errorMsg || "Request failed",
        env.errorCode,
        status
      );
    }
    return;
  }

  if (status < 200 || status >= 300) {
    throw new ApiError(res.statusText || "Request failed", undefined, status);
  }
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "알 수 없는 오류가 발생했습니다.";
}
