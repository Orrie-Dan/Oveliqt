import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { oveliqHero } from "../content";
import PillLink from "../components/pill-link";
import { heroIntroMode } from "../motion/hero-intro";
import { MediaReveal, Reveal, RevealLines, usePrefersReducedMotion } from "../motion";
import "./hero.css";

/**
 * Spector live-hero grammar with Oveliqt identity:
 * full-bleed media + grid, left studio meta, right service list + red rule,
 * three-line clipped display type, vertical barcode.
 * Hover: pointer parallax on the image (Framer Image+Effect style),
 * service accent, and pointer-reactive grid spotlight.
 */

const HEADLINE = oveliqHero.headline;

const HEADLINE_CLASS = [
  "oveliq-hero__line oveliq-hero__line--accent",
  "oveliq-hero__line oveliq-hero__line--gradient",
  "oveliq-hero__line oveliq-hero__line--plain",
] as const;

/** Max image drift in px — mirrors Spector's oversized canvas slack (~120). */
const PARALLAX_RANGE = 28;
const PARALLAX_LERP = 0.12;

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [intro] = useState(heroIntroMode);
  const [activeService, setActiveService] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const trigger = intro === "play" ? "load" : "none";

  const applyParallax = useCallback(() => {
    const node = mediaRef.current;
    if (!node) return;
    const cur = currentRef.current;
    const tgt = targetRef.current;
    cur.x += (tgt.x - cur.x) * PARALLAX_LERP;
    cur.y += (tgt.y - cur.y) * PARALLAX_LERP;
    if (Math.abs(cur.x) < 0.01) cur.x = 0;
    if (Math.abs(cur.y) < 0.01) cur.y = 0;
    node.style.setProperty("--hero-px", `${cur.x.toFixed(2)}px`);
    node.style.setProperty("--hero-py", `${cur.y.toFixed(2)}px`);

    const settled = Math.abs(cur.x - tgt.x) < 0.05 && Math.abs(cur.y - tgt.y) < 0.05;
    if (settled) {
      rafRef.current = null;
      return;
    }
    rafRef.current = requestAnimationFrame(applyParallax);
  }, []);

  const startParallaxLoop = useCallback(() => {
    if (rafRef.current != null || reduced) return;
    rafRef.current = requestAnimationFrame(applyParallax);
  }, [applyParallax, reduced]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMediaPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== "mouse") return;
      const node = mediaRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      node.dataset.hover = "true";
      // Move opposite the cursor (Framer Image+Effect parallax)
      targetRef.current = {
        x: (0.5 - nx) * PARALLAX_RANGE * 2,
        y: (0.5 - ny) * PARALLAX_RANGE * 2,
      };
      startParallaxLoop();
    },
    [reduced, startParallaxLoop],
  );

  const onMediaLeave = useCallback(() => {
    const node = mediaRef.current;
    if (!node) return;
    node.dataset.hover = "false";
    targetRef.current = { x: 0, y: 0 };
    startParallaxLoop();
  }, [startParallaxLoop]);

  return (
    <section
      ref={rootRef}
      className={`oveliq-hero${intro === "skip" ? " is-settled" : ""}`}
      aria-labelledby="oveliq-hero-heading"
      data-oveliq-motion="hero"
    >
      <h1 id="oveliq-hero-heading" className="sr-only">
        Oveliqt — We build software that moves ideas forward
      </h1>

      <div
        className="oveliq-hero__media-shell"
        ref={mediaRef}
        onPointerMove={onMediaPointer}
        onPointerLeave={onMediaLeave}
        data-hover="false"
        style={
          {
            ["--hero-mx" as string]: "62%",
            ["--hero-my" as string]: "42%",
            ["--hero-px" as string]: "0px",
            ["--hero-py" as string]: "0px",
          }
        }
      >
        <div className="oveliq-hero__media-motion">
          <MediaReveal
            className="oveliq-hero__frames"
            scaleFrom={1.35}
            transformOrigin="58% 40%"
            trigger={trigger}
            delayMs={0}
          >
            <div className="oveliq-hero__stage" data-hero-media-slot="oveliq">
              <div className="oveliq-hero__photo-frame">
                <img
                  className="oveliq-hero__photo"
                  src={oveliqHero.mediaSrc}
                  alt=""
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>
              <div className="oveliq-hero__grid" aria-hidden="true" />
              <div className="oveliq-hero__scrim" aria-hidden="true" />
            </div>
          </MediaReveal>
        </div>
      </div>

      <div className="oveliq-hero__depth oveliq-hero__depth-meta">
        <div className="oveliq-hero__top">
          <div className="oveliq-hero__copy">
            <Reveal as="p" className="oveliq-hero__jp" trigger={trigger} delayMs={520}>
              <span className="oveliq-hero__jp-mark" aria-hidden="true" />
              <span>{oveliqHero.microLabel}</span>
            </Reveal>
            <Reveal as="p" className="oveliq-hero__studio" trigger={trigger} delayMs={640}>
              {oveliqHero.studioTitle}
            </Reveal>
            <Reveal as="p" className="oveliq-hero__description" trigger={trigger} delayMs={780}>
              {oveliqHero.description}
            </Reveal>
            <Reveal className="oveliq-hero__action" trigger={trigger} delayMs={820}>
              <PillLink href="#work" label="Explore our work" tone="dark" />
            </Reveal>
          </div>

          <div className="oveliq-hero__services">
            <Reveal
              as="p"
              className="oveliq-hero__year oveliq-reveal--from-above"
              trigger={trigger}
              delayMs={560}
            >
              <span aria-hidden="true">+</span>
              {oveliqHero.yearTag}
            </Reveal>
            <div className="oveliq-hero__service-row">
              <span
                className={`oveliq-hero__service-rule${intro === "skip" ? " is-drawn" : ""}`}
                aria-hidden="true"
              />
              <ul className="oveliq-hero__service-list">
                {oveliqHero.services.map((label, index) => (
                  <Reveal
                    as="li"
                    key={label}
                    className="oveliq-hero__service oveliq-reveal--from-above"
                    trigger={trigger}
                    delayMs={620 + index * 70}
                  >
                    <a
                      href={`/services/${({ Web: "web-development", Software: "software-development", AI: "ai-machine-learning", Data: "data-analytics" })[label]}`}
                      className={`oveliq-hero__service-btn${activeService === label ? " is-active" : ""}`}
                      onMouseEnter={() => setActiveService(label)}
                      onMouseLeave={() => setActiveService(null)}
                      onFocus={() => setActiveService(label)}
                      onBlur={() => setActiveService(null)}
                    >
                      {label}
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="oveliq-hero__depth oveliq-hero__depth-headline">
        <div aria-hidden="true">
          <RevealLines
            className="oveliq-hero__lines"
            lines={HEADLINE}
            lineClassNames={HEADLINE_CLASS}
            delayMs={220}
            staggerMs={88}
            trigger={trigger}
          />
        </div>
      </div>

      <p className="oveliq-hero__barcode" aria-hidden="true">
        {oveliqHero.barcode}
      </p>
      <span className="oveliq-hero__bars" aria-hidden="true" />
    </section>
  );
}
