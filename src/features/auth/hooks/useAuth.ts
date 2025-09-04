import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthResponse } from "../types/types";
import { authApi } from "../api/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function persistTokens(res: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
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
    onSuccess: (data) => {
      persistTokens(data);

      opts.onSuccess?.(data);
    },
    onError: (err) => {
      opts.onError?.(err);
    },
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
    onSuccess: (data) => {
      persistTokens(data);
      opts.onSuccess?.(data);
    },
    onError: (err) => {
      opts.onError?.(err);
    },
  });
}

export function useAnonymousLogin(opts: CommonOpts = {}) {
  return useMutation<AuthResponse, unknown, void>({
    mutationFn: () => authApi.anonymousLogin(),
    onSuccess: (data) => {
      persistTokens(data);
      opts.onSuccess?.(data);
    },
    onError: (err) => {
      opts.onError?.(err);
    },
  });
}
