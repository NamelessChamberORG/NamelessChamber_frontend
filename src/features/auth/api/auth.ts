import type { ApiResponse } from "../../../api/types";
import type { AuthResponse } from "../types/types";
import client from "../../../api/client";
import { unwrap } from "../../../api/helpers";
import { getAccessToken, getRefreshToken, persistAuth } from "./tokenStore";

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await client.post<ApiResponse<AuthResponse>>("/auth/login", {
      email,
      password,
    });
    return unwrap<AuthResponse>(res);
  },

  async signup(email: string, password: string): Promise<AuthResponse> {
    const res = await client.post<ApiResponse<AuthResponse>>("/auth/signup", {
      email,
      password,
    });

    return unwrap<AuthResponse>(res);
  },

  async anonymousLogin(): Promise<AuthResponse> {
    const res = await client.post<ApiResponse<AuthResponse>>("/auth/anonymous");
    return unwrap<AuthResponse>(res);
  },
};

export async function reissueTokens(): Promise<string> {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await client.post("/auth/reissue", { accessToken, refreshToken });
  const data: any = res.data && res.data.data ? res.data.data : res.data;

  persistAuth({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data.accessToken as string;
}
