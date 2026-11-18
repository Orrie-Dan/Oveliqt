import type { CSSProperties } from "react";
import { useInView } from "./hooks/use-in-view";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type RollingNumberProps = {
  value: string;
  className?: string;
  /** Delay before the first digit rolls (ms). */
  delayMs?: number;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Spector odometer: each digit is a 0–9 column that rolls to its value when
 * the number enters view. Non-digit characters render static.
 * The real value is the accessible text; columns are presentational.
 */
export function RollingNumber({ value, className = "", delayMs = 0 }: RollingNumberProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4, once: true });
  const rolled = reduced || inView;

  return (
    <span
      ref={ref}
      className={`oveliq-rolling ${rolled ? "is-rolled" : ""} ${className}`.trim()}
      data-reduced={reduced ? "true" : undefined}
    >
      <span className="sr-only">{value}</span>
      <span className="oveliq-rolling__digits" aria-hidden="true">
        {[...value].map((char, i) =>
          /\d/.test(char) ? (
            <span key={i} className="oveliq-rolling__window">
              <span
                className="oveliq-rolling__column"
                style={
                  {
                    ["--digit" as string]: Number(char),
                    ["--motion-delay" as string]: `${delayMs + i * 90}ms`,
                  } as CSSProperties
                }
              >
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{char}</span>
          ),
        )}
      </span>
    </span>
  );
}
