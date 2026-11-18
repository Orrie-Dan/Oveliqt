import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { oveliqEditorialHero as hero } from "../content";
import CtaArrow from "../components/cta-arrow";
import { heroIntroMode } from "../motion/hero-intro";
import { Reveal, RevealLines, usePrefersReducedMotion } from "../motion";
import "./editorial-hero.css";

/**
 * Homepage hero, white Swiss-editorial direction:
 * messaging column + art-directed O* composition + side note + capabilities strip.
 *
 * The composition is one SVG (shapes, photo slots, construction lines) with HTML
 * annotations on top. Construction lines run past the SVG box and are clipped by
 * the section. Layers drift slightly with the pointer (desktop mouse only) by
 * setting --eh-mx / --eh-my in the range -1..1; CSS turns that into depth.
 */

/** Asterisk arms, matching the logo proportions (oveliqt-symbol.svg). */
function AsteriskArms({ cx, cy, length, width }: { cx: number; cy: number; length: number; width: number }) {
  const x = cx - width / 2;
  const y = cy - length / 2;
  const rx = width * 0.18;
  return (
    <>
      {[0, 60, 120].map((deg) => (
        <rect key={deg} x={x} y={y} width={width} height={length} rx={rx} transform={`rotate(${deg} ${cx} ${cy})`} />
      ))}
    </>
  );
}

type CapabilityIcon = (typeof hero.capabilities)[number]["icon"];

function CapabilityGlyph({ icon }: { icon: CapabilityIcon }) {
  return (
    <svg className="oveliq-ehero__cap-icon" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      {icon === "screen" && (
        <>
          <rect x="3" y="7" width="38" height="25" rx="1.5" />
          <path d="M22 32v6M14 38h16" />
        </>
      )}
      {icon === "layers" && (
        <>
          <path d="M22 5 39 14 22 23 5 14Z" />
          <path d="M5 21.5 22 30.5 39 21.5" />
          <path d="M5 29 22 38 39 29" />
        </>
      )}
      {icon === "chip" && (
        <>
          <rect x="9" y="9" width="26" height="26" rx="5" />
          <path d="M15 4v5M22 4v5M29 4v5M15 35v5M22 35v5M29 35v5M4 15h5M4 22h5M4 29h5M35 15h5M35 22h5M35 29h5" />
          <path d="M22 15v14M22 17.5c-1.2-2-5.5-2-6 1-2.5.4-2.6 3.8-.6 4.6-1.6 1.6-.4 4.6 2 4.4.8 1.7 3.6 1.7 4.6-.5M22 17.5c1.2-2 5.5-2 6 1 2.5.4 2.6 3.8.6 4.6 1.6 1.6.4 4.6-2 4.4-.8 1.7-3.6 1.7-4.6-.5M18.5 21.5h3.5M22 24.5h3.5" />
        </>
      )}
    </svg>
  );
}

/*
 * Composition coordinates (viewBox 769 110 731 638). The building silhouette:
 * left roofline (867,748)->(1105,404), right roofline (1105,404)->(1500,686).
 */
const BUILDING_CLIP = "868.5 748 1105 405.5 1500 687.5 1500 748";

function Composition({ settled }: { settled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => {
    if (frame.current != null) cancelAnimationFrame(frame.current);
  }, []);

  const flush = useCallback(() => {
    frame.current = null;
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--eh-mx", pending.current.x.toFixed(3));
    node.style.setProperty("--eh-my", pending.current.y.toFixed(3));
  }, []);

  const queue = useCallback((x: number, y: number) => {
    pending.current = { x, y };
    if (frame.current == null) frame.current = requestAnimationFrame(flush);
  }, [flush]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    queue(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
  }, [queue, reduced]);

  const onPointerLeave = useCallback(() => queue(0, 0), [queue]);

  const { building, sky } = hero.frames;

  return (
    <div
      ref={ref}
      className={`oveliq-ehero__visual${settled ? " is-settled" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ ["--eh-mx" as string]: 0, ["--eh-my" as string]: 0 } as CSSProperties}
      aria-hidden="true"
    >
      <svg className="oveliq-ehero__art" viewBox="769 110 731 638" preserveAspectRatio="xMidYMid meet" focusable="false">
        <defs>
          <clipPath id="eh-clip-building"><polygon points={BUILDING_CLIP} /></clipPath>
          {/* The part of the ring that sits over the red block reads as deep red. */}
          <clipPath id="eh-clip-red"><rect x="769" y="544" width="238" height="142" /></clipPath>
        </defs>

        {/* Construction grid: runs past the art box, clipped by the section. */}
        <g className="oveliq-ehero__lines">
          <line className="oveliq-ehero__construct" x1="948" y1="-1400" x2="948" y2="2400" />
          <line className="oveliq-ehero__construct" x1="1330" y1="-1400" x2="1330" y2="2400" />
          <line className="oveliq-ehero__construct" x1="1500" y1="-1400" x2="1500" y2="2400" />
          <line className="oveliq-ehero__construct" x1="877" y1="195" x2="3400" y2="195" />
          <line className="oveliq-ehero__construct" x1="1500" y1="735" x2="3400" y2="735" />
        </g>

        {/* Sky panel + charcoal band behind the building */}
        <g className="oveliq-ehero__layer oveliq-ehero__layer--back">
          <g className="oveliq-ehero__enter oveliq-ehero__enter--back">
            <rect x="1346" y="597" width="154" height="151" fill="var(--eh-black)" />
            <rect x="1346" y="416" width="154" height="181" fill="#bdbdbd" />
            {sky.src && (
              <image className="oveliq-ehero__photo" href={sky.src} x="1346" y="416" width="154" height="181" preserveAspectRatio="xMidYMid slice" />
            )}
          </g>
        </g>

        {/* The O + signal-red block move together so their overlap stays aligned. */}
        <g className="oveliq-ehero__layer oveliq-ehero__layer--ring">
          <circle className="oveliq-ehero__ring" cx="1096" cy="427" r="192.5" pathLength="1" />
          <g className="oveliq-ehero__enter oveliq-ehero__enter--red">
            <rect x="769" y="544" width="238" height="204" fill="var(--eh-red)" />
            <rect x="769" y="686" width="238" height="62" fill="var(--eh-red-deep)" />
            <circle className="oveliq-ehero__ring oveliq-ehero__ring--over" cx="1096" cy="427" r="192.5" clipPath="url(#eh-clip-red)" />
          </g>
        </g>

        {/* Building photo, clipped to its roofline */}
        <g className="oveliq-ehero__layer oveliq-ehero__layer--building">
          <g className="oveliq-ehero__enter oveliq-ehero__enter--building">
            <g clipPath="url(#eh-clip-building)">
              <rect x="866" y="403" width="634" height="345" fill="#9c9c9c" />
              {building.src && (
                <image className="oveliq-ehero__photo" href={building.src} x="866" y="403" width="634" height="345" preserveAspectRatio="xMidYMid slice" />
              )}
            </g>
          </g>
        </g>

        {/* Asterisk */}
        <g className="oveliq-ehero__layer oveliq-ehero__layer--star">
          <g className="oveliq-ehero__star">
            <AsteriskArms cx={1350} cy={222.5} length={211} width={50} />
          </g>
        </g>
      </svg>

      <span className="oveliq-ehero__note oveliq-ehero__note--code">
        <strong>{hero.annotations.code}</strong>
        <span>{hero.annotations.established}</span>
      </span>
    </div>
  );
}

export default function EditorialHeroSection() {
  const [intro] = useState(heroIntroMode);
  const trigger = intro === "play" ? "load" : "none";
  const settled = intro === "skip";

  return (
    <section
      className={`oveliq-ehero${settled ? " is-settled" : ""}`}
      aria-labelledby="oveliq-ehero-heading"
      data-oveliq-motion="hero"
    >
      <div className="oveliq-ehero__inner">
        <div className="oveliq-ehero__main">
          <div className="oveliq-ehero__copy">
            <Reveal as="p" className="oveliq-ehero__eyebrow" trigger={trigger} delayMs={80}>
              {hero.eyebrow}
            </Reveal>
            <RevealLines
              as="h1"
              id="oveliq-ehero-heading"
              className="oveliq-ehero__headline"
              lines={hero.headlineLines}
              lineClassNames={["", "", "oveliq-ehero__line--last"]}
              delayMs={140}
              staggerMs={90}
              trigger={trigger}
            />
            <Reveal as="p" className="oveliq-ehero__description" trigger={trigger} delayMs={420}>
              {hero.description}
            </Reveal>
            <Reveal className="oveliq-ehero__actions" trigger={trigger} delayMs={520}>
              <a className="oveliq-ehero__cta oveliq-ehero__cta--primary group" href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
                <CtaArrow />
              </a>
              <a className="oveliq-ehero__cta oveliq-ehero__cta--secondary group" href={hero.secondaryCta.href}>
                <span>{hero.secondaryCta.label}</span>
                <CtaArrow />
              </a>
            </Reveal>
          </div>

          <Composition settled={settled} />

          <Reveal className="oveliq-ehero__aside" trigger={trigger} delayMs={1100}>
            <p className="oveliq-ehero__statement">
              {hero.statement.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
          </Reveal>
        </div>

        <ul className="oveliq-ehero__strip" aria-label="What we do">
          {hero.capabilities.map((item, i) => (
            <Reveal as="li" key={item.index} className="oveliq-ehero__capability" trigger={trigger} delayMs={700 + i * 80}>
              <a href={item.href}>
                <CapabilityGlyph icon={item.icon} />
                <span className="oveliq-ehero__cap-body">
                  <span className="oveliq-ehero__cap-label">
                    <span className="oveliq-ehero__cap-index">{item.index}</span>
                    <span aria-hidden="true" className="oveliq-ehero__cap-slash">/</span>
                    {item.title}
                  </span>
                  <span className="oveliq-ehero__cap-text">{item.text}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <li className="oveliq-ehero__strip-end" aria-hidden="true">
            <Reveal className="oveliq-ehero__strip-end-inner" trigger={trigger} delayMs={940}>
              <span className="oveliq-ehero__strip-rule" />
              <svg viewBox="0 0 40 40" className="oveliq-ehero__strip-star" focusable="false">
                <AsteriskArms cx={20} cy={20} length={34} width={8} />
              </svg>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
