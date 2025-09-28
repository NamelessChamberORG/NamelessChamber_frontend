import client from "../../../api/client";
import { unwrap, unwrapNoContent } from "../../../api/helpers";
import type { ApiResponse } from "../../../api/types";
import type { DiaryPreview } from "../../diary/types/types";
import type { ReadDiaries, UserMe } from "../type/types";

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
    const res = await client.get<ApiResponse<UserMe>>("/users/me", {
      validateStatus: () => true,
    });

    return unwrap(res);
  },
  async getReadDiaries(): Promise<ReadDiaries> {
    const res = await client.get<ApiResponse<ReadDiaries>>("/read-history");
    return unwrap<ReadDiaries>(res);
  },
  async getWrittenDiaries(): Promise<DiaryPreview[]> {
    const res = await client.get<ApiResponse<DiaryPreview[]>>("/posts/me");
    return unwrap(res);
  },
};
