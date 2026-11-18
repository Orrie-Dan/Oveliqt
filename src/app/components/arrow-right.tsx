import { cn } from "../../lib/utils";

type ArrowRightProps = {
  className?: string;
};

/** Oveliqt-owned process / UI arrow. Stroke inherits currentColor. */
export default function ArrowRight({ className }: ArrowRightProps) {
  return (
    <svg
      className={cn("oveliq-arrow-right block shrink-0", className)}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.75 4.25M12.5 8L8.75 11.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
