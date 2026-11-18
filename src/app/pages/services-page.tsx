import ArrowRight from "../components/arrow-right";
import CtaBand from "../components/cta-band";
import SectionManifesto from "../components/section-manifesto";
import SiteLayout from "../components/site-layout";
import { oveliqServicePages, oveliqServicesPage } from "../content";
import { Reveal } from "../motion";
import { serviceEditorialMedia } from "../service-media";
import "./pages.css";
import "./services-page.css";

/**
 * `/services` — Spector page grammar (giant title → index → one teaser row
 * per service linking to `/services/<id>` → manifesto + cards → CTA band).
 * Full service copy lives on the detail pages (`service-page.tsx`).
 */
export default function ServicesPage() {
  const { title, intro, indexLabel, included, cta } = oveliqServicesPage;
  const rows = oveliqServicePages;

  return (
    <SiteLayout>
      <section className="oveliq-ip-section oveliq-services-head" aria-labelledby="page-heading">
        <div className="oveliq-ip-inner">
          <Reveal as="div" trigger="load" y={30} scale={0.8} ease="pop" durationMs={650} style={{ transformOrigin: "0 100%" }}>
            <h1 id="page-heading" className="oveliq-ip-title">
              <span className="block">{title[0]}</span>
              <span className="block oveliq-ip-title__accent">{title[1]}</span>
            </h1>
          </Reveal>
          <Reveal as="div" className="oveliq-services-head__foot" trigger="load" y={40} ease="rise" durationMs={600} delayMs={60}>
            <p className="oveliq-ip-intro">{intro}</p>
            <a className="oveliq-services-head__contact" href="/pricing">Ways to work together <ArrowRight /></a>
          </Reveal>
          <div className="oveliq-ip-rule" aria-hidden="true" />
          <Reveal as="nav" className="oveliq-services-index" trigger="load" y={40} ease="rise" durationMs={600} delayMs={160}>
            <ol aria-label={indexLabel}>
              {rows.map(({ service }) => (
                <li key={service.id}>
                  <a href={`/services/${service.id}`} className="oveliq-services-index__link">
                    <span className="oveliq-services-index__num">{service.number}</span>
                    <span>{service.title}</span>
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="oveliq-ip-section" aria-label="All services">
        <ol className="oveliq-services-list">
          {rows.map(({ service, detail }, i) => {
            const media = serviceEditorialMedia(service.visual);
            return (
              /* `id` keeps legacy `/services#<id>` links landing on the right row. */
              <Reveal as="li" key={service.id} className="oveliq-services-list__item" y={30} ease="rise" durationMs={600} delayMs={(i % 3) * 80}>
                <a id={service.id} className="oveliq-services-list__link group" href={`/services/${service.id}`}>
                  <span className="oveliq-services-list__heading">
                    <span className="oveliq-services-list__num">{service.number}</span>
                    <span className="oveliq-services-list__title">{service.title}</span>
                  </span>
                  <span className="oveliq-services-list__lead">{detail.lead}</span>
                  <span className="oveliq-services-list__aside">
                    <span className="oveliq-services-list__media">
                      <img src={media.src} alt="" loading="lazy" decoding="async" width={1448} height={1086} />
                    </span>
                    <span className="oveliq-services-list__cta">
                      {oveliqServicesPage.exploreLabel} <ArrowRight />
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className="oveliq-ip-section oveliq-ip-section--surface" aria-labelledby="included-heading">
        <div className="oveliq-ip-inner">
          <SectionManifesto
            label={included.label}
            headlineId="included-heading"
            headlineLines={included.headlineLines}
          />
          <ol className="oveliq-services-included">
            {included.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.number}
                className="oveliq-services-included__item"
                y={40}
                ease="rise"
                durationMs={600}
                delayMs={i * 110}
              >
                <span className="oveliq-services-included__num" aria-hidden="true">
                  {item.number}/
                </span>
                <h3 className="oveliq-services-included__title">{item.title}</h3>
                <p className="oveliq-services-included__body">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        {/* Sample copy (e.g. "free discovery call") stays hidden until confirmed. */}
        {!cta.sample && <div className="oveliq-ip-cta">
          <CtaBand
            eyebrow={cta.eyebrow}
            statement={cta.statement}
            ctaLabel={cta.ctaLabel}
            ctaHref={cta.ctaHref}
            person={cta.person}
          />
        </div>}
      </section>
    </SiteLayout>
  );
}

