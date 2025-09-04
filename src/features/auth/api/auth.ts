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
    return unwrap<AuthResponse>(res);
  },

  async signup(email: string, password: string): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/signup",
      {
        email,
        password,
      }
    );

    return unwrap<AuthResponse>(res);
  },

  async anonymousLogin(): Promise<AuthResponse> {
    const res = await authClient.post<ApiResponse<AuthResponse>>(
      "/auth/anonymous"
    );
    return unwrap<AuthResponse>(res);
  },
};
