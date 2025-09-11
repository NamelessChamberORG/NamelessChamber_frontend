import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";

export function useUserMe() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: userApi.getMe,
    staleTime: 60 * 1000,
  });
}
