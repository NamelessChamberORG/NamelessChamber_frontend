import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthResponse } from "../types/types";
import { authApi } from "../api/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const NICKNAME_KEY = "nickname";

function notifyAuthUpdate() {
  // 같은 탭에서도 헤더가 즉시 갱신되도록 커스텀 이벤트 발행
  window.dispatchEvent(new Event("auth:update"));
}

function persistAuth(res: AuthResponse & { nickname?: string }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
  if (res.nickname) localStorage.setItem(NICKNAME_KEY, res.nickname);
  notifyAuthUpdate();
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(NICKNAME_KEY);
  notifyAuthUpdate();
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function getNickname(): string | null {
  return localStorage.getItem(NICKNAME_KEY);
}

type CommonOpts = {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (err: unknown) => void;
};

export function useLogin(
  opts: CommonOpts = {}
): UseMutationResult<
  AuthResponse,
  unknown,
  { nickname: string; password: string }
> {
  return useMutation({
    mutationFn: ({ nickname, password }) => authApi.login(nickname, password),
    onSuccess: (data, variables) => {
      persistAuth({ ...data, nickname: variables.nickname });
      opts.onSuccess?.(data);
    },
    onError: (err) => opts.onError?.(err),
  });
}

export function useSignup(
  opts: CommonOpts = {}
): UseMutationResult<
  AuthResponse,
  unknown,
  { nickname: string; password: string }
> {
  return useMutation({
    mutationFn: ({ nickname, password }) => authApi.signup(nickname, password),
    onSuccess: (data, variables) => {
      persistAuth({ ...data, nickname: variables.nickname });
      opts.onSuccess?.(data);
    },
    onError: (err) => opts.onError?.(err),
  });
}

export function useAnonymousLogin(opts: CommonOpts = {}) {
  return useMutation<AuthResponse, unknown, void>({
    mutationFn: () => authApi.anonymousLogin(),
    onSuccess: (data) => {
      persistAuth(data);
      opts.onSuccess?.(data);
    },
    onError: (err) => opts.onError?.(err),
  });
}
