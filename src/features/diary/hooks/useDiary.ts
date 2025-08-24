import { useQuery } from "@tanstack/react-query";
import { diaryApi } from "../api/diary";

export function useDiary(id?: string) {
  return useQuery({
    queryKey: ["diary", id],
    queryFn: () => diaryApi.getById(id as string),
    enabled: !!id,
  });
}
