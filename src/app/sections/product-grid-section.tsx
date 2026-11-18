import ArrowUpRight from "../components/arrow-up-right";
import WorkShowcase from "../components/work-showcase";
import { oveliqProjectTiles, oveliqSelectedWork } from "../content";
import { Reveal } from "../motion";
import "./selected-work.css";

export default function ProductGridSection({ projects = oveliqProjectTiles, showMore = true }: {
  projects?: typeof oveliqProjectTiles;
  showMore?: boolean;
} = {}) {
  return (
    <section className="oveliq-projects oveliq-after-hero" id="work" aria-labelledby="selected-projects-heading">
      <div className="oveliq-projects__inner">
        <Reveal as="header" className="oveliq-projects__heading">
          <div>
            <p className="oveliq-projects__eyebrow">01 / Selected work</p>
            <h2 id="selected-projects-heading" className="oveliq-projects__title">Ideas, made real.</h2>
          </div>
          <p className="oveliq-projects__supporting">{oveliqSelectedWork.supporting}</p>
        </Reveal>
        <WorkShowcase projects={projects.slice(0, 6)} />
        {showMore ? <a className="oveliq-projects__more-link" href="/work">Explore all projects <ArrowUpRight /></a> : null}
      </div>
    </section>
  );
}

