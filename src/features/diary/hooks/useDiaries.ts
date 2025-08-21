import { useQuery } from "@tanstack/react-query";
import { diaryApi } from "../api/diary";

export function useDiaries() {
  return useQuery({
    queryKey: ["diaries"],
    queryFn: diaryApi.getAll,
    select: (res) => res.data.data,
  });
}
