import { useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Extra delay before transition (ms). */
  delayMs?: number;
  /** Stagger index for sibling sequencing. */
  staggerIndex?: number;
  trigger?: "view" | "load" | "none";
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  /** Entrance offset in px (default --reveal-distance-sm). */
  y?: number;
  /** Entrance scale (default 1). */
  scale?: number;
  /** Override --motion-reveal. */
  durationMs?: number;
  /**
   * `rise` — Spector inner-page ease-out cubic (~600ms rows / blocks).
   * `pop` — Spector near-critical spring (scale + rise titles).
   * Default keeps `--ease-editorial`.
   */
  ease?: "rise" | "pop";
};

const easeVar = { rise: "var(--ease-rise)", pop: "var(--ease-pop)" } as const;

/**
 * Lightweight opacity + translateY entrance for labels, copy, CTAs.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  delayMs = 0,
  staggerIndex = 0,
  trigger = "view",
  threshold = 0.2,
  rootMargin,
  once = true,
  y,
  scale,
  durationMs,
  ease,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const [loadReady, setLoadReady] = useState(trigger !== "load");
  const [ref, inView] = useInView<HTMLElement>({
    threshold,
    rootMargin,
    once,
    disabled: trigger === "none" || trigger === "load",
  });

  useEffect(() => {
    if (trigger !== "load") return;
    const id = requestAnimationFrame(() => setLoadReady(true));
    return () => cancelAnimationFrame(id);
  }, [trigger]);

  const visible =
    reduced ||
    trigger === "none" ||
    (trigger === "load" ? loadReady : inView);

  return (
    <Tag
      ref={ref}
      className={`oveliq-reveal${visible ? " is-visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          ["--motion-delay" as string]: `${delayMs}ms`,
          ["--motion-stagger-index" as string]: staggerIndex,
          ...(y != null ? { ["--reveal-y" as string]: `${y}px` } : null),
          ...(scale != null ? { ["--reveal-scale" as string]: String(scale) } : null),
          ...(durationMs != null ? { ["--reveal-duration" as string]: `${durationMs}ms` } : null),
          ...(ease ? { ["--reveal-ease" as string]: easeVar[ease] } : null),
        } as CSSProperties
      }
      data-oveliq-motion="reveal"
      data-reduced={reduced ? "true" : undefined}
    >
      {children}
    </Tag>
  );
}
