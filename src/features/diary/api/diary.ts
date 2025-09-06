import client from "../../../api/client";
import { unwrap, unwrapNoContent } from "../../../api/helpers";
import type { ApiResponse } from "../../../api/types";
import type {
  CreateDiaryRequest,
  DiaryPreview,
  DiaryDetail,
  PostsPayload,
} from "../types/types";

export const diaryApi = {
  async getAll(type: "SHORT" | "LONG"): Promise<PostsPayload> {
    const res = await client.get<ApiResponse<PostsPayload>>("/posts", {
      params: { type },
    });
    return unwrap(res);
  },
  async getById(id: string): Promise<DiaryDetail> {
    const res = await client.get<ApiResponse<DiaryDetail>>(`/posts/${id}`);
    return unwrap(res);
  },
  async create(body: CreateDiaryRequest): Promise<void> {
    const res = await client.post<ApiResponse<unknown> | undefined | null>(
      "/posts",
      body,
      { validateStatus: () => true }
    );
    unwrapNoContent(res);
  },

  getAllRaw() {
    return client.get<ApiResponse<DiaryPreview[]>>("/posts");
  },
};
