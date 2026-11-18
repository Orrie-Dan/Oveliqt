import { cn } from "../../lib/utils";

type ArrowUpRightProps = {
  className?: string;
  /** Decorative by default — pair with visible CTA text. */
  title?: string;
};

/**
 * Oveliqt-owned CTA arrow. Stroke inherits currentColor.
 * Replaces broken Ditto/Spector sprite `#svg1350667077_710` / `#svg-1175306889_706`.
 */
export default function ArrowUpRight({ className, title }: ArrowUpRightProps) {
  return (
    <svg
      className={cn("oveliq-arrow-up-right block shrink-0", className)}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M4.25 11.75L11.75 4.25M11.75 4.25H6.25M11.75 4.25V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
