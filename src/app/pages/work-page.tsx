import { useState } from "react";
import ArrowUpRight from "../components/arrow-up-right";
import SiteLayout from "../components/site-layout";
import { oveliqProjectDetails } from "../content";
import { Reveal } from "../motion";
import "./pages.css";
import "../sections/selected-work.css";
import "./work-page.css";

export default function WorkPage() {
  /* Only categories with published projects get a filter. */
  const categories = ["All work", ...(["Websites", "Platforms", "AI & Research"] as const).filter(item => oveliqProjectDetails.items.some(project => project.category === item))];
  const [category, setCategory] = useState<string>("All work");
  const projects = oveliqProjectDetails.items.filter(project => category === "All work" || project.category === category);
  return (
    <SiteLayout>
      <section className="oveliq-projects oveliq-work-index" aria-labelledby="page-heading">
        <div className="oveliq-projects__inner">
          <Reveal as="header" className="oveliq-projects__heading" trigger="load">
            <div>
              <p className="oveliq-projects__eyebrow">Oveliqt / Portfolio</p>
              <h1 id="page-heading" className="oveliq-projects__title">Work with a purpose.</h1>
            </div>
            <p className="oveliq-projects__supporting">Client websites for manufacturing, energy, investment and technology companies, alongside our own platform and applied AI projects. Explore the work and the thinking behind it.</p>
          </Reveal>
          <div className="work-library__filters" role="group" aria-label="Filter projects">
            {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === "All work" ? oveliqProjectDetails.items.length : oveliqProjectDetails.items.filter(project => project.category === item).length}</span></button>)}
          </div>
          <p className="work-library__count" role="status">{projects.length} {projects.length === 1 ? "project" : "projects"}{category === "All work" ? " across design, software and AI" : ` in ${category}`}</p>
          <div className="work-library__grid">
            {projects.map(project => <a className="work-library__card" key={project.slug} href={`/work/${project.slug}`}>
              <div className="work-library__media"><img src={project.mediaSrc} alt={project.mediaAlt} width="1440" height="1000" loading="lazy" /></div>
              <span className="work-library__type">{project.status}</span>
              <div className="work-library__copy"><div><p>{project.category} / {project.client}</p><h2>{project.title}</h2></div><ArrowUpRight /></div>
              <p className="work-library__summary">{project.tagline}</p>
            </a>)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

