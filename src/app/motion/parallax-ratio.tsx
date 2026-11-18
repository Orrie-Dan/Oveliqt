import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useScrollFrame } from "./hooks/use-scroll-frame";

export type ParallaxRatioProps = {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /**
   * Fraction of scroll distance to translate by. Spector evidence:
   * detail hero title 0.5, lower row 0.4, about hero image −0.3, full-bleed media −0.1.
   */
  ratio: number;
  /**
   * `top` — distance scrolled past the parent's top (heroes; 0 until it starts leaving).
   * `center` — parent centre vs viewport centre (in-flow media; symmetric travel).
   */
  anchor?: "top" | "center";
};

/**
 * Speed-ratio parallax: translateY = ratio × scroll distance, measured on the
 * nearest `[data-parallax-host]` ancestor (else the parent) so this node's own
 * transform never feeds back into the math.
 * Owns its transform — put reveals on a child, never on this node.
 */
export function ParallaxRatio({
  children,
  as: Tag = "div",
  className = "",
  style,
  ratio,
  anchor = "top",
}: ParallaxRatioProps) {
  const ref = useRef<HTMLElement>(null);

  useScrollFrame(
    () => {
      const el = ref.current;
      const host = el?.closest<HTMLElement>("[data-parallax-host]") ?? el?.parentElement;
      if (!el || !host) return;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const distance =
        anchor === "top"
          ? Math.max(0, -rect.top)
          : vh / 2 - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(0, ${(distance * ratio).toFixed(2)}px, 0)`;
    },
    {
      onReduced: () => {
        if (ref.current) ref.current.style.transform = "";
      },
    },
  );

  return (
    <Tag
      ref={ref}
      className={`oveliq-parallax-ratio ${className}`.trim()}
      style={style}
      data-oveliq-motion="parallax-ratio"
    >
      {children}
    </Tag>
  );
}
