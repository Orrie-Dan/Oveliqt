import ArrowRight from "../components/arrow-right";
import CtaBand from "../components/cta-band";
import ProjectCard from "../components/project-card";
import SectionManifesto from "../components/section-manifesto";
import SiteLayout from "../components/site-layout";
import ProjectMedia from "../components/project-media";
import {
  oveliqProjectDetails,
  oveliqProjectPage,
  type OveliqProjectDetail,
  type OveliqProjectSection,
} from "../content";
import {
  Reveal,
  RevealSplit,
  oveliqMaskRestStyle,
} from "../motion";
import "./pages.css";
import "./project-page.css";

/** Case studies use separate text, media and story sections; screenshots stay in flow. */
export default function ProjectPage({ project }: { project: OveliqProjectDetail }) {
  const projects = oveliqProjectDetails.items.filter(item => !("sample" in item && item.sample));
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(Math.max(0, index) - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 4);
  const [galleryA, galleryB] = project.gallery;
  const { metaLabels, cta } = oveliqProjectPage;
  const metaRows = [
    { label: "PROJECT TYPE", values: [project.status] },
    { label: metaLabels.industry, values: [project.industry] },
    { label: metaLabels.role, values: project.role },
    { label: metaLabels.deliverables, values: project.deliverables },
    ...(project.timeframe ? [{ label: metaLabels.timeframe, values: [project.timeframe] }] : []),
  ];

  return (
    <SiteLayout>
      <section className="oveliq-project-hero" aria-labelledby="page-heading">
        <div className="oveliq-project-hero__inner">
          <p className="oveliq-project-hero__status">{project.status} / {project.category}</p>
          <h1 id="page-heading" className="oveliq-project-hero__title">{project.title}</h1>
          <div className="oveliq-project-hero__foot">
            <p className="oveliq-project-hero__tagline">{project.tagline}</p>
            <p className="oveliq-project-hero__intro">{project.intro}</p>
          </div>
        </div>
      </section>
      <ProjectMedia src={project.mediaSrc} alt={project.mediaAlt} caption={project.mediaNote} priority />

      <section className="oveliq-ip-section" aria-label="Project details">
        <div className="oveliq-project-meta">
          <Reveal as="div" className="oveliq-project-meta__head" y={20} ease="rise" durationMs={600}>
            {project.date ? <p className="oveliq-project-meta__date">{project.date}</p> : null}
            <div className="oveliq-project-meta__title-row">
              <h2 className="oveliq-project-meta__title">{project.title}</h2>
              <p className="oveliq-project-meta__client">{project.client}</p>
            </div>
          </Reveal>
          <dl className="oveliq-project-meta__list">
            {metaRows.map((row, i) => (
              <Reveal
                as="div"
                key={row.label}
                className="oveliq-project-meta__row"
                y={20}
                ease="rise"
                durationMs={600}
                delayMs={(i + 1) * 110}
              >
                <dt>{row.label}</dt>
                <dd>
                  {row.values.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        {project.externalUrl ? (
          <Reveal as="div" className="oveliq-project-meta__view" y={20} ease="rise" durationMs={600}>
            <a
              className="oveliq-ip-arrow-link"
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="oveliq-ip-arrow-link__text">{oveliqProjectPage.viewProjectLabel}</span>
              <ArrowRight />
            </a>
          </Reveal>
        ) : null}
      </section>

      <StorySection id="challenge" section={project.challenge} />

      {galleryA ? <ProjectMedia src={galleryA.src} alt={galleryA.alt} caption={galleryA.caption} /> : null}

      {galleryB ? <ProjectMedia src={galleryB.src} alt={galleryB.alt} caption={galleryB.caption} /> : null}

      <StorySection id="solution" section={project.solution} />

      <section className="oveliq-ip-section oveliq-ip-section--dark" aria-labelledby="outcome-heading">
        <div className="oveliq-ip-inner oveliq-project-outcome">
          <div className="oveliq-project-outcome__head">
            <Reveal as="p" className="oveliq-project-outcome__label" y={20} ease="rise" durationMs={600}>
              <span className="oveliq-project-outcome__mark" aria-hidden="true" />
              {project.outcome.label}
            </Reveal>
            <RevealSplit
              as="h2"
              id="outcome-heading"
              by="words"
              text={project.outcome.lead}
              className="oveliq-project-outcome__lead"
            />
          </div>
          <ol className="oveliq-project-outcome__points">
            {project.outcome.points.map((point, i) => (
              <Reveal
                as="li"
                key={point}
                className="oveliq-project-outcome__point"
                y={20}
                ease="rise"
                durationMs={600}
                delayMs={i * 110}
              >
                <span className="oveliq-project-outcome__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="oveliq-ip-section oveliq-ip-section--surface" aria-label="More projects">
        {/* Sample copy (e.g. "free discovery call") stays hidden until confirmed. */}
        {!cta.sample && <div className="oveliq-ip-cta">
          <CtaBand
            eyebrow={cta.eyebrow}
            statement={cta.statement}
            ctaLabel={cta.ctaLabel}
            ctaHref={cta.ctaHref}
            person={cta.person}
          />
        </div>}

        <nav className="oveliq-project-pager" aria-label="Project navigation">
          <PagerLink word={oveliqProjectPage.previousLabel} project={previous} />
          <PagerLink word={oveliqProjectPage.nextLabel} project={next} alignEnd />
        </nav>

        <div className="oveliq-project-related">
          {related.map((item, i) => (
            <Reveal key={item.slug} as="div" y={40} ease="rise" durationMs={600} delayMs={(i % 2) * 110}>
              <ProjectCard project={item} />
            </Reveal>
          ))}
        </div>

        <div className="oveliq-project-all">
          <a className="oveliq-ip-arrow-link" href="/work">
            <span className="oveliq-ip-arrow-link__text">{oveliqProjectPage.allProjectsLabel}</span>
            <ArrowRight />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

/** Spector "Giant" pager link — dual-layer text wipe (nav grammar). */
function PagerLink({
  word,
  project,
  alignEnd = false,
}: {
  word: string;
  project: OveliqProjectDetail;
  alignEnd?: boolean;
}) {
  return (
    <a
      className={`oveliq-project-pager__link group${alignEnd ? " oveliq-project-pager__link--next" : ""}`}
      href={`/work/${project.slug}`}
      aria-label={`${word}: ${project.title}`}
    >
      <span className="oveliq-project-pager__word" aria-hidden="true">
        <span
          className="oveliq-project-pager__word-accent group-hover:[mask-image:var(--oveliq-mask-hover)] group-hover:[-webkit-mask-image:var(--oveliq-mask-hover)]"
          style={oveliqMaskRestStyle}
        >
          {word}
        </span>
        <span>{word}</span>
      </span>
      <span className="oveliq-project-pager__name" aria-hidden="true">
        {project.title}
      </span>
      <span className="oveliq-project-pager__client" aria-hidden="true">
        {project.client}
      </span>
    </a>
  );
}

function StorySection({ id, section }: { id: string; section: OveliqProjectSection }) {
  return (
    <section className="oveliq-ip-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="oveliq-ip-inner">
        <SectionManifesto
          label={section.label}
          headlineId={`${id}-heading`}
          headlineLines={section.headlineLines}
        />
        <div className="oveliq-ip-story">
          <Reveal as="p" className="oveliq-ip-story__lead" y={20} ease="rise" durationMs={600}>
            {section.lead}
          </Reveal>
          <Reveal as="div" className="oveliq-ip-story__body" y={20} ease="rise" durationMs={600} delayMs={110}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
