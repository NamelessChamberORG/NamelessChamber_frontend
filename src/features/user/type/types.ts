export type UserMe = {
  userId: string;
  nickname: string;
  email: string;
  role: "ANONYMOUS" | "USER" | "ADMIN" | string;
  coin: number;
  createdAt: string;
  lastLoginAt: string;
};
