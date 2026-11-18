import { useCallback, type RefObject } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { useScrollProgress, type ScrollProgressMode } from "./use-scroll-progress";

export type UseParallaxOptions = {
  /** Scales travel. Evidence: hero top ~0.5, bottom ~0.3 of scroll delta. */
  factor?: number;
  /** Pixel travel at progress 1 when factor = 1. */
  travel?: number;
  axis?: "y" | "x";
  disabled?: boolean;
  mode?: ScrollProgressMode;
};

/**
 * Writes --parallax-y / --parallax-x from scroll progress without React rerenders.
 * Pair with `.oveliq-parallax` outer wrapper; keep reveals on an inner child.
 */
export function useParallax<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: UseParallaxOptions = {},
) {
  const {
    factor = 1,
    travel = 120,
    axis = "y",
    disabled = false,
    mode = "contain",
  } = options;
  const reduced = usePrefersReducedMotion();

  const apply = useCallback(
    (p: number) => {
      const el = targetRef.current;
      if (!el) return;
      if (disabled || reduced) {
        el.style.setProperty("--parallax-x", "0px");
        el.style.setProperty("--parallax-y", "0px");
        el.setAttribute("data-reduced", "true");
        return;
      }
      el.removeAttribute("data-reduced");
      const dist = p * travel * factor;
      if (axis === "x") {
        el.style.setProperty("--parallax-x", `${dist.toFixed(2)}px`);
        el.style.setProperty("--parallax-y", "0px");
      } else {
        el.style.setProperty("--parallax-y", `${dist.toFixed(2)}px`);
        el.style.setProperty("--parallax-x", "0px");
      }
    },
    [axis, disabled, factor, reduced, targetRef, travel],
  );

  useScrollProgress(targetRef, {
    mode,
    disabled: disabled || reduced,
    onProgress: apply,
  });
}
