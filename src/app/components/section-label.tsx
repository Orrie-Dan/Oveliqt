import { cn } from "../../lib/utils";

type SectionLabelProps = {
  number: string;
  className?: string;
  /** Defaults to muted on dark sections; pass text-color-001 for light surfaces. */
  tone?: "on-dark" | "on-light";
};

/** Lightweight numbered section marker: `/ 01` */
export default function SectionLabel({
  number,
  className,
  tone = "on-dark",
}: SectionLabelProps) {
  const toneClass =
    tone === "on-dark" ? "text-color-002/70" : "text-muted";

  return (
    <p
      className={cn(
        "block [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-sm leading-5 tracking-[0.08em] uppercase",
        toneClass,
        className,
      )}
      dir="auto"
    >
      <span className="opacity-60" aria-hidden="true">
        /{" "}
      </span>
      <span>{number.padStart(2, "0")}</span>
    </p>
  );
}
