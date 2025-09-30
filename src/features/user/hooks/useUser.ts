import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";
import type { UserMe } from "../type/types";
import { ApiError } from "../../../api/types";

export function useUserMe() {
  return useQuery<UserMe, ApiError>({
    queryKey: ["user", "me"],
    queryFn: userApi.getMe,
    retry: false,
  });
}
