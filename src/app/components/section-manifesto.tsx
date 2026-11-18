import SectionLabel from "./section-label";
import { ManifestoLines, Reveal } from "../motion";

type SectionManifestoProps = {
  number?: string;
  label: string;
  labelId?: string;
  headlineId?: string;
  headlineLines: readonly string[];
  /** Small Japanese label (Spector grammar). */
  taglineJp?: string;
  /** Short English tagline opposite the section label. */
  tagline?: string;
  /** Optional supporting copy under the manifesto. */
  supporting?: string;
  className?: string;
  tone?: "on-light" | "on-dark";
};

/**
 * Shared Spector-style section intro:
 * mark + label (+ optional JP/EN tagline) → hairline manifesto headline.
 */
export default function SectionManifesto({
  number,
  label,
  labelId,
  headlineId,
  headlineLines,
  taglineJp,
  tagline,
  supporting,
  className = "",
  tone = "on-light",
}: SectionManifestoProps) {
  const hasTagline = Boolean(taglineJp || tagline);

  return (
    <header className={`oveliq-section-manifesto ${className}`.trim()}>
      <Reveal
        as="div"
        className="oveliq-section-manifesto__meta"
        delayMs={0}
        threshold={0.35}
        rootMargin="0px 0px -8% 0px"
      >
        <div className="oveliq-section-manifesto__meta-main">
          <div className="oveliq-section-manifesto__title-row">
            {number ? (
              <SectionLabel
                number={number}
                tone={tone}
                className="oveliq-section-manifesto__number"
              />
            ) : null}
            <span className="oveliq-section-manifesto__mark" aria-hidden="true" />
            <p
              id={labelId}
              className="oveliq-section-manifesto__label"
              dir="auto"
            >
              {label}
            </p>
          </div>
        </div>

        {hasTagline ? (
          <div className="oveliq-section-manifesto__tagline">
            {taglineJp ? (
              <p className="oveliq-section-manifesto__tagline-jp" lang="ja" dir="auto">
                <span className="oveliq-section-manifesto__tagline-mark" aria-hidden="true" />
                {taglineJp}
              </p>
            ) : null}
            {tagline ? (
              <p className="oveliq-section-manifesto__tagline-en" dir="auto">
                {tagline}
              </p>
            ) : null}
          </div>
        ) : null}
      </Reveal>

      <ManifestoLines
        as="h2"
        id={headlineId}
        lines={headlineLines}
        className="oveliq-section-manifesto__headline"
        aria-label={headlineLines.join(" ")}
        delayMs={0}
        staggerMs={100}
      />

      {supporting ? (
        <Reveal
          as="p"
          className="oveliq-section-manifesto__supporting"
          delayMs={200}
          threshold={0.3}
          rootMargin="0px 0px -8% 0px"
        >
          {supporting}
        </Reveal>
      ) : null}
    </header>
  );
}
