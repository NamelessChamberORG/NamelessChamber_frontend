import { useEffect, useRef } from "react";
import { useAnonymousLogin } from "./useAuth";
import { hasValidToken } from "../api/tokenStore";

export function useEnsureSession(auto = true) {
  const didRun = useRef(false);
  const { mutateAsync: anonLogin, isPending } = useAnonymousLogin();

  const ensure = async () => {
    if (hasValidToken()) return;
    await anonLogin();
  };

  useEffect(() => {
    if (!auto || didRun.current) return;
    didRun.current = true;
    if (!hasValidToken()) void anonLogin();
  }, [auto, anonLogin]);

  return { ensure, ensuring: isPending, ready: hasValidToken() };
}
