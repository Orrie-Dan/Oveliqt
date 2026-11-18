import { useState } from "react";
import ArrowRight from "../components/arrow-right";
import CtaBand from "../components/cta-band";
import ProjectCard from "../components/project-card";
import SectionManifesto from "../components/section-manifesto";
import SiteLayout from "../components/site-layout";
import {
  findProjectDetail,
  findServicePage,
  oveliqServicePages,
  oveliqServicesPage,
  oveliqSolutionPricing,
  type OveliqServicePage,
} from "../content";
import { enquiryHref } from "../enquiry-links";
import { Reveal } from "../motion";
import { FaqRow } from "../sections/faq-section";
import { serviceEditorialMedia } from "../service-media";
import "../sections/faq.css";
import "./pages.css";
import "./service-page.css";

/**
 * `/services/<id>` — one page per service: hero → editorial media → overview →
 * capabilities → deliverables / fit → approach → case studies → starting
 * point → FAQ → paired services → CTA → pager. Copy lives in
 * `oveliqServicesPage.details`; sections with no content are skipped.
 */
export default function ServicePage({ page }: { page: OveliqServicePage }) {
  const { service, detail } = page;
  const labels = oveliqServicesPage.detailLabels;
  const media = serviceEditorialMedia(service.visual);
  const projects = detail.relatedProjects.flatMap((slug) => {
    const project = findProjectDetail(slug);
    return project && !("sample" in project && project.sample) ? [project] : [];
  });
  const pairs = detail.pairsWith.flatMap((id) => findServicePage(id) ?? []);
  const start = oveliqSolutionPricing.solutions[detail.startingPoint];
  const contactHref = enquiryHref(detail.enquiry);

  const index = oveliqServicePages.findIndex((item) => item.service.id === service.id);
  const count = oveliqServicePages.length;
  const previous = oveliqServicePages[(index - 1 + count) % count];
  const next = oveliqServicePages[(index + 1) % count];

  /* Section numbers follow the sections that actually render. */
  let sectionNumber = 0;
  const label = (text: string) => `${String(++sectionNumber).padStart(2, "0")} / ${text}`;

  return (
    <SiteLayout>
      <section className="oveliq-ip-section oveliq-svc-page-head" aria-labelledby="page-heading">
        <div className="oveliq-ip-inner">
          <Reveal as="div" trigger="load" y={20} ease="rise" durationMs={500}>
            <nav className="oveliq-svc-page-crumb" aria-label="Breadcrumb">
            <a href="/services">{labels.breadcrumb}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              {service.number} — {service.title}
            </span>
            </nav>
          </Reveal>
          <Reveal as="div" trigger="load" y={30} scale={0.8} ease="pop" durationMs={650} style={{ transformOrigin: "0 100%" }}>
            <h1 id="page-heading" className="oveliq-ip-title">
              {service.displayLines.map((line, i) => (
                <span key={line} className={`block${i === service.displayLines.length - 1 ? " oveliq-ip-title__accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal as="div" className="oveliq-svc-page-head__foot" trigger="load" y={40} ease="rise" durationMs={600} delayMs={60}>
            <p className="oveliq-svc-page-head__lead">{detail.lead}</p>
            <div className="oveliq-svc-page-head__side">
              <p className="oveliq-ip-intro">{service.description}</p>
              <div className="oveliq-svc-page-head__actions">
                <a className="oveliq-svc-page-btn oveliq-svc-page-btn--primary" href={contactHref}>
                  {labels.primaryCta} <ArrowRight />
                </a>
                {projects.length > 0 ? (
                  <a className="oveliq-svc-page-btn" href="#proof">
                    {labels.proofCta}
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
          <Reveal as="div" trigger="load" y={20} ease="rise" durationMs={600} delayMs={160}>
            <ul className="oveliq-svc-page-tags" aria-label="Capabilities">
              {service.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <figure className="oveliq-svc-page-media">
        <div className="oveliq-svc-page-media__frame">
          <img src={media.src} alt={media.alt} width={1448} height={1086} fetchPriority="high" decoding="async" />
        </div>
      </figure>

      <section className="oveliq-ip-section" aria-labelledby="overview-heading">
        <div className="oveliq-ip-inner oveliq-svc-page-overview">
          <p className="oveliq-ip-eyebrow">{label(labels.overview)}</p>
          <div className="oveliq-svc-page-overview__body">
            <Reveal as="div" y={20} ease="rise" durationMs={600}>
              <h2 id="overview-heading" className="oveliq-svc-page-statement">
                {detail.overviewHeadline}
              </h2>
            </Reveal>
            <Reveal as="div" className="oveliq-ip-story__body" y={20} ease="rise" durationMs={600} delayMs={110}>
              {detail.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {detail.capabilityNotes.length > 0 ? (
        <section className="oveliq-ip-section oveliq-ip-section--surface" aria-labelledby="build-heading">
          <div className="oveliq-ip-inner">
            <SectionManifesto label={label(labels.build)} headlineId="build-heading" headlineLines={labels.buildHeadline} />
            <ol className="oveliq-svc-page-caps">
              {detail.capabilityNotes.map((item, i) => (
                <Reveal as="li" key={item.title} className="oveliq-svc-page-caps__item" y={30} ease="rise" durationMs={600} delayMs={(i % 3) * 90}>
                  <span className="oveliq-svc-page-caps__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}/
                  </span>
                  <h3 className="oveliq-svc-page-caps__title">{item.title}</h3>
                  <p className="oveliq-svc-page-caps__body">{item.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="oveliq-ip-section" aria-labelledby="outcomes-heading">
        <div className="oveliq-ip-inner">
          <p className="oveliq-ip-eyebrow" id="outcomes-heading">
            {label(labels.outcomes)}
          </p>
          <div className="oveliq-svc-page-lists">
            <OutcomeList title={oveliqServicesPage.deliverablesLabel} items={detail.deliverables} numbered />
            <OutcomeList title={oveliqServicesPage.goodForLabel} items={detail.goodFor} />
          </div>
        </div>
      </section>

      {detail.approach.length > 0 ? (
        <section className="oveliq-ip-section oveliq-ip-section--dark" aria-labelledby="approach-heading">
          <div className="oveliq-ip-inner">
            <SectionManifesto
              label={label(labels.approach)}
              headlineId="approach-heading"
              headlineLines={labels.approachHeadline}
              tone="on-dark"
            />
            <ol className="oveliq-svc-page-steps">
              {detail.approach.map((step, i) => (
                <Reveal as="li" key={step.title} className="oveliq-svc-page-steps__item" y={30} ease="rise" durationMs={600} delayMs={i * 100}>
                  <span className="oveliq-svc-page-steps__num">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="oveliq-svc-page-steps__title">{step.title}</h3>
                  <p className="oveliq-svc-page-steps__body">{step.body}</p>
                </Reveal>
              ))}
            </ol>
            {detail.stack?.length ? (
              <div className="oveliq-svc-page-stack">
                <p className="oveliq-svc-page-stack__label">{labels.stack}</p>
                <ul>
                  {detail.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="oveliq-ip-section oveliq-svc-page-proof" id="proof" aria-labelledby="proof-heading">
          <div className="oveliq-ip-inner oveliq-svc-page-proof__head">
            <div>
              <p className="oveliq-ip-eyebrow">{label(labels.proof)}</p>
              <h2 id="proof-heading" className="oveliq-svc-page-h2">
                {service.title} in practice
              </h2>
            </div>
            <a className="oveliq-svc-page-textlink" href="/work">
              {labels.allWork} <ArrowRight />
            </a>
          </div>
          <div className={`oveliq-svc-page-proof__grid${projects.length === 1 ? " is-single" : ""}`}>
            {projects.slice(0, 4).map((project, i) => (
              <Reveal key={project.slug} as="div" y={40} ease="rise" durationMs={600} delayMs={(i % 2) * 110}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {start ? (
        <section className="oveliq-ip-section" aria-labelledby="start-heading">
          <div className="oveliq-ip-inner">
            <Reveal as="div" className="oveliq-svc-page-start" y={20} ease="rise" durationMs={600}>
              <div>
                <p className="oveliq-ip-eyebrow">{labels.start}</p>
                <h2 id="start-heading" className="oveliq-svc-page-start__title">
                  {start.startingScope}
                </h2>
                <p className="oveliq-svc-page-start__desc">{start.description}</p>
              </div>
              <ul className="oveliq-svc-page-start__list">
                {start.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="oveliq-svc-page-btn" href="/pricing">
                {labels.startCta} <ArrowRight />
              </a>
            </Reveal>
          </div>
        </section>
      ) : null}

      {detail.faqs.length > 0 ? <ServiceFaq serviceId={service.id} title={service.title} heading={label(labels.faq)} faqs={detail.faqs} /> : null}

      {pairs.length > 0 ? (
        <section className="oveliq-ip-section oveliq-ip-section--surface" aria-labelledby="pairs-heading">
          <div className="oveliq-ip-inner">
            <p className="oveliq-ip-eyebrow" id="pairs-heading">
              {label(labels.pairs)}
            </p>
            <div className="oveliq-svc-page-pairs">
              {pairs.map(({ service: pair, detail: pairDetail }, i) => {
                const pairMedia = serviceEditorialMedia(pair.visual);
                return (
                  <Reveal key={pair.id} as="div" y={30} ease="rise" durationMs={600} delayMs={i * 110}>
                    <a className="oveliq-svc-page-pair group" href={`/services/${pair.id}`}>
                      <span className="oveliq-svc-page-pair__media">
                        <img src={pairMedia.src} alt="" loading="lazy" decoding="async" width={1448} height={1086} />
                      </span>
                      <span className="oveliq-svc-page-pair__num">/ {pair.number}</span>
                      <span className="oveliq-svc-page-pair__title">
                        {pair.title} <ArrowRight />
                      </span>
                      <span className="oveliq-svc-page-pair__lead">{pairDetail.lead}</span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="oveliq-ip-section oveliq-ip-section--surface oveliq-svc-page-end" aria-label="Next steps">
        <div className="oveliq-ip-cta">
          <CtaBand
            eyebrow={labels.ctaEyebrow}
            statement={`Have a ${service.title.toLowerCase()} project in mind? Tell us what you're trying to build.`}
            ctaLabel={labels.ctaLabel}
            ctaHref={contactHref}
          />
        </div>
        <nav className="oveliq-svc-page-pager" aria-label="Other services">
          <a href={`/services/${previous.service.id}`} className="oveliq-svc-page-pager__link">
            <span className="oveliq-ip-eyebrow">
              ← {labels.previous} · {previous.service.number}
            </span>
            <span className="oveliq-svc-page-pager__name">{previous.service.title}</span>
          </a>
          <a href={`/services/${next.service.id}`} className="oveliq-svc-page-pager__link oveliq-svc-page-pager__link--next">
            <span className="oveliq-ip-eyebrow">
              {labels.next} · {next.service.number} →
            </span>
            <span className="oveliq-svc-page-pager__name">{next.service.title}</span>
          </a>
        </nav>
      </section>
    </SiteLayout>
  );
}

function OutcomeList({ title, items, numbered = false }: { title: string; items: readonly string[]; numbered?: boolean }) {
  return (
    <Reveal as="div" className="oveliq-svc-page-list" y={20} ease="rise" durationMs={600}>
      <h2 className="oveliq-svc-page-list__title">{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={item}>
            <span className="oveliq-svc-page-list__mark" aria-hidden="true">
              {numbered ? String(i + 1).padStart(2, "0") : "→"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function ServiceFaq({
  serviceId,
  title,
  heading,
  faqs,
}: {
  serviceId: string;
  title: string;
  heading: string;
  faqs: OveliqServicePage["detail"]["faqs"];
}) {
  const items = faqs.map((faq, i) => ({ id: `${serviceId}-faq-${i}`, ...faq }));
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  return (
    <section className="oveliq-ip-section" aria-labelledby="faq-heading">
      <div className="oveliq-ip-inner oveliq-svc-page-faq">
        <div>
          <p className="oveliq-ip-eyebrow">{heading}</p>
          <h2 id="faq-heading" className="oveliq-svc-page-h2">
            {title}, answered
          </h2>
        </div>
        <ul className="oveliq-faq__list">
          {items.map((item) => (
            <FaqRow
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
