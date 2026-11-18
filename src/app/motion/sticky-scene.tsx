import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";
import { useScrollProgress } from "./hooks/use-scroll-progress";

export type StickySceneProps = {
  children: ReactNode;
  /**
   * Outer scroll length. Number = px; string = CSS length (e.g. "200vh").
   * Default 200vh ≈ one viewport of sticky progression after pin.
   */
  height?: number | string;
  className?: string;
  stickyClassName?: string;
  style?: CSSProperties;
  /** Write --scroll-progress on the scene host (sticky mode). */
  trackProgress?: boolean;
  /**
   * Collapse sticky scrub below this viewport width (px).
   * Pin becomes relative; height collapses; progress tracking pauses.
   */
  collapseBelow?: number;
  /** Progress callback — write CSS vars here; do not set React state. */
  onProgress?: (progress: number, el: HTMLElement) => void;
  debug?: boolean;
};

function readWideEnough(collapseBelow?: number) {
  if (collapseBelow == null || typeof window === "undefined") return true;
  return window.matchMedia(`(min-width: ${collapseBelow}px)`).matches;
}

/**
 * Native sticky sequence host.
 * Does not intercept wheel events. Progress is CSS --scroll-progress (0→1).
 * Reduced motion: pin becomes relative; height collapses to content.
 */
export function StickyScene({
  children,
  height = "200vh",
  className = "",
  stickyClassName = "",
  style,
  trackProgress = true,
  collapseBelow,
  onProgress,
  debug = false,
}: StickySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [wideEnough, setWideEnough] = useState(() => readWideEnough(collapseBelow));
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useLayoutEffect(() => {
    if (collapseBelow == null) {
      setWideEnough(true);
      return;
    }
    const mq = window.matchMedia(`(min-width: ${collapseBelow}px)`);
    const sync = () => setWideEnough(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [collapseBelow]);

  const scrubActive = !reduced && wideEnough;

  useScrollProgress(ref, {
    mode: "sticky",
    disabled: !trackProgress || !scrubActive,
    debugAttr:
      debug ||
      (typeof document !== "undefined" &&
        document.documentElement.hasAttribute("data-oveliq-motion-debug")),
    onProgress: (p, el) => onProgressRef.current?.(p, el),
  });

  // Ensure collapse/reduced always resets derived progress vars even if
  // a prior scrub frame wrote inline custom properties.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || scrubActive) return;
    onProgressRef.current?.(0, el);
  }, [scrubActive]);

  const heightStyle =
    !scrubActive
      ? undefined
      : typeof height === "number"
        ? `${height}px`
        : height;

  return (
    <div
      ref={ref}
      className={`oveliq-sticky-scene ${className}`.trim()}
      style={{ ...style, height: heightStyle }}
      data-oveliq-motion="sticky-scene"
      data-reduced={reduced ? "true" : undefined}
      data-collapsed={!scrubActive ? "true" : undefined}
    >
      <div className={`oveliq-sticky-scene__pin ${stickyClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
