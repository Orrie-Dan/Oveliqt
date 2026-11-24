import { useId, useRef, useState, type KeyboardEvent } from "react";
import ArrowUpRight from "./arrow-up-right";
import { findProjectDetail, type OveliqProjectTile } from "../content";
import "./work-showcase.css";

/** A compact portfolio index with one generous preview. No autoplay or scroll interception. */
export default function WorkShowcase({ projects }: { projects: readonly OveliqProjectTile[] }) {
  const [selected, setSelected] = useState(0);
  // The project being faded out underneath the new one (null once the crossfade finishes).
  const [previous, setPrevious] = useState<number | null>(null);
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.min(selected, Math.max(0, projects.length - 1));
  const active = projects[activeIndex];
  const project = active ? findProjectDetail(active.id) : undefined;
  const previousProject = previous !== null && previous !== activeIndex && projects[previous]
    ? findProjectDetail(projects[previous].id) : undefined;

  function select(next: number) {
    if (next === activeIndex) return;
    setPrevious(activeIndex);
    setSelected(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (next + 1) % projects.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (next - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  if (!active || !project) return null;

  return (
    <div className="oveliq-work-showcase">
      <div className="oveliq-work-showcase__index">
        <p className="oveliq-work-showcase__index-label">The project index <span>{String(projects.length).padStart(2, "0")} projects</span></p>
        <div role="tablist" aria-label="Selected projects" className="oveliq-work-showcase__tabs" onKeyDown={onKeyDown}>
          {projects.map((item, index) => (
            <button key={item.id} ref={node => { tabs.current[index] = node; }}
              type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`}
              aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1}
              className="oveliq-work-showcase__tab" onClick={() => select(index)}>
              <span className="oveliq-work-showcase__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="oveliq-work-showcase__tab-copy"><span>{item.title}</span><small>{item.client}</small></span>
              <ArrowUpRight />
            </button>
          ))}
        </div>
        <p className="oveliq-work-showcase__index-note">Different challenges.<br />One standard of care.</p>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${activeIndex}`} tabIndex={0}
        className={`oveliq-work-showcase__panel oveliq-work-showcase__panel--${active.id}`}>
        <a className="oveliq-work-showcase__preview" href={active.href ?? `/work/${active.id}`} aria-label={`Explore ${active.title}`}>
          {previousProject ? (
            <img key={`prev-${previous}`} className="oveliq-work-showcase__image oveliq-work-showcase__image--previous"
              src={previousProject.mediaSrc} alt="" aria-hidden="true" width="1600" height="1000" decoding="async" />
          ) : null}
          <img key={active.id} className="oveliq-work-showcase__image oveliq-work-showcase__image--current" src={project.mediaSrc} alt={project.mediaAlt}
            width="1600" height="1000" loading="eager" decoding="async" onAnimationEnd={() => setPrevious(null)} />
        </a>
        <div className="oveliq-work-showcase__details">
          <div key={active.id} className="oveliq-work-showcase__details-copy"><p className="oveliq-work-showcase__category">{project.status}{project.mediaSrc.endsWith(".svg") ? " / Product visualisation" : ""}</p><h3>{active.title}</h3><p className="oveliq-work-showcase__summary">{project.tagline}</p></div>
          <a className="oveliq-work-showcase__case" href={active.href ?? `/work/${active.id}`}>View case study <ArrowUpRight /></a>
        </div>
      </div>
    </div>
  );
}
