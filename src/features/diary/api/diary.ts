import client from "../../../api/client";
import { unwrap } from "../../../api/helpers";
import type { ApiResponse } from "../../../api/types";
import type {
  CreateDiaryRequest,
  DiaryPreview,
  DiaryDetail,
  PostsPayload,
  CreateDiaryResponse,
} from "../types/types";

export const diaryApi = {
  async getAll(type?: "SHORT" | "LONG" | "TODAY"): Promise<PostsPayload> {
    const res = await client.get<ApiResponse<PostsPayload>>("/posts", {
      params: type ? { type } : undefined,
    });
    return unwrap(res);
  },
  async getById(id: string): Promise<DiaryDetail> {
    const res = await client.get<ApiResponse<DiaryDetail>>(`/posts/${id}`);
    return unwrap(res);
  },
  async create(body: CreateDiaryRequest): Promise<CreateDiaryResponse> {
    const res = await client.post<ApiResponse<CreateDiaryResponse>>(
      "/posts",
      body,
      { validateStatus: (status) => status !== 401 }
    );
    return unwrap(res);
  },

  getAllRaw() {
    return client.get<ApiResponse<DiaryPreview[]>>("/posts");
  },
};
