import SectionManifesto from "../components/section-manifesto";
import { oveliqAbout, type OveliqFounder } from "../content";
import { Reveal } from "../motion";
import PillLink from "../components/pill-link";
import "./about.css";

/**
 * `/ 05 — ABOUT`
 * Human / rest section after technical Capabilities.
 * Founder media: abstract placeholders until real portraits exist.
 * Motion intensity: LOW.
 */
export default function AboutSection() {
  const {
    number,
    label,
    tagline,
    headlineLines,
    paragraphs,
    founders,
  } = oveliqAbout;

  return (
    <section
      className="oveliq-about"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="oveliq-about__inner">
        <SectionManifesto
          number={number}
          label={label}
          headlineId="about-heading"
          headlineLines={headlineLines}
          tagline={tagline}
        />

        <div className="oveliq-about__layout">
          <Reveal className="oveliq-about__paragraphs" delayMs={80}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="oveliq-about__paragraph" dir="auto">
                {paragraph}
              </p>
            ))}
          </Reveal>

          {founders.length > 0 ? <Reveal className="oveliq-about__founders" delayMs={100} threshold={0.12}>
            {founders.map((founder, index) => (
              <FounderCard
                key={founder.id}
                founder={founder}
                variant={index === 0 ? "a" : "b"}
              />
            ))}
          </Reveal> : <Reveal className="oveliq-studio-note" delayMs={100}>
            <span className="oveliq-studio-note__mark" aria-hidden="true">O*</span>
            <p className="oveliq-studio-note__label">Design. Engineering. Intelligence.</p>
            <p className="oveliq-studio-note__text">From the first question to the final detail, we bring the thinking and the building together.</p>
            <PillLink href="/about" label="Meet the studio" />
          </Reveal>}
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  founder,
  variant,
}: {
  founder: OveliqFounder;
  variant: "a" | "b";
}) {
  const hasImage = Boolean(founder.imageSrc);
  const displayName = founder.name?.trim();
  const displayRole = founder.role?.trim();
  const displayBio = founder.bio?.trim();
  const links = founder.links?.filter((l) => l.href && l.label) ?? [];
  const placeholderLabel = `Founder ${String(founder.slot).padStart(2, "0")}`;

  return (
    <article
      className={`oveliq-founder-card oveliq-founder-card--${variant}`}
      data-founder-slot={founder.slot}
      data-founder-aspect="3 / 4"
    >
      <div className="oveliq-founder-card__media" aria-hidden={hasImage ? undefined : true}>
        {hasImage ? (
          <img
            className="oveliq-founder-card__photo"
            src={founder.imageSrc}
            alt={founder.imageAlt?.trim() || displayName || placeholderLabel}
          />
        ) : (
          <div className="oveliq-founder-card__placeholder">
            <div className="oveliq-founder-card__grid" />
            <p className="oveliq-founder-card__index">
              {String(founder.slot).padStart(2, "0")}
            </p>
          </div>
        )}
      </div>

      <div className="oveliq-founder-card__meta">
        <div className="oveliq-founder-card__meta-rule" aria-hidden="true" />
        {displayName ? (
          <h3 className="oveliq-founder-card__name" dir="auto">
            {displayName}
          </h3>
        ) : (
          <p className="oveliq-founder-card__placeholder-label" dir="auto">
            {placeholderLabel}
          </p>
        )}
        {displayRole ? (
          <p className="oveliq-founder-card__role" dir="auto">
            {displayRole}
          </p>
        ) : null}
        {displayBio ? (
          <p className="oveliq-founder-card__bio" dir="auto">
            {displayBio}
          </p>
        ) : null}
        {links.length > 0 ? (
          <ul className="oveliq-founder-card__links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="oveliq-founder-card__link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
