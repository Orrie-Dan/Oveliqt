import ArrowUpRight from "./arrow-up-right";
import { cn } from "../../lib/utils";

type CtaArrowProps = {
  className?: string;
};

/**
 * Dual-layer arrow for mask/hover CTAs.
 * Rest layer exits diagonally; hover layer enters from the opposite corner.
 * Requires a `.group` ancestor. Pointer-fine hover only (see CSS).
 */
export default function CtaArrow({ className }: CtaArrowProps) {
  return (
    <span className={cn("oveliq-cta-arrow", className)} aria-hidden="true">
      <span className="oveliq-cta-arrow__layer oveliq-cta-arrow__layer--rest">
        <ArrowUpRight className="oveliq-cta-arrow__icon" />
      </span>
      <span className="oveliq-cta-arrow__layer oveliq-cta-arrow__layer--hover">
        <ArrowUpRight className="oveliq-cta-arrow__icon" />
      </span>
    </span>
  );
}
