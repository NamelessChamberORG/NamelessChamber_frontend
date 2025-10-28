import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { diaryApi } from "../api/diary";
import type { CreateDiaryRequest, CreateDiaryResponse } from "../types/types";
import { AxiosError } from "axios";
import { useToast } from "../../../contexts/ToastContext";
import { useNavigate } from "react-router";
import { PATHS } from "../../../constants/path";

type Res = CreateDiaryResponse;
type Vars = Omit<CreateDiaryRequest, "type">;

const DIARY_TYPE_TO_ROUTE: Record<
  "SHORT" | "LONG" | "TODAY",
  "today" | "daily" | "mind"
> = {
  TODAY: "today",
  SHORT: "daily",
  LONG: "mind",
};

function getErrorMessage(err: unknown) {
  const ax = err as AxiosError<any>;
  const msgFromServer =
    ax?.response?.data?.errorMsg || ax?.response?.data?.message || ax?.message;
  return (
    msgFromServer || "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요."
  );
}

export function useCreateDiary(
  defaultType: "SHORT" | "LONG" | "TODAY" = "SHORT",
  options?: UseMutationOptions<Res, AxiosError, Vars, unknown>
) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation<Res, AxiosError, Vars, unknown>({
    mutationFn: (body: Vars) => diaryApi.create({ ...body, type: defaultType }),

    onSuccess: (data, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });

      if (data.showCalendar) {
        const routeType = DIARY_TYPE_TO_ROUTE[defaultType];
        navigate(PATHS.DIARY_STREAK_TYPE(routeType), {
          state: {
            calendar: data.calendar,
            coin: data.coin,
            totalPosts: data.totalPosts,
            postId: data.postId,
          },
          replace: true,
        });
      }

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
