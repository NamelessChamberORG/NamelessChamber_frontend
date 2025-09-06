import client from "../../../api/client";
import { unwrapNoContent } from "../../../api/helpers";
import type { ApiResponse } from "../../../api/types";

export const userApi = {
  async createNickname(nickname: string): Promise<void> {
    const res = await client.post<ApiResponse<unknown>>(
      "/users/nickname",
      { nickname },
      { validateStatus: () => true }
    );
    unwrapNoContent(res);
  },
};
