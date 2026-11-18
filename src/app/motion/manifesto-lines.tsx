import type { CSSProperties, ElementType } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type ManifestoLinesProps = {
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Accessible name when lines alone are incomplete. */
  "aria-label"?: string;
  /** Base delay before first line reveal (ms). Spector ≈ 0. */
  delayMs?: number;
  /** Per-line stagger (ms). Spector ≈ 100. */
  staggerMs?: number;
};

/**
 * Spector manifesto typography + appear.
 *
 * Measured on https://spector.framer.website/ (1440):
 *   font 90px / lh 87.3 / tracking -4.5px
 *   appear: opacity 0→1 + translateX(40px→0), ~500ms, ~100ms stagger
 *   colors: early lines #ADADAD, later #262A2D (static)
 *   hairline rows with 100px indent steps
 */
export function ManifestoLines({
  lines,
  as: Tag = "div",
  id,
  className = "",
  "aria-label": ariaLabel,
  delayMs = 0,
  staggerMs = 100,
}: ManifestoLinesProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  const visible = reduced || inView;
  const indentPattern = [0, 1, 2, 1, 0, 1] as const;
  const solidFrom = Math.max(1, Math.ceil(lines.length / 2));

  return (
    <Tag
      ref={ref}
      id={id}
      className={`oveliq-manifesto${visible ? " is-visible" : ""} ${className}`.trim()}
      style={
        {
          ["--motion-delay" as string]: `${delayMs}ms`,
          ["--motion-stagger" as string]: `${staggerMs}ms`,
        } as CSSProperties
      }
      data-oveliq-motion="manifesto-lines"
      data-reduced={reduced ? "true" : undefined}
      {...(ariaLabel ? { "aria-label": ariaLabel } : null)}
    >
      {lines.map((line, i) => {
        const indent = indentPattern[i % indentPattern.length];
        const tone = i < solidFrom ? "muted" : "solid";
        return (
          <span
            key={`${i}-${line}`}
            className={`oveliq-manifesto__row oveliq-manifesto__row--${tone}`}
            style={
              {
                ["--manifesto-indent" as string]: String(indent),
                ["--motion-stagger-index" as string]: i,
              } as CSSProperties
            }
          >
            {indent > 0 ? (
              <span className="oveliq-manifesto__spacer" aria-hidden="true" />
            ) : null}
            <span className="oveliq-manifesto__line">
              <span className="oveliq-manifesto__text">{line}</span>
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
