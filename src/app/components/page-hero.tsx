import type { ReactNode } from "react";
import { Reveal, RevealLines } from "../motion";
import "./page-hero.css";

type PageHeroProps = {
  label: string;
  tagline?: string;
  headlineLines: readonly string[];
  supporting?: string;
  /** Optional CTA row under the supporting copy. */
  children?: ReactNode;
};

/**
 * Inner-page opener (Spector page grammar): dark field under the fixed nav,
 * mark + label / tagline row, clipped display headline, supporting copy.
 * Last headline line takes the accent. Motion intensity: LOW (load-triggered).
 */
export default function PageHero({
  label,
  tagline,
  headlineLines,
  supporting,
  children,
}: PageHeroProps) {
  const lineClassNames = headlineLines.map((_, index) =>
    index === headlineLines.length - 1
      ? "oveliq-page-hero__line oveliq-page-hero__line--accent"
      : "oveliq-page-hero__line",
  );

  return (
    <section className="oveliq-page-hero" aria-labelledby="page-heading">
      <div className="oveliq-page-hero__inner">
        <Reveal as="div" className="oveliq-page-hero__meta" trigger="load" delayMs={120}>
          <p className="oveliq-page-hero__label" dir="auto">
            <span className="oveliq-page-hero__mark" aria-hidden="true" />
            {label}
          </p>
          {tagline ? (
            <p className="oveliq-page-hero__tagline" dir="auto">
              {tagline}
            </p>
          ) : null}
        </Reveal>

        <div className="oveliq-page-hero__rule" aria-hidden="true" />

        <RevealLines
          as="h1"
          id="page-heading"
          lines={headlineLines}
          className="oveliq-page-hero__headline"
          lineClassNames={lineClassNames}
          trigger="load"
          delayMs={200}
          aria-label={headlineLines.join(" ")}
        />

        {supporting || children ? (
          <Reveal as="div" className="oveliq-page-hero__foot" trigger="load" delayMs={420}>
            {supporting ? (
              <p className="oveliq-page-hero__supporting" dir="auto">
                {supporting}
              </p>
            ) : null}
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
