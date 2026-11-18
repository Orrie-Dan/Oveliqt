import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { oveliqSystemHero as hero } from "../content";
import CtaArrow from "../components/cta-arrow";
import OveliqtLogo from "../svgs/oveliqt-logo";
import { heroIntroMode } from "../motion/hero-intro";
import { Reveal, RevealLines, useInView, usePrefersReducedMotion } from "../motion";
import "./system-hero.css";

/**
 * Homepage hero, "system" direction: messaging column + a live product system.
 *
 * The visual is the O* symbol as a core node wired to three stylised product
 * cards (web, systems, AI) and two status chips. Signals travel along the
 * wires, the AI card streams replies, and layers drift with the pointer
 * (desktop mouse only) via --sh-mx / --sh-my in -1..1, plus a spotlight at
 * --sh-sx / --sh-sy. Everything settles to a static frame under reduced motion.
 *
 * Geometry: cards are positioned in % of the visual box; the wire SVG uses a
 * matching 100 x 92 viewBox (the box's aspect ratio) so endpoints line up.
 */

type Exchange = (typeof hero.visual.ai.exchanges)[number];

/** Streams each reply character by character, then moves to the next exchange. */
function useTypewriter(exchanges: readonly Exchange[], active: boolean, reduced: boolean, startDelayMs: number) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced || started || !active) return;
    const t = window.setTimeout(() => setStarted(true), startDelayMs);
    return () => window.clearTimeout(t);
  }, [active, reduced, started, startDelayMs]);

  const reply = exchanges[index].reply;

  useEffect(() => {
    if (reduced || !started || !active) return;
    if (chars < reply.length) {
      const t = window.setTimeout(() => setChars((c) => c + 1), 22 + Math.random() * 26);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % exchanges.length);
      setChars(0);
    }, 3600);
    return () => window.clearTimeout(t);
  }, [active, chars, exchanges.length, reduced, reply.length, started]);

  if (reduced) return { exchange: exchanges[0], text: exchanges[0].reply, typing: false };
  return { exchange: exchanges[index], text: reply.slice(0, chars), typing: started && chars < reply.length };
}

const WIRES = [
  { id: "web", d: "M50 46 C 50 28, 32 30, 23 18" },
  { id: "systems", d: "M50 46 C 62 46, 70 41, 81 44" },
  { id: "ai", d: "M50 46 C 50 62, 37 62, 29 74" },
  { id: "terminal", d: "M50 46 C 58 30, 74 22, 84 9", faint: true },
  { id: "build", d: "M50 46 C 60 60, 72 76, 82 83", faint: true },
] as const;

const BARS = [38, 52, 44, 66, 58, 80, 72] as const;
const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;

function SystemVisual({ settled }: { settled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0, sx: 50, sy: 50 });
  const reduced = usePrefersReducedMotion();
  const [viewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once: false });
  const { exchange, text, typing } = useTypewriter(hero.visual.ai.exchanges, inView, reduced, settled ? 300 : 1700);

  useEffect(() => () => {
    if (frame.current != null) cancelAnimationFrame(frame.current);
  }, []);

  const flush = useCallback(() => {
    frame.current = null;
    const node = ref.current;
    if (!node) return;
    const p = pending.current;
    node.style.setProperty("--sh-mx", p.x.toFixed(3));
    node.style.setProperty("--sh-my", p.y.toFixed(3));
    node.style.setProperty("--sh-sx", `${p.sx.toFixed(1)}%`);
    node.style.setProperty("--sh-sy", `${p.sy.toFixed(1)}%`);
  }, []);

  const queue = useCallback((x: number, y: number) => {
    pending.current = { x, y, sx: (x + 1) * 50, sy: (y + 1) * 50 };
    if (frame.current == null) frame.current = requestAnimationFrame(flush);
  }, [flush]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    queue(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
  }, [queue, reduced]);

  const onPointerLeave = useCallback(() => queue(0, 0), [queue]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
    (viewRef as { current: HTMLDivElement | null }).current = node;
  }, [viewRef]);

  const { web, systems, ai, terminal, build } = hero.visual;

  return (
    <div
      ref={setRefs}
      className={`oveliq-shero__visual${settled ? " is-settled" : ""}${inView ? "" : " is-paused"}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ ["--sh-mx" as string]: 0, ["--sh-my" as string]: 0, ["--sh-sx" as string]: "50%", ["--sh-sy" as string]: "50%" } as CSSProperties}
      aria-hidden="true"
    >
      <div className="oveliq-shero__spot" />

      <svg className="oveliq-shero__wires" viewBox="0 0 100 92" preserveAspectRatio="none" focusable="false">
        {WIRES.map((w) => (
          <g key={w.id} className={`oveliq-shero__wire${"faint" in w ? " oveliq-shero__wire--faint" : ""}`}>
            <path className="oveliq-shero__wire-base" d={w.d} pathLength={100} vectorEffect="non-scaling-stroke" />
            {!("faint" in w) && (
              <path className={`oveliq-shero__wire-signal oveliq-shero__wire-signal--${w.id}`} d={w.d} pathLength={100} vectorEffect="non-scaling-stroke" />
            )}
          </g>
        ))}
      </svg>

      {/* Core node */}
      <div className="oveliq-shero__node oveliq-shero__depth" style={{ ["--depth" as string]: 0.4 } as CSSProperties}>
        <span className="oveliq-shero__orbit oveliq-shero__orbit--outer" />
        <span className="oveliq-shero__orbit oveliq-shero__orbit--inner" />
        <span className="oveliq-shero__pulse" />
        <span className="oveliq-shero__core">
          <OveliqtLogo variant="symbol" className="oveliq-shero__core-logo" />
        </span>
      </div>

      {/* Web card */}
      <div className="oveliq-shero__card oveliq-shero__card--web oveliq-shero__depth" style={{ ["--depth" as string]: 1.1, ["--enter" as string]: "0ms" } as CSSProperties}>
        <div className="oveliq-shero__chrome">
          <span className="oveliq-shero__dots"><i /><i /><i /></span>
          <span className="oveliq-shero__url">{web.url}</span>
          <span className="oveliq-shero__live"><b />{web.status}</span>
        </div>
        <div className="oveliq-shero__site">
          <div className="oveliq-shero__site-nav"><i /><span><i /><i /><i /></span></div>
          <div className="oveliq-shero__site-body">
            <div className="oveliq-shero__site-copy">
              <i className="w-90" /><i className="w-70" /><i className="w-50 thin" />
              <span className="oveliq-shero__site-btn" />
            </div>
            <div className="oveliq-shero__site-media" />
          </div>
        </div>
        <span className="oveliq-shero__tag">{web.tag}</span>
      </div>

      {/* Systems card */}
      <div className="oveliq-shero__card oveliq-shero__card--systems oveliq-shero__depth" style={{ ["--depth" as string]: 1.5, ["--enter" as string]: "120ms" } as CSSProperties}>
        <div className="oveliq-shero__card-head">
          <span className="oveliq-shero__card-title">{systems.title}</span>
          <span className="oveliq-shero__tag oveliq-shero__tag--inline">{systems.tag}</span>
        </div>
        <span className="oveliq-shero__caption">{systems.caption}</span>
        <div className="oveliq-shero__chart">
          {BARS.map((h, i) => (
            <span key={i} className="oveliq-shero__bar" style={{ ["--h" as string]: `${h}%`, ["--i" as string]: i } as CSSProperties}>
              <i />
              <em>{DAYS[i]}</em>
            </span>
          ))}
          <svg className="oveliq-shero__spark" viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
            <path d="M2 30 L18 24 L34 27 L50 15 L66 19 L82 8 L98 11" pathLength={100} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>

      {/* AI card */}
      <div className="oveliq-shero__card oveliq-shero__card--ai oveliq-shero__depth" style={{ ["--depth" as string]: 1.25, ["--enter" as string]: "240ms" } as CSSProperties}>
        <div className="oveliq-shero__card-head">
          <span className="oveliq-shero__agent"><b />{ai.status}</span>
          <span className="oveliq-shero__tag oveliq-shero__tag--inline">{ai.tag}</span>
        </div>
        <p key={exchange.prompt} className="oveliq-shero__prompt">{exchange.prompt}</p>
        <p className="oveliq-shero__reply">
          <span className="oveliq-shero__reply-mark">
            <svg viewBox="0 0 40 40" focusable="false">
              {[0, 60, 120].map((deg) => (
                <rect key={deg} x="16" y="3" width="8" height="34" rx="1.5" transform={`rotate(${deg} 20 20)`} />
              ))}
            </svg>
          </span>
          <span className="oveliq-shero__reply-text">
            {text}
            <span className={`oveliq-shero__caret${typing ? " is-typing" : ""}`} />
          </span>
        </p>
      </div>

      {/* Status chips */}
      <div className="oveliq-shero__chip oveliq-shero__chip--terminal oveliq-shero__depth" style={{ ["--depth" as string]: 1.9, ["--enter" as string]: "360ms" } as CSSProperties}>
        <span className="oveliq-shero__prompt-sign">$</span>
        {terminal}
        <span className="oveliq-shero__check">✓</span>
      </div>
      <div className="oveliq-shero__chip oveliq-shero__chip--build oveliq-shero__depth" style={{ ["--depth" as string]: 1.7, ["--enter" as string]: "440ms" } as CSSProperties}>
        <span className="oveliq-shero__build-dot" />
        {build}
      </div>
    </div>
  );
}

export default function SystemHeroSection() {
  const [intro] = useState(heroIntroMode);
  const trigger = intro === "play" ? "load" : "none";
  const settled = intro === "skip";

  return (
    <section
      className={`oveliq-shero${settled ? " is-settled" : ""}`}
      aria-labelledby="oveliq-shero-heading"
      data-oveliq-motion="hero"
    >
      <div className="oveliq-shero__bg" aria-hidden="true">
        <span className="oveliq-shero__grid" />
        <span className="oveliq-shero__glow oveliq-shero__glow--a" />
        <span className="oveliq-shero__glow oveliq-shero__glow--b" />
      </div>

      <div className="oveliq-shero__inner">
        <div className="oveliq-shero__main">
          <div className="oveliq-shero__copy">
            <Reveal as="p" className="oveliq-shero__status" trigger={trigger} delayMs={80}>
              <span className="oveliq-shero__status-dot" aria-hidden="true" />
              {hero.status}
            </Reveal>
            <RevealLines
              as="h1"
              id="oveliq-shero-heading"
              className="oveliq-shero__headline"
              lines={hero.headlineLines}
              lineClassNames={hero.headlineLines.map((_, i) => (i === hero.accentLine ? "oveliq-shero__line--accent" : ""))}
              delayMs={160}
              staggerMs={90}
              trigger={trigger}
            />
            <Reveal as="p" className="oveliq-shero__description" trigger={trigger} delayMs={440}>
              {hero.description}
            </Reveal>
            <Reveal className="oveliq-shero__actions" trigger={trigger} delayMs={540}>
              <a className="oveliq-shero__cta oveliq-shero__cta--primary group" href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
                <CtaArrow />
              </a>
              <a className="oveliq-shero__cta oveliq-shero__cta--secondary group" href={hero.secondaryCta.href}>
                <span>{hero.secondaryCta.label}</span>
                <CtaArrow />
              </a>
            </Reveal>
            <Reveal className="oveliq-shero__stack" trigger={trigger} delayMs={680}>
              <span className="oveliq-shero__stack-label">{hero.stackLabel}</span>
              <ul>
                {hero.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <SystemVisual settled={settled} />
        </div>

        <ul className="oveliq-shero__strip" aria-label="What we do">
          {hero.capabilities.map((item, i) => (
            <Reveal as="li" key={item.index} className="oveliq-shero__capability" trigger={trigger} delayMs={820 + i * 80}>
              <a href={item.href} className="group">
                <span className="oveliq-shero__cap-index">{item.index}</span>
                <span className="oveliq-shero__cap-body">
                  <span className="oveliq-shero__cap-title">{item.title}</span>
                  <span className="oveliq-shero__cap-text">{item.text}</span>
                </span>
                <CtaArrow className="oveliq-shero__cap-arrow" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
