import { useQuery } from "@tanstack/react-query";
import type { DiaryPreview } from "../../diary/types/types";
import { userApi } from "../api/user";

export function useWrittenDiaries() {
  return useQuery<DiaryPreview[]>({
    queryKey: ["user", "writtenDiaries"],
    queryFn: userApi.getWrittenDiaries,
  });
}
