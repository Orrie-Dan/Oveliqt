import SectionManifesto from "../components/section-manifesto";
import { oveliqHowWeWork, oveliqProcess } from "../content";
import ProcessDiagram from "../components/process-diagram";
import { Reveal } from "../motion";
import "./how-we-work.css";

export default function HowWeWorkSection() {
  const { number, label, tagline, headlineLines, supporting } = oveliqHowWeWork;
  return (
    <section className="oveliq-how-we-work" id="process" aria-labelledby="how-we-work-heading">
      <div className="oveliq-how-we-work__inner">
        <SectionManifesto number={number} label={label} headlineId="how-we-work-heading"
          headlineLines={headlineLines} tagline={tagline} supporting={supporting} />
        <ol className="oveliq-process-grid">
          {oveliqProcess.map((stage, index) => (
            <Reveal as="li" key={stage.number} delayMs={(index % 3) * 60}>
              <div className="oveliq-process-grid__top"><span className="oveliq-process-grid__number">{stage.number} /</span><span>{index < 3 ? "Shape the direction" : "Make it real"}</span></div>
              <ProcessDiagram stage={index} />
              <h3>{stage.title}</h3>
              <p className="oveliq-process-grid__short">{stage.shortLine}</p>
              <p className="oveliq-process-grid__description">{stage.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

