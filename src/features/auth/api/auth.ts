import type { ApiResponse } from "../../../api/types";
import type { AuthResponse } from "../types/types";
import { authClient } from "../../../api/client";
import { unwrap } from "../../../api/helpers";

export const authApi = {
  async login(nickname: string, password: string): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      {
        nickname,
        password,
      }
    );
    const data = unwrap<AuthResponse>(res);

    localStorage.setItem("accessToken", data.accessToken);

    return data;
  },

  async signup(nickname: string, password: string): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/signup",
      {
        nickname,
        password,
      }
    );

    const data = unwrap<AuthResponse>(res);

    localStorage.setItem("accessToken", data.accessToken);

    return data;
  },

  async anonymousLogin(): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/anonymous"
    );
    const data = unwrap<AuthResponse>(res);

    localStorage.setItem("accessToken", data.accessToken);

    return data;
  },
};
