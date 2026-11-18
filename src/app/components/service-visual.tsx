import type { OveliqServiceVisual } from "../content";
import { cn } from "../../lib/utils";

type ServiceVisualProps = {
  variant: OveliqServiceVisual;
  src?: string;
  alt?: string;
  className?: string;
};

const SERVICE_MEDIA: Record<
  OveliqServiceVisual,
  { src: string; alt: string }
> = {
  web: {
    src: "/assets/services/web-development.jpg",
    alt: "Layered translucent interface panes with an Oveliqt web composition on a light editorial field",
  },
  software: {
    src: "/assets/services/software-development.jpg",
    alt: "Vertical modular slabs with a red core glow suggesting structured software systems",
  },
  mobile: {
    src: "/assets/services/mobile-applications.jpg",
    alt: "Smartphone composition over geometric forms on a light editorial field",
  },
  ai: {
    src: "/assets/services/ai-machine-learning.jpg",
    alt: "Network of nodes and red particle cluster representing machine learning systems",
  },
  data: {
    src: "/assets/services/data-analytics.jpg",
    alt: "Glass chart panes rising from a stone base representing data analytics",
  },
  automation: {
    src: "/assets/services/automation-integrations.jpg",
    alt: "Connected cubes in a glass conduit representing automation pipelines",
  },
};

/**
 * Service theater media. Decorative in context — parent exposes accessible naming.
 * Uses extracted Oveliqt editorial panels (visual crop, titles live in the theater).
 */
export default function ServiceVisual({
  variant,
  src,
  alt,
  className,
}: ServiceVisualProps) {
  const media = SERVICE_MEDIA[variant];
  const imageSrc = src ?? media.src;
  const imageAlt = alt ?? media.alt;

  return (
    <div
      className={cn(
        "oveliq-service-visual absolute inset-0 overflow-hidden",
        `oveliq-service-visual--${variant}`,
        className,
      )}
      aria-hidden="true"
      data-variant={variant}
    >
      <img
        className="oveliq-service-visual__img"
        src={imageSrc}
        alt={imageAlt}
        width={1448}
        height={1086}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
