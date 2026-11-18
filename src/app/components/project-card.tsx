import type { PointerEvent } from "react";
import type { OveliqProjectDetail } from "../content";
import { Reveal } from "../motion";
import "./project-card.css";

type ProjectCardProps = {
  project: OveliqProjectDetail;
  /** `panel` = full-viewport sticky panel (Work index); `tile` = related-projects grid. */
  variant?: "panel" | "tile";
  headingLevel?: "h2" | "h3";
};

/** Tiles: image rests at 1.12 and drifts a few px toward the pointer (Spector). */
function followPointer(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--follow-x", `${(x * 12).toFixed(2)}px`);
  el.style.setProperty("--follow-y", `${(y * 12).toFixed(2)}px`);
}

function resetPointer(event: PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.style.setProperty("--follow-x", "0px");
  event.currentTarget.style.setProperty("--follow-y", "0px");
}

/**
 * Spector project card: full-bleed media under a dark scrim, centred
 * client label → short rule → title (→ tagline on panels).
 * Panels pop their text in (y 60, scale 0.8); the Work page drives `--zoom`.
 */
export default function ProjectCard({
  project,
  variant = "tile",
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const isPanel = variant === "panel";

  if (!isPanel) return (
    <a href={`/work/${project.slug}`} className="related-project">
      <span className="related-project__media"><img src={project.mediaSrc} alt={project.mediaAlt} loading="lazy" width="1600" height="1000" /></span>
      <span className="related-project__copy"><small>{project.status}</small><Heading>{project.title}</Heading><span>{project.tagline}</span></span>
    </a>
  );

  return (
    <a
      href={`/work/${project.slug}`}
      className={`oveliq-project-card oveliq-project-card--${variant}`}
      data-oveliq-motion="project-card"
      onPointerMove={isPanel ? undefined : followPointer}
      onPointerLeave={isPanel ? undefined : resetPointer}
    >
      <img
        className="oveliq-project-card__media"
        src={project.mediaSrc}
        alt=""
        loading={isPanel ? "eager" : "lazy"}
      />
      <span className="oveliq-project-card__scrim" aria-hidden="true" />
      {isPanel ? (
        <span className="oveliq-project-card__body">
          <Reveal as="span" className="oveliq-project-card__headline" y={60} scale={0.8} ease="pop" durationMs={650} threshold={0.35}>
            <span className="oveliq-project-card__client">{project.client}</span>
            <span className="oveliq-project-card__rule" aria-hidden="true" />
            <Heading className="oveliq-project-card__title">{project.title}</Heading>
          </Reveal>
          <Reveal as="span" className="oveliq-project-card__tagline" y={40} scale={0.8} ease="pop" durationMs={650} delayMs={250} threshold={0.35}>
            {project.tagline}
          </Reveal>
        </span>
      ) : (
        <span className="oveliq-project-card__body">
          <span className="oveliq-project-card__client">{project.status} · {project.client}</span>
          <span className="oveliq-project-card__rule" aria-hidden="true" />
          <Heading className="oveliq-project-card__title">{project.title}</Heading>
        </span>
      )}
    </a>
  );
}
