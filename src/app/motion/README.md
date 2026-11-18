# Oveliqt motion foundation

Native stack: CSS tokens + IntersectionObserver + sticky + rAF scroll progress.

No GSAP.

## Native scrolling

Wheel, touch and keyboard scrolling use the browser directly. Lenis was removed from
the runtime after feedback that scrolling took too long to settle. CSS uses
`scroll-behavior: auto`; cross-page hashes and back-to-top use immediate native jumps.
The mobile menu locks body overflow and restores it on close. Scroll hooks listen to
native scroll events and never prevent wheel or touch input.

## Type weight

"Plus Jakarta Sans Variable" is declared at weight 400 only (as Framer ships it). Weight is
driven by `font-variation-settings: "wght" var(--type-wght-*)` tokens in `motion.css` —
never `font-weight`, which would synthesize faux bold on this face.

## Transform composition

| Layer | Class | Responsibility |
|---|---|---|
| Outer | `.oveliq-parallax` | Scroll-linked `--parallax-x/y` |
| Inner | `.oveliq-reveal` / `.oveliq-reveal-line__inner` | Entrance opacity + translate |
| Media | `.oveliq-media-reveal__media` | Scale entrance inside overflow clip |

Never write competing `transform` strings on the same node from two systems.

## Debug

```js
document.documentElement.setAttribute('data-oveliq-motion-debug', '')
```

## MaskHover

`MaskHover` is for **new** dual-layer links. `SiteNav` / `HeroPrimaryCta` retain Framer-tuned masks (fidelity > DRY).

## Hero (MOTION-03)

`HeroSection` owns the opening sequence. Transform ownership:

| Layer | Responsibility |
|---|---|
| `.oveliq-hero` | Static scroll layout; no scroll-linked progress updates |
| `.oveliq-hero__photo` | Mouse parallax only; its animation loop stops once the target is reached |
| `.oveliq-hero__depth-meta` / `__depth-headline` | Normal document movement |
| inner `MediaReveal` / `Reveal` / `RevealLines` | load entrance only |

`heroIntroMode()` skips the opening theater when `scrollY` is already past the hero threshold (restored scroll).

## DittoMotion

Still mounted for the Services `motion-div` reveal. New reveals should use `Reveal` / `RevealLines`. Migrate that anchor in a later phase before removing DittoMotion.

## Inner pages (Spector-measured)

Values come from `references/spector/INNER-PAGES-MOTION.md`. Primitives:

| Primitive | Use |
|---|---|
| `Reveal` `y` / `scale` / `durationMs` / `ease="rise"\|"pop"` | Spector rise (y 20–40, ~600ms ease-out) and pop (y 60, scale 0.8, spring-like) |
| `ParallaxRatio` | translateY = ratio × scroll, measured on nearest `[data-parallax-host]` (hero 0.5 / 0.4, media −0.1, about hero −0.3) |
| `RevealSplit by="words"\|"letters"` | staggered word / letter entrances |
| `RollingNumber` | odometer digits |
| `useScrollFrame` | rAF-throttled scroll callback for custom scroll-linked styles (About emblem) |

All of them no-op under reduced motion.
