import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { userApi } from "../api/user";

export function useCreateNickname(
  options?: Parameters<typeof useMutation<void, Error, string>>[0]
): UseMutationResult<void, Error, string> {
  return useMutation<void, Error, string>({
    mutationFn: (nickname: string) => userApi.createNickname(nickname),
    ...options,
  });
}
