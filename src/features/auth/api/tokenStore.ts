const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const EMAIL_KEY = "email";
const LAST_UPDATE_KEY = "auth:lastUpdate";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}
export function getEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

function pokeStorageBroadcast() {
  try {
    localStorage.setItem(LAST_UPDATE_KEY, String(Date.now()));
  } catch {
    if (import.meta.env.DEV) {
      console.warn("Failed to broadcast auth update via storage");
    }
  }
}

export function notifyAuthUpdate() {
  window.dispatchEvent(new Event("auth:update"));
  pokeStorageBroadcast();
}

export function persistAuth(res: {
  accessToken: string;
  refreshToken?: string;
  email?: string;
}) {
  localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
  if (res.refreshToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
  if (res.email) localStorage.setItem(EMAIL_KEY, res.email);
  notifyAuthUpdate();
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  notifyAuthUpdate();
}

export function parseJwtExp(token: string | null): number | null {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload));
    return typeof json?.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

export function hasValidToken(skewSec = 15): boolean {
  const token = getAccessToken();
  const exp = parseJwtExp(token);
  if (!token || !exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return now + skewSec < exp;
}
