import PageHero from "../components/page-hero";
import SiteLayout from "../components/site-layout";
import type { OveliqLegalPage } from "../content";
import "./pages.css";
import "./legal-page.css";

/** Privacy / Terms: shared plain-text layout under the inner-page hero. */
export default function LegalPage({ page }: { page: OveliqLegalPage }) {
  const { label, headlineLines, supporting, lastUpdated, sections } = page;

  return (
    <SiteLayout>
      <PageHero label={label} headlineLines={headlineLines} supporting={supporting} />
      <section className="oveliq-ip-section" aria-label={label.toLowerCase()}>
        <div className="oveliq-ip-inner">
          <article className="oveliq-legal">
            <p className="oveliq-legal__updated">Last updated: {lastUpdated}</p>
            {sections.map((section, index) => (
              <section className="oveliq-legal__section" key={section.heading}>
                <h2 className="oveliq-legal__heading">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span> {section.heading}
                </h2>
                <div className="oveliq-legal__body">
                  {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((text) => <li key={text}>{text}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
