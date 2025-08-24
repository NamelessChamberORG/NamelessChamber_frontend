import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { diaryApi } from "../api/diary";
import type { CreateDiaryRequest } from "../types/types";
import { AxiosError } from "axios";
import { useToast } from "../../../contexts/ToastContext";

type Vars = Omit<CreateDiaryRequest, "type">;
type Res = Awaited<ReturnType<typeof diaryApi.create>>;

function getErrorMessage(err: unknown) {
  const ax = err as AxiosError<any>;
  const msgFromServer =
    ax?.response?.data?.errorMsg || ax?.response?.data?.message || ax?.message;
  return (
    msgFromServer || "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요."
  );
}

export function useCreateDiary(
  options?: UseMutationOptions<Res, unknown, Vars>
) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<Res, unknown, Vars>({
    mutationFn: (body) => diaryApi.create({ ...body, type: "SHORT" }),
    onSuccess: (data, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      options?.onSuccess?.(data, vars, ctx);
    },
    onError: (error, vars, ctx) => {
      showToast(getErrorMessage(error), "cancel");
      options?.onError?.(error, vars, ctx);
    },
    onSettled: (data, err, vars, ctx) => {
      options?.onSettled?.(data, err, vars, ctx);
    },
  });
}
