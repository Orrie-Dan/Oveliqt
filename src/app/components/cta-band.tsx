import PillLink from "./pill-link";
import type { OveliqContactPerson } from "../content";
import { Reveal } from "../motion";
import "./cta-band.css";

type CtaBandProps = {
  eyebrow: string;
  statement: string;
  ctaLabel: string;
  ctaHref: string;
  person?: OveliqContactPerson;
  className?: string;
};

/**
 * Conversion band: eyebrow + statement + pill CTA, with an optional
 * "who you'll talk to" contact on the right.
 * Motion intensity: LOW.
 */
export default function CtaBand({
  eyebrow,
  statement,
  ctaLabel,
  ctaHref,
  person,
  className = "",
}: CtaBandProps) {
  return (
    <Reveal
      as="aside"
      className={`oveliq-cta-band ${className}`.trim()}
      threshold={0.25}
    >
      <div className="oveliq-cta-band__main">
        <p className="oveliq-cta-band__eyebrow" dir="auto">
          {eyebrow}
        </p>
        <p className="oveliq-cta-band__statement" dir="auto">
          {statement}
        </p>
        <PillLink href={ctaHref} label={ctaLabel} />
      </div>

      {person && !person.sample ? (
        <div className="oveliq-cta-band__person">
          <p className="oveliq-cta-band__brand" aria-hidden="true">
            OVELIQT<span className="oveliq-cta-band__brand-dot">°</span>
          </p>
          <div className="oveliq-cta-band__person-row">
            {person.imageSrc ? (
              <img
                className="oveliq-cta-band__avatar"
                src={person.imageSrc}
                alt=""
              />
            ) : (
              <span className="oveliq-cta-band__avatar" aria-hidden="true">
                {initials(person.name)}
              </span>
            )}
            <div>
              <p className="oveliq-cta-band__name">{person.name}</p>
              <p className="oveliq-cta-band__role">{person.role}</p>
            </div>
          </div>
        </div>
      ) : null}
    </Reveal>
  );
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
