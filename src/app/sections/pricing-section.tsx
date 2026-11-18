import CtaBand from "../components/cta-band";
import PillLink from "../components/pill-link";
import SectionManifesto from "../components/section-manifesto";
import {
  oveliqCtaBands,
  oveliqPricing,
  type OveliqPricingTier,
} from "../content";
import { Reveal } from "../motion";
import "./pricing.css";

/**
 * `/ 07 — ENGAGEMENTS`
 * Horizontal tier rows: cover · name/price · checklist · CTA, then a CTA band.
 * Motion intensity: LOW.
 */
export default function PricingSection() {
  const { number, label, tagline, headlineLines, supporting, tiers } =
    oveliqPricing;
  const band = oveliqCtaBands.pricing;

  return (
    <section
      className="oveliq-pricing"
      id="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="oveliq-pricing__inner">
        <SectionManifesto
          number={number}
          label={label}
          headlineId="pricing-heading"
          headlineLines={headlineLines}
          tagline={tagline}
          supporting={supporting}
        />

        <ul className="oveliq-pricing__list">
          {tiers.map((tier, i) => (
            <Reveal
              as="li"
              key={tier.id}
              className="oveliq-pricing__item"
              delayMs={i * 60}
              threshold={0.15}
            >
              <PricingTier tier={tier} />
            </Reveal>
          ))}
        </ul>

        <CtaBand
          eyebrow={band.eyebrow}
          statement={band.statement}
          ctaLabel={band.ctaLabel}
          ctaHref={band.ctaHref}
          person={band.person}
        />
      </div>
    </section>
  );
}

function PricingTier({ tier }: { tier: OveliqPricingTier }) {
  return (
    <article
      className="oveliq-tier"
      data-featured={tier.featured ? "true" : undefined}
      aria-labelledby={`tier-${tier.id}`}
    >
      <div className="oveliq-tier__cover" aria-hidden="true">
        <span className="oveliq-tier__cover-name">{tier.name}</span>
        <span className="oveliq-tier__cover-bars" />
      </div>

      <div className="oveliq-tier__head">
        <h3 id={`tier-${tier.id}`} className="oveliq-tier__name">
          {tier.name}
        </h3>
        <p className="oveliq-tier__price">
          {tier.pricePrefix ? (
            <span className="oveliq-tier__price-prefix">{tier.pricePrefix}</span>
          ) : null}
          {tier.price}
        </p>
        <p className="oveliq-tier__meta">
          <span className="oveliq-tier__badge">{tier.badge}</span>
          <span>Duration: {tier.duration}</span>
        </p>
        <p className="oveliq-tier__summary" dir="auto">
          {tier.summary}
        </p>
      </div>

      <ul className="oveliq-tier__features">
        {tier.features.map((feature) => (
          <li key={feature} className="oveliq-tier__feature">
            <svg
              className="oveliq-tier__check"
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="oveliq-tier__cta">
        <PillLink
          href={tier.ctaHref}
          label={tier.ctaLabel}
          tone={tier.featured ? "accent" : "light"}
        />
        <p className="oveliq-tier__cta-note" dir="auto">
          {tier.ctaNote}
        </p>
      </div>
    </article>
  );
}
