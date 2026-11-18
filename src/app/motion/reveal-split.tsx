import type { CSSProperties, ElementType } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type RevealSplitProps = {
  text: string;
  /** `words` — Spector closing paragraph; `letters` — title over media. */
  by: "words" | "letters";
  as?: ElementType;
  id?: string;
  className?: string;
  /** Per-unit stagger (ms). */
  staggerMs?: number;
  delayMs?: number;
  threshold?: number;
};

/**
 * Splits text into words or letters that rise + fade in sequence when the
 * block enters view. The full string stays the accessible name; units are
 * presentational. Words keep their natural wrapping; letters stay within words.
 */
export function RevealSplit({
  text,
  by,
  as: Tag = "p",
  id,
  className = "",
  staggerMs = by === "words" ? 28 : 34,
  delayMs = 0,
  threshold = 0.3,
}: RevealSplitProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({ threshold, once: true });
  const visible = reduced || inView;
  const words = text.split(/\s+/).filter(Boolean);
  let index = 0;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`oveliq-split oveliq-split--${by}${visible ? " is-visible" : ""} ${className}`.trim()}
      aria-label={text}
      data-reduced={reduced ? "true" : undefined}
      style={
        {
          ["--split-stagger" as string]: `${staggerMs}ms`,
          ["--motion-delay" as string]: `${delayMs}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, w) => (
        <span key={`${w}-${word}`} className="oveliq-split__word" aria-hidden="true">
          {by === "words" ? (
            <span className="oveliq-split__unit" style={{ ["--i" as string]: index++ } as CSSProperties}>
              {word}
            </span>
          ) : (
            [...word].map((char, c) => (
              <span
                key={c}
                className="oveliq-split__unit"
                style={{ ["--i" as string]: index++ } as CSSProperties}
              >
                {char}
              </span>
            ))
          )}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
