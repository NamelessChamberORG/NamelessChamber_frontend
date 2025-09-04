import type { ApiResponse } from "../../../api/types";
import type { AuthResponse } from "../types/types";
import { authClient } from "../../../api/client";
import { unwrap } from "../../../api/helpers";

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      {
        email,
        password,
      }
    );
    const data = unwrap<AuthResponse>(res);

    localStorage.setItem("accessToken", data.accessToken);

    return data;
  },

  async signup(email: string, password: string): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/signup",
      {
        email,
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
