/**
 * Opening sequence plays only when the document is still at the hero.
 * A restored scroll position skips it so motion does not replay over mid-page content.
 */
export function heroIntroMode(): "play" | "skip" {
  if (typeof window === "undefined") return "play";
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return "skip";
  const threshold = Math.min(window.innerHeight * 0.35, 320);
  if (window.scrollY > threshold) return "skip";
  return "play";
}
