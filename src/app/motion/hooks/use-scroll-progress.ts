import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export type ScrollProgressMode = "contain" | "cover" | "sticky" | "exit";

export type UseScrollProgressOptions = {
  /**
   * contain — 0 when element top hits viewport bottom, 1 when bottom hits viewport top
   * cover — 0 when element enters, 1 when fully scrolled past
   * sticky — tall sticky host: 0 at pin start, 1 when host is exhausted
   * exit — 0 when the element's top is at the viewport top, 1 when it has fully left upward.
   *        Use this for hero parallax. Do not transform the tracked element itself.
   */
  mode?: ScrollProgressMode;
  clamp?: boolean;
  disabled?: boolean;
  /** CSS custom property written on the element (default --scroll-progress). */
  cssVar?: string;
  /** Optional debug attribute data-scroll-progress="0.00" */
  debugAttr?: boolean;
  /** Called inside rAF — do not set React state here for hot paths. */
  onProgress?: (progress: number, el: HTMLElement) => void;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function computeProgress(el: HTMLElement, mode: ScrollProgressMode): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;

  if (mode === "sticky") {
    const total = Math.max(1, el.offsetHeight - vh);
    return clamp01(-rect.top / total);
  }

  if (mode === "exit") {
    return clamp01(-rect.top / Math.max(1, el.offsetHeight));
  }

  if (mode === "cover") {
    const start = rect.top + window.scrollY - vh;
    const end = start + el.offsetHeight + vh;
    return clamp01((window.scrollY - start) / Math.max(1, end - start));
  }

  const start = rect.top + window.scrollY - vh;
  const end = rect.top + window.scrollY + rect.height;
  return clamp01((window.scrollY - start) / Math.max(1, end - start));
}

/**
 * Continuous scroll progress without React state updates on scroll.
 * Writes normalized 0–1 into a CSS variable via a single passive scroll → rAF loop.
 */
export function useScrollProgress<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: UseScrollProgressOptions = {},
): RefObject<number> {
  const {
    mode = "contain",
    clamp = true,
    disabled = false,
    cssVar = "--scroll-progress",
    debugAttr = false,
    onProgress,
  } = options;

  const progressRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = targetRef.current;
    if (!el || disabled || reduced) {
      if (el) {
        el.style.setProperty(cssVar, "0");
        if (debugAttr) el.setAttribute("data-scroll-progress", "0");
      }
      progressRef.current = 0;
      onProgressRef.current?.(0, el);
      return;
    }

    let raf = 0;
    let active = true;

    const update = () => {
      raf = 0;
      const target = targetRef.current;
      if (!active || !target) return;
      let p = computeProgress(target, mode);
      if (clamp) p = clamp01(p);
      progressRef.current = p;
      target.style.setProperty(cssVar, p.toFixed(4));
      if (debugAttr) {
        target.setAttribute("data-scroll-progress", p.toFixed(2));
      }
      onProgressRef.current?.(p, target);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      active = false;
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [clamp, cssVar, debugAttr, disabled, mode, reduced, targetRef]);

  return progressRef;
}
