import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { OveliqService } from "../content";
import { cn } from "../../lib/utils";
import {
  DifferenceTitle,
  MediaCrossfade,
  usePrefersReducedMotion,
} from "../motion";
import ServiceVisual from "./service-visual";
import ArrowRight from "./arrow-right";

type ServicesShowcaseProps = {
  services: readonly OveliqService[];
};

/**
 * Interactive six-service showcase.
 *
 * Desktop (≥1100px): editorial theater — selector + media stage + difference title.
 * Below: accordion (one open).
 *
 * Hover decision: on fine-pointer hover devices, pointer-enter selects the service
 * (same as Spector). Click and keyboard remain authoritative; leaving the list
 * keeps the last active service.
 *
 * Single state: `activeId`. Title/media transition layers live inside local
 * primitives so rapid selection always converges on the latest id.
 */
export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const listId = useId();
  const panelId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = usePrefersReducedMotion();
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const activeIndex = Math.max(
    0,
    services.findIndex((s) => s.id === activeId),
  );
  const active = services[activeIndex] ?? services[0];
  const progressPct = services.length
    ? ((activeIndex + 1) / services.length) * 100
    : 0;

  const select = useCallback(
    (id: string, focusTab = false) => {
      const nextIndex = services.findIndex((s) => s.id === id);
      if (nextIndex < 0) return;
      setActiveId(id);
      if (focusTab) {
        requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
      }
    },
    [services],
  );

  const onTabListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!services.length) return;
      let next = activeIndex;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next = (activeIndex + 1) % services.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        next = (activeIndex - 1 + services.length) % services.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = services.length - 1;
      } else if (e.key === "Enter" || e.key === " ") {
        // Roving tabindex already on active; Enter/Space activate focused tab via click.
        return;
      } else {
        return;
      }
      select(services[next].id, true);
    },
    [activeIndex, select, services],
  );

  if (!active) return null;

  const progressStyle = {
    ["--svc-progress" as string]: `${progressPct}%`,
  };

  return (
    <div
      className="oveliq-svc-root w-full relative shrink-0"
      data-oveliq-motion="services-showcase"
      style={progressStyle}
    >
      {/* —— Desktop theater —— */}
      <div className="oveliq-svc-theater">
        <div className="oveliq-svc-theater__rail">
          <div
            className="oveliq-svc-theater__list"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Services"
            id={listId}
            onKeyDown={onTabListKeyDown}
          >
            {services.map((service, index) => {
              const isActive = service.id === active.id;
              const tabId = `${listId}-${service.id}`;
              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    "oveliq-svc-row",
                    isActive && "oveliq-svc-row--active",
                  )}
                  onClick={() => select(service.id)}
                  onPointerEnter={
                    fineHover ? () => select(service.id) : undefined
                  }
                >
                  <span className="oveliq-svc-row__marker" aria-hidden="true" />
                  <span className="oveliq-svc-row__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="oveliq-svc-row__label">{service.title}</span>
                </button>
              );
            })}
          </div>

          <div className="oveliq-svc-theater__desc">
            <ServiceCopy
              key={`desc-${active.id}`}
              reduced={reducedMotion}
              className="oveliq-svc-theater__desc-label"
            >
              <span className="oveliq-svc-theater__desc-dot" aria-hidden="true" />
              <p id={`${panelId}-desc`}>{active.description}</p>
            </ServiceCopy>
            <a className="oveliq-svc-detail-link" href={`/services/${active.id}`}>
              Explore this service <ArrowRight />
            </a>
          </div>
        </div>

        <div
          className="oveliq-svc-theater__stage"
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${listId}-${active.id}`}
        >
          <div className="oveliq-svc-theater__media">
            <MediaCrossfade activeKey={active.id} className="oveliq-svc-media-fade">
              {services.map((service) => (
                <div key={service.id} className="absolute inset-0">
                  <ServiceVisual
                    variant={service.visual}
                    src={service.mediaSrc}
                    alt={service.mediaAlt}
                  />
                </div>
              ))}
            </MediaCrossfade>
          </div>

          <div className="oveliq-svc-theater__side">
            <ServiceCopy
              key={`caps-${active.id}`}
              reduced={reducedMotion}
              as="ul"
              className="oveliq-svc-theater__caps"
            >
              {active.capabilities.map((cap) => (
                <li key={cap}>{cap}</li>
              ))}
            </ServiceCopy>

            <ServiceIndexReel
              value={active.number}
              reduced={reducedMotion}
            />
          </div>

          <div
            className="oveliq-svc-progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={services.length}
            aria-valuenow={activeIndex + 1}
            aria-label={`Service ${activeIndex + 1} of ${services.length}`}
          >
            <div className="oveliq-svc-progress__fill" />
          </div>
        </div>

        <div className="oveliq-svc-theater__title" aria-hidden="true">
          <ServiceTitleSwap
            activeKey={active.id}
            lines={active.displayLines}
            services={services}
            reduced={reducedMotion}
          />
        </div>
      </div>

      {/* —— Accordion —— */}
      <div className="oveliq-svc-accordion">
        {services.map((service, index) => {
          const isOpen = service.id === active.id;
          const regionId = `${panelId}-m-${service.id}`;
          const buttonId = `${listId}-m-${service.id}`;
          return (
            <div
              key={service.id}
              className={cn("oveliq-svc-acc", isOpen && "oveliq-svc-acc--open")}
            >
              <button
                type="button"
                className="oveliq-svc-acc__trigger"
                aria-expanded={isOpen}
                aria-controls={regionId}
                id={buttonId}
                onClick={() => select(service.id)}
              >
                <span className="oveliq-svc-acc__trigger-main">
                  <span className="oveliq-svc-acc__num">{service.number}</span>
                  <span className="oveliq-svc-acc__title">{service.title}</span>
                </span>
                <span className="oveliq-svc-acc__icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                id={regionId}
                role="region"
                aria-labelledby={buttonId}
                className="oveliq-svc-acc__panel"
              >
                <div className="oveliq-svc-acc__panel-inner">
                  <div
                    className="oveliq-svc-acc__body"
                    style={
                      {
                        ["--svc-progress" as string]: `${((index + 1) / services.length) * 100}%`,
                      } as CSSProperties
                    }
                  >
                    {isOpen ? (
                      <>
                        <div className="oveliq-svc-acc__visual">
                          <ServiceVisual
                            variant={service.visual}
                            src={service.mediaSrc}
                            alt={service.mediaAlt}
                          />
                          <div className="oveliq-svc-acc__progress" aria-hidden="true">
                            <span />
                          </div>
                        </div>
                        <p className="oveliq-svc-acc__display">
                          {service.displayLines.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </p>
                        <p className="oveliq-svc-acc__desc">{service.description}</p>
                        <ul className="oveliq-svc-acc__caps">
                          {service.capabilities.map((cap) => (
                            <li key={cap}>{cap}</li>
                          ))}
                        </ul>
                        <a className="oveliq-svc-detail-link" href={`/services/${service.id}`}>
                          Explore this service <ArrowRight />
                        </a>
                        <p className="oveliq-svc-acc__index" aria-hidden="true">
                          {`.${service.number}`}
                        </p>
                      </>
                    ) : (
                      <div className="h-0" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceCopy({
  children,
  className,
  reduced,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  reduced: boolean;
  as?: "div" | "ul";
}) {
  const [settled, setSettled] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setSettled(true);
      return;
    }
    setSettled(false);
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    <Tag
      className={cn(
        "oveliq-svc-copy",
        settled && "is-settled",
        className,
      )}
      data-reduced={reduced ? "true" : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Clipped vertical number reel (.01 → .06).
 * Max two layers; latest selection wins.
 */
function ServiceIndexReel({
  value,
  reduced,
}: {
  value: string;
  reduced: boolean;
}) {
  const [current, setCurrent] = useState(value);
  const [outgoing, setOutgoing] = useState<string | null>(null);
  const currentRef = useRef(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === currentRef.current) return;

    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (reduced) {
      setOutgoing(null);
      currentRef.current = value;
      setCurrent(value);
      return;
    }

    const previous = currentRef.current;
    setOutgoing(previous);
    currentRef.current = value;
    setCurrent(value);
    timerRef.current = window.setTimeout(() => {
      setOutgoing((key) => (key === previous ? null : key));
      timerRef.current = null;
    }, 360);
  }, [value, reduced]);

  const keys =
    outgoing && outgoing !== current ? [outgoing, current] : [current];

  return (
    <div
      className="oveliq-svc-index-reel"
      aria-hidden="true"
      data-reduced={reduced ? "true" : undefined}
    >
      {keys.map((key) => {
        const isActive = key === current;
        const isExit = key === outgoing;
        return (
          <span
            key={key}
            className={cn(
              "oveliq-svc-index-reel__layer",
              isActive && "is-active",
              isExit && "is-exit",
            )}
          >
            {`.${key}`}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Clipped multiline title crossfade.
 * Each display line has its own overflow mask; enter from below / exit up.
 * Max previous + current title layers — latest activeKey always wins.
 */
function ServiceTitleSwap({
  activeKey,
  lines,
  services,
  reduced,
}: {
  activeKey: string;
  lines: readonly string[];
  services: readonly OveliqService[];
  reduced: boolean;
}) {
  const [currentKey, setCurrentKey] = useState(activeKey);
  const [outgoingKey, setOutgoingKey] = useState<string | null>(null);
  const currentKeyRef = useRef(activeKey);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
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
    setOutgoingKey(previous);
    currentKeyRef.current = activeKey;
    setCurrentKey(activeKey);
    exitTimerRef.current = window.setTimeout(() => {
      setOutgoingKey((key) => (key === previous ? null : key));
      exitTimerRef.current = null;
    }, 480);
  }, [activeKey, reduced]);

  const keys =
    outgoingKey && outgoingKey !== currentKey
      ? [outgoingKey, currentKey]
      : [currentKey];

  const linesFor = (key: string) =>
    services.find((s) => s.id === key)?.displayLines ?? lines;

  return (
    <div className="oveliq-svc-title">
      {keys.map((key) => {
        const isActive = key === currentKey;
        const isExit = key === outgoingKey;
        const titleLines = linesFor(key);
        return (
          <div
            key={key}
            className={cn(
              "oveliq-svc-title__layer",
              isActive && "is-active",
              isExit && "is-exit",
            )}
            data-reduced={reduced ? "true" : undefined}
          >
            <DifferenceTitle className="oveliq-svc-title__difference">
              {titleLines.map((line, index) => (
                <span
                  key={`${key}-${line}`}
                  className="oveliq-svc-title__line-mask"
                  style={
                    {
                      ["--svc-line-i" as string]: index,
                    } as CSSProperties
                  }
                >
                  <span className="oveliq-svc-title__line">{line}</span>
                </span>
              ))}
            </DifferenceTitle>
          </div>
        );
      })}
    </div>
  );
}
