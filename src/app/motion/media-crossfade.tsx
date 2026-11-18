import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "./hooks/use-prefers-reduced-motion";

export type MediaCrossfadeProps = {
  /** Active slide key — changing it crossfades layers. */
  activeKey: string;
  /** Children must be elements with stable `key` props matching activeKey. */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fixed aspect / size container to prevent layout jump. */
  aspectRatio?: string;
};

/**
 * Opacity + subtle scale crossfade for Services-style media swaps.
 * Keeps previous layer mounted briefly so there is no flash; max 2 layers.
 * Latest `activeKey` always wins — exit timer is not cancelled by dep churn.
 */
export function MediaCrossfade({
  activeKey,
  children,
  className = "",
  style,
  aspectRatio,
}: MediaCrossfadeProps) {
  const reduced = usePrefersReducedMotion();

  const childByKey = useMemo(() => {
    const map = new Map<string, ReactElement>();
    Children.forEach(children, (child) => {
      if (!isValidElement(child) || child.key == null) return;
      map.set(String(child.key), child);
    });
    return map;
  }, [children]);

  const [currentKey, setCurrentKey] = useState(activeKey);
  const [outgoingKey, setOutgoingKey] = useState<string | null>(null);
  const currentKeyRef = useRef(activeKey);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!childByKey.has(activeKey)) return;
    if (activeKey === currentKeyRef.current) return;

    if (exitTimerRef.current != null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (reduced) {
      setOutgoingKey(null);
      currentKeyRef.current = activeKey;
      setCurrentKey(activeKey);
      return;
    }

    const previous = currentKeyRef.current;
    setOutgoingKey(previous === activeKey ? null : previous);
    currentKeyRef.current = activeKey;
    setCurrentKey(activeKey);
    // Match Spector media settle (~450ms) + small buffer before unmount.
    exitTimerRef.current = window.setTimeout(() => {
      setOutgoingKey((key) => (key === previous ? null : key));
      exitTimerRef.current = null;
    }, 480);
  }, [activeKey, childByKey, reduced]);

  const keys =
    outgoingKey && outgoingKey !== currentKey
      ? [outgoingKey, currentKey]
      : [currentKey];

  return (
    <div
      className={`oveliq-media-crossfade ${className}`.trim()}
      style={{ ...style, aspectRatio }}
      data-oveliq-motion="media-crossfade"
      data-reduced={reduced ? "true" : undefined}
    >
      {keys.map((key) => {
        const node = childByKey.get(key);
        if (!node) return null;
        return (
          <div
            key={key}
            className={`oveliq-media-crossfade__layer${key === currentKey ? " is-active" : ""}`}
            aria-hidden={key !== currentKey}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
}
