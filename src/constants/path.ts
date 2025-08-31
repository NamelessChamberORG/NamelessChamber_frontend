export const PATHS = {
  HOME: "/",
  DIARY_LIST_TYPE: (type: "short" | "long") => `/diary/${type}`,
  DIARY_SUBMIT_TYPE: (type: "short" | "long") => `/diary/submit/${type}`,
  DIARY_DETAIL: (id: string) => `/diary/${id}`,
  DIARY_NEW: (type: string) => `/diary/new/${type}`,
} as const;
