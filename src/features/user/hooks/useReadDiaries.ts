import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";

export function useReadDiaries(enabled = true) {
  return useQuery({
    queryKey: ["user", "diaries", "read"],
    queryFn: userApi.getReadDiaries,
    enabled,
  });
}
