import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  enterFullscreen,
  exitFullscreen,
} from "../lib/fullscreen/fullscreenStore";

export function useFullscreenState() {
  const isFullscreen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const enter = (target?: HTMLElement) => enterFullscreen(target);
  const exit = () => exitFullscreen();
  const toggle = (target?: HTMLElement) =>
    isFullscreen ? exitFullscreen() : enterFullscreen(target);

  return { isFullscreen, enter, exit, toggle };
}
