import type { CSSProperties, ElementType, ReactNode } from "react";

export type DifferenceTitleProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Oversized difference-blend title for Services-style overlays.
 * Do not apply sitewide — only where media underneath provides contrast.
 * Fallback: mix-blend-mode normal via CSS @supports.
 */
export function DifferenceTitle({
  children,
  as: Tag = "p",
  className = "",
  style,
}: DifferenceTitleProps) {
  return (
    <Tag
      className={`oveliq-difference-title ${className}`.trim()}
      style={style}
      data-oveliq-motion="difference-title"
    >
      {children}
    </Tag>
  );
}
