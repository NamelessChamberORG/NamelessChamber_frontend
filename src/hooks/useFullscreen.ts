import { useMemo } from "react";
import { useFullscreenState } from "./useFullscreenState";

export function useFullscreen(
  targetRef?:
    | React.RefObject<HTMLElement | null>
    | React.MutableRefObject<HTMLElement | null>,
  forceDocument = true
) {
  const { isFullscreen, enter, exit, toggle } = useFullscreenState();

  return useMemo(() => {
    const pickTarget = () =>
      forceDocument ? undefined : targetRef?.current ?? undefined;
    return {
      isFullscreen,
      enter: () => enter(pickTarget()),
      exit,
      toggle: () => toggle(pickTarget()),
    };
  }, [isFullscreen, enter, exit, toggle, targetRef, forceDocument]);
}
