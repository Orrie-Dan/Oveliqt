/**
 * Oveliqt motion foundation.
 *
 * Transform composition:
 *   outer `.oveliq-parallax`  → scroll-linked translate (--parallax-*)
 *   inner `.oveliq-reveal*`   → entrance opacity/translate
 *   `.oveliq-media-reveal__media` → scale only inside overflow clip
 *
 * Debug: set `document.documentElement.dataset.oveliqMotionDebug = ''`
 */

export { Reveal } from "./reveal";
export { RevealLines } from "./reveal-lines";
export { ManifestoLines } from "./manifesto-lines";
export { MediaReveal } from "./media-reveal";
export { MediaCrossfade } from "./media-crossfade";
export { StickyScene } from "./sticky-scene";
export { DifferenceTitle } from "./difference-title";
export { MaskHover, oveliqMaskRestStyle } from "./mask-hover";
export { ScrollParallax } from "./scroll-parallax";
export { ParallaxRatio } from "./parallax-ratio";
export { RevealSplit } from "./reveal-split";
export { RollingNumber } from "./rolling-number";
export { useParallax } from "./hooks/use-parallax";
export { useInView } from "./hooks/use-in-view";
export { useScrollProgress } from "./hooks/use-scroll-progress";
export { useScrollFrame } from "./hooks/use-scroll-frame";
export { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";
