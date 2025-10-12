export const UI_TO_API = {
  daily: "SHORT",
  mind: "LONG",
  today: "TODAY",
} as const;

export const API_TO_UI = {
  SHORT: "daily",
  LONG: "mind",
  TODAY: "today",
} as const;

export type UiType = keyof typeof UI_TO_API;
export type ApiType = (typeof UI_TO_API)[UiType];
