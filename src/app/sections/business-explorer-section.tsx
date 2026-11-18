import SectionManifesto from "../components/section-manifesto";
import { oveliqForYourBusiness, oveliqBusinessNeeds } from "../content";
import { enquiryHref } from "../enquiry-links";
import { Reveal } from "../motion";
import "./business.css";

export default function BusinessExplorerSection() {
  const { number, label, tagline, headlineLines, supporting } = oveliqForYourBusiness;
  return <section className="oveliq-business" id="business" aria-labelledby="business-heading">
    <div className="oveliq-business__inner">
      <SectionManifesto number={number} label={label} headlineId="business-heading" headlineLines={headlineLines} tagline={tagline} supporting={supporting} />
      <div className="business-conversations">
        {oveliqBusinessNeeds.map((need, index) => <Reveal key={need.id} threshold={0.1}>
          <details className="business-conversation">
            <summary>
              <span className="business-conversation__number" aria-hidden="true">/ 0{index + 1}</span>
              <div className="business-conversation__copy">
                <h3>{need.need}</h3>
                <p>{need.solution}</p>
                <span className="business-conversation__prompt"><span className="business-conversation__closed">Sound familiar? See how we can help</span><span className="business-conversation__opened">Close example</span></span>
              </div>
              <span className="business-conversation__toggle" aria-hidden="true">+</span>
            </summary>
            <div className="business-conversation__detail">
              <p className="business-conversation__eyebrow">FOR EXAMPLE</p>
              <p className="business-conversation__scenario">{need.scenario}</p>
              <p>{need.build}</p>
              <a className="business-conversation__cta" href={enquiryHref(need.service)}>{need.cta} <span aria-hidden="true">↗</span></a>
              {"project" in need && <a className="business-conversation__project" href={`/work/${need.project}`}>{need.projectLabel} <span aria-hidden="true">↗</span></a>}
            </div>
          </details>
        </Reveal>)}
      </div>
      <div className="business-conversations__outro"><p>Something else holding you back?</p><a href={enquiryHref("custom")}>Tell us what’s on your mind <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
