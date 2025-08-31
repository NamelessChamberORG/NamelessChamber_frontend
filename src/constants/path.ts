export const PATHS = {
  HOME: "/",
  DIARY_LIST: "/diary/:type",
  DIARY_SUBMIT: "/diary/submit/:type",
  DIARY_NEW: "/diary/new/:type",
  DIARY_DETAIL: "/diary/v/:id",

  DIARY_LIST_TYPE: (type: "short" | "long") => `/diary/${type}`,
  DIARY_SUBMIT_TYPE: (type: "short" | "long") => `/diary/submit/${type}`,
  DIARY_DETAIL_ID: (id: string) => `/diary/v/${id}`,
  DIARY_NEW_TYPE: (type: string) => `/diary/new/${type}`,
} as const;
