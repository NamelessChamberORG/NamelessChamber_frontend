import { useState, useEffect, useCallback } from "react";

export function useFullscreen(
  targetRef?:
    | React.RefObject<HTMLElement | null>
    | React.MutableRefObject<HTMLElement | null>
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggle = useCallback(() => {
    const elem = (targetRef?.current ??
      document.documentElement) as HTMLElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error("전체 화면 진입 실패:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("전체 화면 종료 실패:", err);
      });
    }
  }, [targetRef]);

  useEffect(() => {
    const handleChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return { isFullscreen, toggle };
}
