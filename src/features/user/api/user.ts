import client from "../../../api/client";
import { unwrap, unwrapNoContent } from "../../../api/helpers";
import type { ApiResponse } from "../../../api/types";
import type { UserMe } from "../type/types";

export const userApi = {
  async createNickname(nickname: string): Promise<void> {
    const res = await client.post<ApiResponse<unknown>>(
      "/users/nickname",
      { nickname },
      { validateStatus: () => true }
    );
    unwrapNoContent(res);
  },
  async getMe(): Promise<UserMe> {
    const res = await client.get<ApiResponse<UserMe>>("/users/me");

    return unwrap(res);
  },
};
