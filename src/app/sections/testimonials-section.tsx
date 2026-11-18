import { useCallback, useState, type KeyboardEvent } from "react";
import ArrowLeft from "../components/arrow-left";
import ArrowRight from "../components/arrow-right";
import SectionManifesto from "../components/section-manifesto";
import { initials } from "../components/cta-band";
import { oveliqTestimonials } from "../content";
import { Reveal } from "../motion";
import "./testimonials.css";

/**
 * `/ 06 — CLIENT STORIES`
 * Dark field. One featured quote with Prev/Next + client index tabs.
 * Motion intensity: LOW (crossfade on quote change).
 */
export default function TestimonialsSection() {
  const { number, label, tagline, headlineLines, items } = oveliqTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;
  const active = items[activeIndex];

  const goTo = useCallback(
    (next: number) => setActiveIndex(((next % total) + total) % total),
    [total],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    },
    [activeIndex, goTo],
  );

  return (
    <section
      className="oveliq-testimonials"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="oveliq-testimonials__inner">
        <SectionManifesto
          number={number}
          label={label}
          headlineId="testimonials-heading"
          headlineLines={headlineLines}
          tagline={tagline}
          tone="on-dark"
        />

        <Reveal className="oveliq-testimonials__stage" delayMs={80} threshold={0.15}>
          <div
            className="oveliq-testimonials__featured"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <span className="oveliq-testimonials__mark" aria-hidden="true">
              “
            </span>
            <figure
              key={active.id}
              className="oveliq-testimonials__quote"
              aria-live="polite"
            >
              <blockquote className="oveliq-testimonials__quote-text" dir="auto">
                {active.quote}
              </blockquote>
              <figcaption className="oveliq-testimonials__author">
                <span className="oveliq-testimonials__avatar" aria-hidden="true">
                  {initials(active.name)}
                </span>
                <span>
                  <span className="oveliq-testimonials__name">{active.name}</span>
                  <span className="oveliq-testimonials__role">
                    {active.role}, {active.company}
                  </span>
                </span>
              </figcaption>
            </figure>

            <div className="oveliq-testimonials__controls">
              <p className="oveliq-testimonials__index">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>
              <div className="oveliq-testimonials__buttons">
                <button
                  type="button"
                  className="oveliq-testimonials__btn"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(activeIndex - 1)}
                >
                  <ArrowLeft className="oveliq-testimonials__btn-icon" />
                </button>
                <button
                  type="button"
                  className="oveliq-testimonials__btn"
                  aria-label="Next testimonial"
                  onClick={() => goTo(activeIndex + 1)}
                >
                  <ArrowRight className="oveliq-testimonials__btn-icon" />
                </button>
              </div>
            </div>
          </div>

          <ul className="oveliq-testimonials__list" aria-label="Choose a client">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="oveliq-testimonials__tab"
                  aria-pressed={i === activeIndex}
                  onClick={() => goTo(i)}
                >
                  <span className="oveliq-testimonials__tab-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="oveliq-testimonials__tab-company">
                    {item.company}
                  </span>
                  <span className="oveliq-testimonials__tab-name">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
