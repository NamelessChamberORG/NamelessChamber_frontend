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

export function getErrorMessage(error: unknown): string {
  const err = error as any;

  if (err?.response?.data?.errorMsg) {
    return err.response.data.errorMsg;
  }

  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  return err?.message || "알 수 없는 오류가 발생했습니다.";
}
