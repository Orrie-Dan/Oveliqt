import { oveliqSolutionPricing } from "../content";
import ArrowRight from "./arrow-right";
import { enquiryHref, type EnquiryService } from "../enquiry-links";

const enquiryChoices: EnquiryService[] = ["website", "product", "automation"];

const solutionBenefits: { category: string; outcome: string; fit: string; cta: string }[] = [
  { category: "Establish your presence", outcome: "A website that turns interest into enquiries.", fit: "For a new business, a launch or a website ready for a refresh.", cta: "Enquire about a website" },
  { category: "Build your product", outcome: "A useful first version, built around your users.", fit: "For founders and teams with a specific problem to solve.", cta: "Enquire about a product" },
  { category: "Simplify your work", outcome: "Less repetitive work. More room to focus.", fit: "For repetitive tasks, disconnected tools and untapped data.", cta: "Enquire about automation" },
];

export default function ServicePricing() {
  return (
    <section id="pricing" className="oveliq-ip-section oveliq-service-pricing" aria-labelledby="pricing-heading">
      <div className="oveliq-ip-inner">
        <div className="oveliq-service-pricing__heading">
          <div>
            <p className="oveliq-ip-eyebrow">Ways to work together</p>
            <h1 id="pricing-heading">Good work starts<br /><span>with a conversation.</span></h1>
          </div>
          <p>Tell us what you want to make easier or better. We’ll help shape the right scope, then agree the fee with you before any work begins.</p>
        </div>

        <div className="oveliq-ways__section-head oveliq-ways__section-head--split" id="starting-scopes">
          <div>
            <p className="oveliq-ip-eyebrow">What we can help with</p>
            <h2>Start with what you need.</h2>
          </div>
          <p>Every project is different, so fees depend on the scope. These are common starting points, not fixed packages. We’ll provide a clear written proposal before you decide.</p>
        </div>
        <div className="oveliq-service-pricing__grid">
          {oveliqSolutionPricing.solutions.map((solution, index) => (
            <article className="oveliq-service-pricing__card" key={solution.title}>
              <div className="oveliq-service-pricing__card-top">
                <span className="oveliq-service-pricing__number">0{index + 1} /</span>
                <span className="oveliq-service-pricing__category">{solutionBenefits[index].category}</span>
              </div>
              <div className={`oveliq-service-pricing__art oveliq-service-pricing__art--${index}`} aria-hidden="true"><span /><span /><span /><i /></div>
              <h3>{solution.title}</h3>
              <p className="oveliq-service-pricing__outcome">{solutionBenefits[index].outcome}</p>
              <p className="oveliq-service-pricing__description">{solutionBenefits[index].fit}</p>
              <div className="oveliq-service-pricing__price oveliq-service-pricing__price--scope">
                <span>Project fee</span><strong>Scoped to your needs</strong>
                <p>{solution.startingScope}</p>
                <small>Written scope and fee agreed before work begins.</small>
              </div>
              <p className="oveliq-ip-eyebrow">A typical first step may include</p>
              <ul>{solution.includes.map(item => <li key={item}>{item}</li>)}</ul>
              <a href={enquiryHref(enquiryChoices[index])}>{solutionBenefits[index].cta} <ArrowRight /></a>
            </article>
          ))}
        </div>

        <div className="oveliq-service-pricing__custom">
          <div><p className="oveliq-ip-eyebrow">Not sure where to start?</p><h3>That’s a good place to start.</h3></div>
          <p>Share the goal, even if the details are still taking shape. We’ll talk through options, recommend a sensible first scope and outline the fee before you commit.</p>
          <a href={enquiryHref("custom")}>Tell us about your project <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}
