import CtaArrow from "./cta-arrow";
import { cn } from "../../lib/utils";
import "./pill-link.css";

type PillLinkProps = {
  href: string;
  label: string;
  tone?: "light" | "dark" | "accent";
  className?: string;
};

/**
 * Rounded outline CTA (Spector "Book a Call" grammar) with the dual-layer arrow.
 */
export default function PillLink({
  href,
  label,
  tone = "light",
  className,
}: PillLinkProps) {
  return (
    <a
      href={href}
      className={cn("oveliq-pill group", `oveliq-pill--${tone}`, className)}
    >
      <span className="oveliq-pill__text">{label}</span>
      <CtaArrow className="oveliq-pill__arrow" />
    </a>
  );
}
