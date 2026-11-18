import { useEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export type UseInViewOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  /** Fire once then unobserve (default true). */
  once?: boolean;
  /** When reduced motion, treat as immediately visible (default true). */
  immediateWhenReduced?: boolean;
  disabled?: boolean;
};

/**
 * Shared IntersectionObserver helper for entrance reveals.
 * One observer instance per hook call (element-scoped) — prefer wrapping
 * groups rather than observing every word.
 */
export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -8% 0px",
    once = true,
    immediateWhenReduced = true,
    disabled = false,
  } = options;

  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) return;
    if (reduced && immediateWhenReduced) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setInView(true);
          if (once) io.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [disabled, immediateWhenReduced, once, reduced, rootMargin, threshold]);

  return [ref, inView];
}
