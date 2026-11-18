import { useCallback } from "react";
import { oveliqPhilosophy } from "../content";
import { StickyScene } from "../motion";
import "./brand-philosophy.css";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/** Piecewise 0→1 across [a, b]. */
function span(p: number, a: number, b: number) {
  if (b <= a) return p >= b ? 1 : 0;
  return clamp01((p - a) / (b - a));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clearPhilosophyVars(host: HTMLElement) {
  [
    "--phil-a-opacity",
    "--phil-a-y",
    "--phil-a-scale",
    "--phil-b-opacity",
    "--phil-b-y",
    "--phil-b-scale",
    "--phil-support-opacity",
    "--phil-support-y",
    "--phil-geo-rot",
    "--phil-geo-y",
    "--phil-grid-opacity",
  ].forEach((key) => host.style.removeProperty(key));
}

/**
 * Map sticky progress → CSS variables on the scene host.
 * Conceptual phases (tuned visually — not user-facing):
 *   0.00–0.12  settle (statement A already present)
 *   0.12–0.38  statement A dominates / drifts
 *   0.38–0.64  transformation (A out by 0.50, then B in)
 *   0.58–0.82  statement B dominates
 *   0.82–1.00  supporting + release
 */
function writePhilosophyVars(host: HTMLElement, p: number) {
  const settle = span(p, 0, 0.12);
  // Sequential hand-off: A fully clears before B arrives, so the two never smear together.
  const aExit = span(p, 0.38, 0.5);
  const bEnter = span(p, 0.5, 0.64);
  const supportEnter = span(p, 0.82, 0.94);

  // A is readable from frame one — settle only nudges position/scale.
  const aOpacity = 1 - aExit;
  const aY = lerp(lerp(3, 0, settle), -22, span(p, 0.12, 0.58));
  const aScale = lerp(1, 0.92, aExit);

  const bOpacity = bEnter;
  const bY = lerp(22, 0, bEnter);
  const bScale = lerp(1.04, 1, bEnter);

  const supportOpacity = supportEnter;
  const supportY = lerp(1.25, 0, supportEnter);

  const geoRot = lerp(-8, -4.5, p);
  const geoY = lerp(0, -4, p);
  const gridOpacity = lerp(0.12, 0.2, span(p, 0, 0.5));

  host.style.setProperty("--phil-a-opacity", aOpacity.toFixed(4));
  host.style.setProperty("--phil-a-y", `${aY.toFixed(2)}%`);
  host.style.setProperty("--phil-a-scale", aScale.toFixed(4));
  host.style.setProperty("--phil-b-opacity", bOpacity.toFixed(4));
  host.style.setProperty("--phil-b-y", `${bY.toFixed(2)}%`);
  host.style.setProperty("--phil-b-scale", bScale.toFixed(4));
  host.style.setProperty("--phil-support-opacity", supportOpacity.toFixed(4));
  host.style.setProperty("--phil-support-y", `${supportY.toFixed(3)}rem`);
  host.style.setProperty("--phil-geo-rot", `${geoRot.toFixed(2)}deg`);
  host.style.setProperty("--phil-geo-y", `${geoY.toFixed(2)}%`);
  host.style.setProperty("--phil-grid-opacity", gridOpacity.toFixed(4));
}

/**
 * Sticky brand philosophy moment.
 * Desktop/tablet: StickyScene scrub. Mobile + reduced motion: stacked flow.
 * Typography is the experience — no video, particles, or WebGL.
 */
export default function BrandPhilosophySection() {
  const { linesA, linesB, supporting } = oveliqPhilosophy;

  const onProgress = useCallback((p: number, host: HTMLElement) => {
    if (host.dataset.collapsed === "true" || host.dataset.reduced === "true") {
      clearPhilosophyVars(host);
      return;
    }
    writePhilosophyVars(host, p);
  }, []);

  return (
    <section id="philosophy" className="w-full" aria-labelledby="philosophy-heading">
      <h2 id="philosophy-heading" className="sr-only">
        We don&apos;t just write code. We solve problems.
      </h2>

      <StickyScene
        height="var(--phil-scene-height)"
        className="oveliq-philosophy-scene"
        stickyClassName="oveliq-philosophy"
        collapseBelow={768}
        onProgress={onProgress}
      >
        <div className="oveliq-philosophy__field" aria-hidden="true">
          <div className="oveliq-philosophy__grid" />
          <div className="oveliq-philosophy__glow" />
          <div className="oveliq-philosophy__rule" />
        </div>

        <div className="oveliq-philosophy__stage">
          <div className="oveliq-philosophy__stack" aria-hidden="true">
            <div className="oveliq-philosophy__stmt oveliq-philosophy__stmt-a">
              {linesA.map((line) => (
                <p key={line} className="oveliq-philosophy__line" dir="auto">
                  {line}
                </p>
              ))}
            </div>
            <div className="oveliq-philosophy__stmt oveliq-philosophy__stmt-b">
              {linesB.map((line) => (
                <p
                  key={line}
                  className={
                    line === "PROBLEMS."
                      ? "oveliq-philosophy__line oveliq-philosophy__line--accent"
                      : "oveliq-philosophy__line"
                  }
                  dir="auto"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="oveliq-philosophy__support">
            <div className="oveliq-philosophy__support-rule" aria-hidden="true" />
            <p className="oveliq-philosophy__support-copy" dir="auto">
              {supporting}
            </p>
          </div>
        </div>
      </StickyScene>
    </section>
  );
}
