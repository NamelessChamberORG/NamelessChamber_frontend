export const PATHS = {
  HOME: "/",
  DIARY_LIST: "/diary/:type",
  DIARY_SUBMIT: "/diary/submit/:type",
  DIARY_NEW: "/diary/new/:type",
  DIARY_DETAIL: "/diary/v/:id",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  NICKNAME: "/signup/nickname",
  ERROR: "/error",

  DIARY_LIST_TYPE: (type: "daily" | "mind") => `/diary/${type}`,
  DIARY_SUBMIT_TYPE: (type: "daily" | "mind") => `/diary/submit/${type}`,
  DIARY_DETAIL_ID: (id: string) => `/diary/v/${id}`,
  DIARY_NEW_TYPE: (type: "daily" | "mind") => `/diary/new/${type}`,
} as const;
