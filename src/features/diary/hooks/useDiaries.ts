import { useQuery } from "@tanstack/react-query";
import { diaryApi } from "../api/diary";

export function useDiaries({
  type,
}: {
  type: "SHORT" | "LONG" | "TODAY" | undefined;
}) {
  return useQuery({
    queryKey: ["diaries", type],
    queryFn: () => diaryApi.getAll(type),
  });
}
