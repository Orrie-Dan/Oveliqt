import PillLink from "../components/pill-link";
import SectionManifesto from "../components/section-manifesto";
import { initials } from "../components/cta-band";
import { oveliqCaseStudy, type OveliqMetric } from "../content";
import { MediaReveal, Reveal } from "../motion";
import "./case-study.css";

/**
 * `/ 05 — CASE STUDY`
 * Featured project (media + story) beside a metrics panel and pull quote.
 * Motion intensity: MEDIUM (media reveal, staggered metrics).
 */
export default function CaseStudySection() {
  const {
    number,
    label,
    tagline,
    headlineLines,
    project,
    metricsLabel,
    metricsCaption,
    metrics,
    quote,
  } = oveliqCaseStudy;

  return (
    <section
      className="oveliq-case-study"
      id="case-study"
      aria-labelledby="case-study-heading"
    >
      <div className="oveliq-case-study__inner">
        <SectionManifesto
          number={number}
          label={label}
          headlineId="case-study-heading"
          headlineLines={headlineLines}
          tagline={tagline}
        />

        <div className="oveliq-case-study__layout">
          <article className="oveliq-case-study__project">
            <MediaReveal className="oveliq-case-study__media" scaleFrom={1.12}>
              <img
                className="oveliq-case-study__img"
                src={project.mediaSrc}
                alt={project.mediaAlt}
                loading="lazy"
              />
            </MediaReveal>
            <Reveal className="oveliq-case-study__story" delayMs={80}>
              <p className="oveliq-case-study__client">
                <span className="oveliq-case-study__client-mark" aria-hidden="true" />
                {project.client}
                <span className="oveliq-case-study__category">
                  {project.category}
                </span>
              </p>
              <h3 className="oveliq-case-study__title" dir="auto">
                {project.title}
              </h3>
              <p className="oveliq-case-study__desc" dir="auto">
                {project.description}
              </p>
              <PillLink href={project.ctaHref} label={project.ctaLabel} />
            </Reveal>
          </article>

          <div className="oveliq-case-study__aside">
            <Reveal className="oveliq-case-study__metrics" delayMs={60} threshold={0.15}>
              <div className="oveliq-case-study__metrics-head">
                <p className="oveliq-case-study__metrics-label">{metricsLabel}</p>
                <p className="oveliq-case-study__metrics-caption">{metricsCaption}</p>
              </div>
              <ul className="oveliq-case-study__metric-list">
                {metrics.map((metric) => (
                  <MetricItem key={metric.label} metric={metric} />
                ))}
              </ul>
            </Reveal>

            <Reveal as="figure" className="oveliq-case-study__quote" delayMs={140}>
              <span className="oveliq-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote className="oveliq-case-study__quote-text" dir="auto">
                {quote.text}
              </blockquote>
              <figcaption className="oveliq-case-study__quote-author">
                <span className="oveliq-case-study__avatar" aria-hidden="true">
                  {initials(quote.name)}
                </span>
                <span>
                  <span className="oveliq-case-study__quote-name">{quote.name}</span>
                  <span className="oveliq-case-study__quote-role">{quote.role}</span>
                </span>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricItem({ metric }: { metric: OveliqMetric }) {
  return (
    <li className="oveliq-metric">
      <p className="oveliq-metric__value">
        {metric.value}
        {metric.suffix ? (
          <span className="oveliq-metric__suffix">{metric.suffix}</span>
        ) : null}
      </p>
      <p className="oveliq-metric__label" dir="auto">
        {metric.label}
      </p>
    </li>
  );
}
