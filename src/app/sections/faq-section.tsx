import { useId, useState } from "react";
import SectionManifesto from "../components/section-manifesto";
import { oveliqFaq, type OveliqFaqItem } from "../content";
import { Reveal } from "../motion";
import "./faq.css";

/**
 * `/ 09 — FAQ`
 * Aside intro + single-open accordion. The shared footer provides the CTA.
 * Motion intensity: LOW (height via grid-rows transition).
 */
export default function FaqSection() {
  /* Sample answers make commitments (support, ownership) — hidden until confirmed. */
  if (oveliqFaq.sample) return null;
  return <FaqContent />;
}

function FaqContent() {
  const {
    number,
    label,
    tagline,
    headlineLines,
    asideTitle,
    asideText,
    items,
  } = oveliqFaq;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="oveliq-faq" id="faq" aria-labelledby="faq-heading">
      <div className="oveliq-faq__inner">
        <SectionManifesto
          number={number}
          label={label}
          headlineId="faq-heading"
          headlineLines={headlineLines}
          tagline={tagline}
        />

        <div className="oveliq-faq__layout">
          <Reveal className="oveliq-faq__aside" delayMs={60}>
            <p className="oveliq-faq__aside-title" dir="auto">
              {asideTitle}
            </p>
            <p className="oveliq-faq__aside-text" dir="auto">
              {asideText}
            </p>
          </Reveal>

          <Reveal as="ul" className="oveliq-faq__list" delayMs={100} threshold={0.1}>
            {items.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
              />
            ))}
          </Reveal>
        </div>


      </div>
    </section>
  );
}

/** Single accordion row; also used by service pages (`pages/service-page.tsx`). */
export function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: OveliqFaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const baseId = useId();
  const buttonId = `${baseId}-q`;
  const panelId = `${baseId}-a`;

  return (
    <li className="oveliq-faq__item" data-open={open ? "true" : "false"}>
      <h3 className="oveliq-faq__question-wrap">
        <button
          type="button"
          id={buttonId}
          className="oveliq-faq__question"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span dir="auto">{item.question}</span>
          <span className="oveliq-faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="oveliq-faq__panel"
        inert={!open}
      >
        <div className="oveliq-faq__panel-inner">
          <p className="oveliq-faq__answer" dir="auto">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  );
}
