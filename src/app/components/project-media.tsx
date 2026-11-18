import "./project-media.css";

/** Media remains in document flow: no overlays, fixed heights or scroll transforms. */
export default function ProjectMedia({ src, alt, caption, priority = false }: {
  src: string; alt: string; caption?: string; priority?: boolean;
}) {
  const illustration = src.endsWith(".svg");
  return <figure className="project-screen">
    <div className="project-screen__frame">
      <div className="project-screen__label"><span>{illustration ? "Product visualisation" : "Project preview"}</span><span aria-hidden="true">↗</span></div>
      <img src={src} alt={alt} width="1600" height="1000" loading={priority ? "eager" : "lazy"} decoding="async" />
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
