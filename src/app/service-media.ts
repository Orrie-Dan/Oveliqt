import type { OveliqServiceVisual } from "./content";

/** Shared editorial artwork for homepage and service detail rows. */
export function serviceEditorialMedia(visual: OveliqServiceVisual) {
  return {
    src: `/assets/services/editorial-${visual}.jpg`,
    alt: {
      web: "Ivory browser terminal with a red geometric interface",
      software: "Precision modular server with a translucent red core",
      mobile: "White smartphone with a minimal red interface",
      ai: "Ivory machine-vision camera with a black optical lens",
      data: "Glass data columns on a precision aluminum instrument",
      automation: "Machined connectors joined by a sculptural red cable",
    }[visual],
  };
}
