import { useEffect, useRef } from "react";
import "./custom-cursor.css";

const INTERACTIVE = 'a[href], button:not([disabled]), [role="button"], summary, label[for], select';
const TEXT_FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]';

/**
 * Brand cursor for fine pointers: a dot that tracks the pointer exactly and a
 * ring that trails it and expands over interactive elements. Text fields keep
 * the native caret. Touch / coarse pointers never mount it (no `has-cursor`).
 * Positions are written straight to the DOM; no React state per frame.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;

    const render = () => {
      raf = 0;
      // Ring eases toward the pointer; reduced motion snaps it.
      const k = reduced ? 1 : 0.2;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) raf = requestAnimationFrame(render);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      x = e.clientX;
      y = e.clientY;
      root.classList.add("cursor-visible");
      const target = e.target instanceof Element ? e.target : null;
      root.classList.toggle("cursor-hover", Boolean(target?.closest(INTERACTIVE)));
      root.classList.toggle("cursor-text", Boolean(target?.closest(TEXT_FIELD)));
      schedule();
    };
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");
    const onLeave = () => root.classList.remove("cursor-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("has-cursor", "cursor-visible", "cursor-hover", "cursor-text", "cursor-down");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="oveliq-cursor oveliq-cursor--ring" aria-hidden="true"><span /></div>
      <div ref={dotRef} className="oveliq-cursor oveliq-cursor--dot" aria-hidden="true"><span /></div>
    </>
  );
}
