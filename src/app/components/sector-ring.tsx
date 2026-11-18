import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import ArrowLeft from "./arrow-left";
import ArrowRight from "./arrow-right";
import "./sector-ring.css";

type SectorRingItem = { id: string; number: string; name: string };

type SectorRingProps = {
  items: readonly SectorRingItem[];
  label: string;
};

/** Pixels of horizontal drag that advance one item. */
const DRAG_STEP = 90;

/**
 * Spector "Our clients" 3D ring: cards on a cylinder (perspective 1700px),
 * rotated with prev/next, drag or arrow keys — it never auto-rotates.
 * The active card faces the viewer; the live region announces it.
 */
export default function SectorRing({ items, label }: SectorRingProps) {
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const count = items.length;
  const step = 360 / count;
  const wrap = (i: number) => ((i % count) + count) % count;
  const go = (delta: number) => setActive((i) => i + delta);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, start: active };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const moved = Math.round((drag.current.x - event.clientX) / DRAG_STEP);
    setActive(drag.current.start + moved);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const current = items[wrap(active)];

  return (
    <div className="oveliq-ring" role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        className="oveliq-ring__stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="oveliq-ring__spinner"
          style={{ ["--ring-rotate" as string]: `${-active * step}deg` } as CSSProperties}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`oveliq-ring__card${wrap(active) === i ? " is-active" : ""}`}
              style={{ ["--ring-angle" as string]: `${i * step}deg` } as CSSProperties}
              aria-hidden={wrap(active) === i ? undefined : true}
            >
              <span className="oveliq-ring__num">{item.number}</span>
              <span className="oveliq-ring__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="oveliq-ring__controls">
        <button type="button" className="oveliq-ring__button" onClick={() => go(-1)} aria-label="Previous sector">
          <ArrowLeft />
        </button>
        <p className="oveliq-ring__status" aria-live="polite">
          {current.number} / {String(count).padStart(2, "0")}
          <span className="sr-only">: {current.name}</span>
        </p>
        <button type="button" className="oveliq-ring__button" onClick={() => go(1)} aria-label="Next sector">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
