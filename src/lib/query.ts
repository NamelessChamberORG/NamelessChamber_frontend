import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import type { AppError } from "../api/errors";

function redirectToError(code: string, message?: string) {
  const qs = new URLSearchParams();
  qs.set("code", code);
  if (message) qs.set("message", message);
  window.location.replace(`/error?${qs.toString()}`);
}

const isRouteBlocking = (e: unknown) => {
  const code = (e as AppError)?.code;
  return (
    code === "INVALID_ACCESS" || code === "FORBIDDEN" || code === "NOT_FOUND"
  );
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const e = error as AppError;
      if (e?.code === "INVALID_ACCESS") {
        redirectToError("INVALID_ACCESS", "정상 경로로 다시 시도해주세요.");
      } else if (e?.code === "FORBIDDEN" || e?.code === "NOT_FOUND") {
        redirectToError(e.code, e.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const e = error as AppError;
      if (e?.code === "INVALID_ACCESS") {
        redirectToError("INVALID_ACCESS", "정상 경로로 다시 시도해주세요.");
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) =>
        isRouteBlocking(error) ? false : failureCount < 1,
      throwOnError: false,
    },
    mutations: {
      throwOnError: false,
    },
  },
});
