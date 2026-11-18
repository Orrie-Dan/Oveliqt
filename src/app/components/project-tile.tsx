import ArrowUpRight from "./arrow-up-right";
import { findProjectDetail, type OveliqProjectTile } from "../content";

/** Project captions remain visible for every input method. */
export default function ProjectTile({ d, index }: { d: OveliqProjectTile; index: number }) {
  const project = findProjectDetail(d.id);
  return (
    <a className={`oveliq-projects__tile oveliq-projects__tile--${d.id}`} href={d.href ?? `/work/${d.id}`}>
      <div className="oveliq-projects__media">
        {project ? <img src={project.mediaSrc} alt={project.mediaAlt} loading="lazy" width="1600" height="1000" /> : null}
        <span className="oveliq-projects__number" aria-hidden="true">{String(index).padStart(2, "0")}</span>
        <span className="oveliq-projects__open" aria-hidden="true"><ArrowUpRight /></span>
      </div>
      <div className="oveliq-projects__caption">
        <h3 className="oveliq-projects__name">{d.title}</h3>
        <span className="oveliq-projects__client">{d.client}</span>
      </div>
      {project ? <p className="oveliq-projects__summary">{project.tagline}</p> : null}
    </a>
  );
}

