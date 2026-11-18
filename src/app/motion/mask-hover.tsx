import type { CSSProperties, ReactNode } from "react";

/**
 * MaskHover — optional consolidation helper for dual-layer text links.
 *
 * IMPORTANT: SiteNav / HeroPrimaryCta keep their Framer-tuned mask gradients.
 * Fidelity > abstraction. Use this helper for *new* dual-layer links only.
 * Migrating nav into this component risks visual regression — do not force it.
 */

export const oveliqMaskRestStyle: CSSProperties = {
  maskImage:
    "linear-gradient(270deg, var(--clr-1) 100%, var(--foreground) 102%, var(--foreground) 108%)",
  WebkitMaskImage:
    "linear-gradient(270deg, var(--clr-1) 100%, var(--foreground) 102%, var(--foreground) 108%)",
};

export type MaskHoverProps = {
  href: string;
  label: string;
  className?: string;
  labelClassName?: string;
  accentClassName?: string;
  onClick?: () => void;
  children?: ReactNode;
};

export function MaskHover({
  href,
  label,
  className = "",
  labelClassName = "",
  accentClassName = "text-accent",
  onClick,
}: MaskHoverProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`oveliq-mask-hover relative inline-flex group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`.trim()}
      data-oveliq-motion="mask-hover"
    >
      <span className="relative inline-flex">
        <span
          className={`absolute inset-0 z-2 flex items-center ${accentClassName} group-hover:[mask-image:var(--oveliq-mask-hover)] group-hover:[-webkit-mask-image:var(--oveliq-mask-hover)]`}
          style={oveliqMaskRestStyle}
          aria-hidden="true"
        >
          {label}
        </span>
        <span className={`relative ${labelClassName}`.trim()}>{label}</span>
      </span>
    </a>
  );
}
