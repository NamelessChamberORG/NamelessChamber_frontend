import type { DiaryPreview } from "../../diary/types/types";

export type UserMe = {
  userId: string;
  nickname: string;
  email: string;
  role: "ANONYMOUS" | "USER" | "ADMIN" | string;
  coin: number;
  createdAt: string;
  lastLoginAt: string;
};

export type ReadDiaries = {
  coin: number;
  posts: DiaryPreview[];
};
