export const PATHS = {
  HOME: "/",
  DIARY_LIST: "/diary",
  DIARY_SUBMIT: "/diary/submit",
  DIARY_DETAIL: (id: string) => `/diary/${id}`,
  DIARY_NEW: (type: string) => `/diary/new/${type}`,
} as const;
