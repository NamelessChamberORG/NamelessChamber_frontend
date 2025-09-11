import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthResponse } from "../types/types";
import { authApi } from "../api/auth";
import {
  persistAuth,
  clearAuth as clearAuthStore,
  getAccessToken,
  getEmail,
} from "../api/tokenStore";

type CommonOpts = {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (err: unknown) => void;
};

export function useLogin(
  opts: CommonOpts = {}
): UseMutationResult<
  AuthResponse,
  unknown,
  { email: string; password: string }
> {
  return useMutation({
    mutationFn: ({ email, password }) => authApi.login(email, password),
    onSuccess: (data, variables) => {
      persistAuth({ ...data, email: variables.email });
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
  { email: string; password: string }
> {
  return useMutation({
    mutationFn: ({ email, password }) => authApi.signup(email, password),
    onSuccess: (data, variables) => {
      persistAuth({ ...data, email: variables.email });
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

export { clearAuthStore as clearAuth, getAccessToken, getEmail };
