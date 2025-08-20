import type { ApiResponse } from "../../../api/types";

export type DiaryType = "SHORT" | "LONG";

export type CreateDiaryRequest = {
  title: string;
  content: string;
  type: DiaryType;
};

export type DiaryPreview = {
  id: string;
  title: string;
  contentPreview?: string;
  contentLength: number;
  likes?: number;
  views?: number;
  createdAt?: string;
};

export type GetDiariesResponse = ApiResponse<DiaryPreview[]>;
