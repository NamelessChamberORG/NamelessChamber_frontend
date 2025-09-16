import axios, { AxiosError, AxiosHeaders } from "axios";
import type { AxiosRequestConfig } from "axios";

import {
  getAccessToken,
  clearAuth,
  notifyAuthUpdate,
} from "../features/auth/api/tokenStore";
import { reissueTokens } from "../features/auth/api/auth";

/* -------------------------------------------------------
 * Axios Base Client
 * ----------------------------------------------------- */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});
export default client;

/* -------------------------------------------------------
 * Public (No-Auth) Endpoints
 * ----------------------------------------------------- */
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/reissue",
  "/auth/anonymous",
];

function isPublicRequest(config: AxiosRequestConfig) {
  const base = (config.baseURL as string) ?? client.defaults.baseURL ?? "";
  const url = new URL(config.url!, base);
  return PUBLIC_PATHS.some((p) => url.pathname.startsWith(p));
}

/* -------------------------------------------------------
 * Header Helpers
 * ----------------------------------------------------- */
function setAuthHeader(config: AxiosRequestConfig, token: string) {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  const h = config.headers as AxiosHeaders;
  if (typeof (h as any).set === "function") {
    (h as any).set("Authorization", `Bearer ${token}`);
  } else {
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
}

function removeAuthHeader(config: AxiosRequestConfig) {
  if (!config.headers) return;
  const h = config.headers as AxiosHeaders;
  if (typeof (h as any).delete === "function") {
    (h as any).delete("Authorization");
  } else {
    delete (config.headers as any)["Authorization"];
  }
}

/* -------------------------------------------------------
 * Common Auth-Expired Handler
 * ----------------------------------------------------- */
function handleAuthExpired(reason: string, redirectTo?: string) {
  clearAuth();
  window.dispatchEvent(
    new CustomEvent("auth:expired", { detail: { reason, status: 401 } })
  );
  notifyAuthUpdate();
  if (redirectTo) {
    window.location.replace(redirectTo);
  }
}

/* -------------------------------------------------------
 * Refresh Queue (for 1016)
 * ----------------------------------------------------- */
type Waiter = {
  resolve: (v: any) => void;
  reject: (e: any) => void;
  originalRequest: AxiosRequestConfig;
};

let isRefreshing = false;
let queue: Waiter[] = [];

function enqueue(w: Waiter) {
  queue.push(w);
}

function flush(error: any, newAccess?: string) {
  const q = [...queue];
  queue = [];
  q.forEach(({ resolve, reject, originalRequest }) => {
    if (newAccess) {
      setAuthHeader(originalRequest, newAccess);
      resolve(client(originalRequest));
    } else {
      reject(error);
    }
  });
}

/* -------------------------------------------------------
 * Request Interceptor
 * ----------------------------------------------------- */
client.interceptors.request.use((config) => {
  // per-request override: { "x-skip-auth": true }
  const skipByHeader =
    typeof config.headers === "object" &&
    (config.headers as any)["x-skip-auth"] === true;

  if (skipByHeader || isPublicRequest(config)) {
    removeAuthHeader(config);
    return config;
  }

  const token = getAccessToken();
  if (token) {
    setAuthHeader(config, token);
  } else {
    removeAuthHeader(config);
  }
  return config;
});

/* -------------------------------------------------------
 * Response Interceptor
 * ----------------------------------------------------- */
client.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<any>) => {
    const status = error?.response?.status;
    const codeNum: number | undefined = (error?.response as any)?.data
      ?.errorCode;

    if (status !== 401) return Promise.reject(error);

    if (codeNum === 1012) {
      console.log("잘못된 접근 (1012)");
      handleAuthExpired("invalid_token", "/");
      return Promise.reject(error);
    }

    if (codeNum === 1017) {
      console.log("인증 필요 (1017)");
      handleAuthExpired("no_token", "/");
      return Promise.reject(error);
    }

    if (codeNum === 1016) {
      console.log("토큰 만료 (1016)");
      const originalRequest = error.config as AxiosRequestConfig;

      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          enqueue({ resolve, reject, originalRequest })
        );
      }

      isRefreshing = true;
      try {
        const newAccess = await reissueTokens();
        isRefreshing = false;

        flush(null, newAccess);
        setAuthHeader(originalRequest, newAccess);
        return client(originalRequest);
      } catch (e) {
        isRefreshing = false;
        flush(e);
        handleAuthExpired("refresh_failed", "/");
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
