import { useRef, type CSSProperties, type ReactNode } from "react";
import { useParallax } from "./hooks/use-parallax";
import type { ScrollProgressMode } from "./hooks/use-scroll-progress";

export type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  factor?: number;
  travel?: number;
  axis?: "y" | "x";
  disabled?: boolean;
  mode?: ScrollProgressMode;
};

/** Structural parallax wrapper (outer transform layer). */
export function ScrollParallax({
  children,
  className = "",
  style,
  factor = 1,
  travel = 120,
  axis = "y",
  disabled = false,
  mode = "contain",
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { factor, travel, axis, disabled, mode });

  return (
    <div
      ref={ref}
      className={`oveliq-parallax ${className}`.trim()}
      style={style}
      data-oveliq-motion="parallax"
    >
      {children}
    </div>
  );
}
