type Listener = () => void;

const listeners = new Set<Listener>();

// WebKit 전용 타입 보강
interface WebkitDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
}
interface WebkitHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: (
    options?: FullscreenOptions
  ) => Promise<void> | void;
}

// 전역 플래그 타입 보강
interface WindowWithFS extends Window {
  __fs_listeners_attached__?: boolean;
}

function getFsElement(): Element | null {
  const d = document as WebkitDocument;
  return document.fullscreenElement || d.webkitFullscreenElement || null;
}

function notify() {
  for (const l of listeners) l();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): boolean {
  return !!getFsElement();
}

// SSR 대비: 서버에선 항상 false
export function getServerSnapshot(): boolean {
  return false;
}

export async function enterFullscreen(target?: HTMLElement) {
  const el = (target ?? document.documentElement) as WebkitHTMLElement;
  try {
    if (el.requestFullscreen) {
      await el.requestFullscreen({ navigationUI: "hide" });
    } else {
      await el.webkitRequestFullscreen?.({ navigationUI: "hide" });
    }
  } finally {
    notify();
  }
}

export async function exitFullscreen() {
  const d = document as WebkitDocument;
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else {
      await d.webkitExitFullscreen?.();
    }
  } finally {
    notify();
  }
}

// 루트에서 1회만 이벤트 부착
export function attachGlobalFullscreenListenersOnce() {
  const w = window as WindowWithFS;
  if (w.__fs_listeners_attached__) return;

  const handler = () => notify();
  document.addEventListener("fullscreenchange", handler);
  document.addEventListener("webkitfullscreenchange", handler as EventListener);

  w.__fs_listeners_attached__ = true;
}
