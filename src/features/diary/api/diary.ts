import client from "../../../api/client";
import type { GetDiariesResponse, CreateDiaryRequest } from "../types/types";

export const diaryApi = {
  getAll: () => client.get<GetDiariesResponse>("/posts"),
  create: (body: CreateDiaryRequest) => client.post<void>("/posts", body),
};
