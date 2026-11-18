import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type RevealLinesProps = {
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClassName?: string;
  /** Per-line classes for scale, indent, and accent. Index-aligned with `lines`. */
  lineClassNames?: readonly string[];
  style?: CSSProperties;
  /** Base delay before first line (ms). */
  delayMs?: number;
  /** Override CSS --motion-stagger (ms). */
  staggerMs?: number;
  trigger?: "view" | "load" | "none";
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  /** Accessible name when lines alone are incomplete. */
  "aria-label"?: string;
  children?: ReactNode;
};

/**
 * Clipped editorial line reveal — overflow-hidden masks, translateY 100% → 0.
 * Does not split letters; each line is a coherent text node.
 */
export function RevealLines({
  lines,
  as: Tag = "div",
  id,
  className = "",
  lineClassName = "",
  lineClassNames,
  style,
  delayMs = 0,
  staggerMs,
  trigger = "view",
  threshold = 0.2,
  rootMargin,
  once = true,
  "aria-label": ariaLabel,
}: RevealLinesProps) {
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
    // Defer one frame so CSS initial state can paint before reveal.
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
      id={id}
      className={`oveliq-reveal-lines${visible ? " is-visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          ["--motion-delay" as string]: `${delayMs}ms`,
          ...(staggerMs != null
            ? { ["--motion-stagger" as string]: `${staggerMs}ms` }
            : null),
        } as CSSProperties
      }
      data-oveliq-motion="reveal-lines"
      data-reduced={reduced ? "true" : undefined}
      {...(ariaLabel ? { "aria-label": ariaLabel } : null)}
    >
      {lines.map((line, i) => (
        <span
          key={`${i}-${line}`}
          className={`oveliq-reveal-line ${lineClassNames?.[i] ?? ""} ${lineClassName}`.trim()}
          style={{ ["--motion-stagger-index" as string]: i } as CSSProperties}
        >
          <span className="oveliq-reveal-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
