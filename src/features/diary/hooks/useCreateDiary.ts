import { useMutation, useQueryClient } from "@tanstack/react-query";
import { diaryApi } from "../api/diary";
import type { CreateDiaryRequest } from "../types/types";

export function useCreateDiary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<CreateDiaryRequest, "type">) =>
      diaryApi.create({ ...body, type: "SHORT" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
}
