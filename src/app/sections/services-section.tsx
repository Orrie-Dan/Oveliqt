import SectionManifesto from "../components/section-manifesto";
import ServicesShowcase from "../components/services-showcase";
import { oveliqServices, oveliqWhatWeDo } from "../content";
import { Reveal } from "../motion";
import { serviceEditorialMedia } from "../service-media";
import "./services.css";

const homepageServices = oveliqServices.map((service) => ({
  ...service,
  mediaSrc: serviceEditorialMedia(service.visual).src,
  mediaAlt: serviceEditorialMedia(service.visual).alt,
}));

/**
 * Oveliqt `/ 02 — WHAT WE DO` section shell.
 * Interactive service selection lives in ServicesShowcase.
 */
export default function ServicesSection() {
  const { number, label, tagline, headlineLines, supporting } = oveliqWhatWeDo;

  return (
    <section
      className="oveliq-services"
      id="services"
      aria-labelledby="what-we-do-heading"
      data-oveliq-motion="services"
    >
      <div className="oveliq-services__inner">
        <SectionManifesto
          number={number}
          label={label}
          labelId="what-we-do-heading"
          headlineLines={headlineLines}
          tagline={tagline}
          supporting={supporting}
        />

        <Reveal
          as="div"
          delayMs={180}
          threshold={0.12}
          rootMargin="0px 0px -4% 0px"
        >
          <ServicesShowcase services={homepageServices} />
        </Reveal>
      </div>

      <div className="oveliq-services__bridge" aria-hidden="true">
        <div className="oveliq-services__bridge-rule" />
      </div>
    </section>
  );
}
