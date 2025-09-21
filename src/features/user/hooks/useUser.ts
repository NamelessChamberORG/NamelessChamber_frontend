import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { useNavigate, useLocation } from "react-router";
import { PATHS } from "../../../constants/path";
import { ApiError } from "../../../api/types";

export function useUserMe() {
  const navigate = useNavigate();
  const location = useLocation();

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: userApi.getMe,
    staleTime: 60 * 1000,
    retry: false,
    onError: (error) => {
      const e = error as any;

      const code =
        (e instanceof ApiError ? e.code : undefined) ??
        e?.code ??
        e?.response?.data?.errorCode ??
        e?.errorCode;

      if (code === 1018) {
        navigate(PATHS.NICKNAME, {
          replace: true,
          state: { from: location.pathname },
        });
      }
    },
  });
}
