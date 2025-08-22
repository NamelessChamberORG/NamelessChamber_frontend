import { useState, useEffect, useCallback } from "react";

// WebKit 전용 Document/Element 확장 타입
interface WebkitDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
}
interface WebkitHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
}

/**
 * 문서 전체(full document) 풀스크린을 기본으로 사용하는 훅
 * @param _targetRef 특정 엘리먼트를 풀스크린으로 쓰고 싶을 때만 전달
 * @param forceDocument true면 항상 <html>로 풀스크린
 */
export function useFullscreen(
  _targetRef?:
    | React.RefObject<HTMLElement | null>
    | React.MutableRefObject<HTMLElement | null>,
  forceDocument = true
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 현재 풀스크린 엘리먼트(표준 + WebKit) 조회
  const getFsEl = (): Element | null =>
    document.fullscreenElement ||
    (document as WebkitDocument).webkitFullscreenElement ||
    null;

  const toggle = useCallback(() => {
    const fsEl = getFsEl();

    // 이미 풀스크린이면 종료
    if (fsEl) {
      const d = document as WebkitDocument;
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .catch((err: unknown) => console.error("전체 화면 종료 실패:", err));
      } else {
        d.webkitExitFullscreen?.().catch((err: unknown) =>
          console.error("전체 화면 종료 실패:", err)
        );
      }
      return;
    }

    // 진입 대상: 기본은 <html>; forceDocument=false면 ref 우선
    const el = (
      forceDocument
        ? document.documentElement
        : _targetRef?.current ?? document.documentElement
    ) as WebkitHTMLElement;

    if (el.requestFullscreen) {
      el.requestFullscreen({ navigationUI: "hide" }).catch((err: unknown) =>
        console.error("전체 화면 진입 실패:", err)
      );
    } else {
      el.webkitRequestFullscreen?.({ navigationUI: "hide" }).catch(
        (err: unknown) => console.error("전체 화면 진입 실패:", err)
      );
    }
  }, [forceDocument, _targetRef]);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(getFsEl()));

    document.addEventListener("fullscreenchange", sync);
    // Safari/WebKit
    document.addEventListener("webkitfullscreenchange", sync);

    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  return { isFullscreen, toggle };
}
