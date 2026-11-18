import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * Runs `onFrame` once per animation frame while the page scrolls or resizes
 * through passive native scroll listeners.
 * No React state — write styles directly in the callback.
 * Skipped entirely under reduced motion; `onReduced` runs once instead.
 */
export function useScrollFrame(
  onFrame: () => void,
  options: { disabled?: boolean; onReduced?: () => void } = {},
) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef(onFrame);
  const reducedRef = useRef(options.onReduced);
  frameRef.current = onFrame;
  reducedRef.current = options.onReduced;
  const disabled = options.disabled ?? false;

  useEffect(() => {
    if (disabled) return;
    if (reduced) {
      reducedRef.current?.();
      return;
    }
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        frameRef.current();
      });
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [disabled, reduced]);
}
