import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  mediaClassName?: string;
  style?: CSSProperties;
  /** Override --media-scale-enter (e.g. 1.4 for hero). */
  scaleFrom?: number;
  /** Optional entrance translateY in px (e.g. 24). Settles to 0. */
  yFrom?: number;
  transformOrigin?: string;
  delayMs?: number;
  trigger?: "view" | "load" | "none";
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Overflow-clipped media entrance: scale(enter) → scale(1) + opacity.
 * Optional yFrom adds a calm vertical settle. Tune scaleFrom per surface —
 * do not default every image to 1.4.
 */
export function MediaReveal({
  children,
  className = "",
  mediaClassName = "",
  style,
  scaleFrom,
  yFrom,
  transformOrigin = "center center",
  delayMs = 0,
  trigger = "view",
  threshold = 0.2,
  rootMargin,
  once = true,
}: MediaRevealProps) {
  const reduced = usePrefersReducedMotion();
  const [loadReady, setLoadReady] = useState(trigger !== "load");
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    disabled: trigger === "none" || trigger === "load",
  });

  useEffect(() => {
    if (trigger !== "load") return;
    // One frame so the enlarged start state can paint before the settle.
    const id = requestAnimationFrame(() => setLoadReady(true));
    return () => cancelAnimationFrame(id);
  }, [trigger]);

  const visible =
    reduced ||
    trigger === "none" ||
    (trigger === "load" ? loadReady : inView);

  return (
    <div
      ref={ref}
      className={`oveliq-media-reveal${visible ? " is-visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          ["--motion-delay" as string]: `${delayMs}ms`,
          ...(scaleFrom != null
            ? { ["--media-scale-enter" as string]: String(scaleFrom) }
            : null),
          ...(yFrom != null
            ? { ["--media-y-enter" as string]: `${yFrom}px` }
            : null),
        } as CSSProperties
      }
      data-oveliq-motion="media-reveal"
      data-reduced={reduced ? "true" : undefined}
    >
      <div
        className={`oveliq-media-reveal__media ${mediaClassName}`.trim()}
        style={{ transformOrigin }}
      >
        {children}
      </div>
    </div>
  );
}
