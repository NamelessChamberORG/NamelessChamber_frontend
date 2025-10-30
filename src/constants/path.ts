export const PATHS = {
  HOME: "/",
  DIARY_ALL: "/diary",
  DIARY_LIST: "/diary/:type",
  DIARY_SUBMIT: "/diary/submit/:type",
  DIARY_NEW: "/diary/new/:type",
  DIARY_DETAIL: "/diary/v/:id",
  DIARY_STREAK: "/diary/streak/:type",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  NICKNAME: "/signup/nickname",
  ERROR: "/error",
  PROFILE: "/profile",
  FEEDBACK: "/feedback",

  DIARY_LIST_TYPE: (type: "today" | "daily" | "mind") => `/diary/${type}`,
  DIARY_SUBMIT_TYPE: (type: "today" | "daily" | "mind") =>
    `/diary/submit/${type}`,
  DIARY_DETAIL_ID: (id: string) => `/diary/v/${id}`,
  DIARY_NEW_TYPE: (type: "today" | "daily" | "mind") => `/diary/new/${type}`,
  DIARY_STREAK_TYPE: (type: "today" | "daily" | "mind") =>
    `/diary/streak/${type}`,
} as const;
