import type { ApiResponse } from "../../../api/types";

export type AuthResponse = {
  userId: string;
  eamil: string;
  nickname: string;
  coin: number;
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = ApiResponse<AuthResponse>;
export type SignupResponse = ApiResponse<AuthResponse>;
