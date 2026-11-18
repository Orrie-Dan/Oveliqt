import { useEffect, useState } from "react";

/**
 * Client-safe prefers-reduced-motion subscription.
 * Defaults to `false` until mounted (animations may briefly arm, then settle).
 * For CSS-only effects, prefer `@media (prefers-reduced-motion: reduce)`.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
