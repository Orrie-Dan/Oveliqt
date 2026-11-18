import SectionManifesto from "../components/section-manifesto";
import {
  oveliqCapabilities,
  type OveliqCapabilityGroup,
} from "../content";
import { Reveal } from "../motion";
import "./capabilities.css";

/**
 * Quiet technical-depth layer between How We Work and About.
 * Editorial competency matrix — not a service theater.
 * Motion intensity: LOW.
 */
export default function CapabilitiesSection() {
  const { label, tagline, headline, supporting, groups } =
    oveliqCapabilities;

  return (
    <section
      className="oveliq-capabilities"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="oveliq-capabilities__inner">
        <SectionManifesto
          label={label}
          headlineId="capabilities-heading"
          headlineLines={headline}
          tagline={tagline}
          supporting={supporting}
        />

        <Reveal className="oveliq-capabilities__matrix" delayMs={100} threshold={0.12}>
          <ul className="oveliq-cap-matrix">
            {groups.map((group) => (
              <CapabilityGroupRow key={group.id} group={group} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CapabilityGroupRow({ group }: { group: OveliqCapabilityGroup }) {
  return (
    <li className="oveliq-cap-matrix__row">
      <h3 className="oveliq-cap-matrix__title" dir="auto">
        {group.title}
      </h3>
      <p className="oveliq-cap-matrix__items" dir="auto">
        {group.items.join(" · ")}
      </p>
    </li>
  );
}
