/**
 * Single source for per-route SEO metadata.
 *
 * Used at runtime by `App.tsx` (keeps tags right while the SPA renders) and at
 * build time by the `oveliq-seo` plugin in `vite.config.ts`, which writes
 * `dist/<route>/index.html` with these tags pre-filled plus `sitemap.xml` and
 * `robots.txt`. Keep this module free of browser-only code and CSS imports.
 */
import {
  oveliqPageMeta,
  oveliqPrivacyPage,
  oveliqProjectDetails,
  oveliqServicePages,
  oveliqTermsPage,
} from "./content";
import { SITE_ORIGIN } from "../lib/site";

export type RouteMeta = {
  /** Normalised pathname, e.g. `/` or `/work/ecobe`. */
  path: string;
  title: string;
  description: string;
  /** Site-relative image path used for Open Graph / Twitter cards. */
  image: string;
  /** Not-found and other non-indexable pages: robots noindex, no canonical. */
  noindex?: boolean;
};

export const SITE_NAME = "Oveliqt";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const homeMeta: RouteMeta = {
  path: "/",
  title: "Oveliqt — Software, AI & Digital Products",
  description:
    "Oveliqt designs and develops websites, software, digital products, AI systems, data solutions and business automation.",
  image: DEFAULT_OG_IMAGE,
};

const staticPages = ["work", "services", "pricing", "about", "contact"] as const;

/** Every indexable route (excludes the 404 page). */
export function allRouteMeta(): RouteMeta[] {
  const frenchServiceTitles: Record<string, string> = {
    "web-development": "Développement web",
    "software-development": "Développement logiciel",
    "mobile-applications": "Applications mobiles",
    "ai-machine-learning": "IA et apprentissage automatique",
    "data-analytics": "Données et analytique",
    "automation-integrations": "Automatisation et intégrations",
  };
  const frenchPages = [
    ["/fr", "Oveliqt — Studio logiciel & IA", "Sites web, logiciels, produits numériques et intelligence artificielle conçus autour de vos besoins."],
    ["/fr/projets", "Projets — Oveliqt", "Découvrez les projets numériques réalisés par Oveliqt."],
    ["/fr/services", "Services — Oveliqt", "Développement web, logiciel, mobile, IA, données et automatisation."],
    ["/fr/tarifs", "Collaborer — Oveliqt", "Choisissez une approche adaptée à votre projet numérique."],
    ["/fr/a-propos", "À propos — Oveliqt", "Découvrez le studio indépendant logiciel et IA Oveliqt."],
    ["/fr/contact", "Contact — Oveliqt", "Parlons de votre projet avec Oveliqt."],
    ["/fr/confidentialite", "Confidentialité — Oveliqt", "Comment Oveliqt traite les données personnelles sur ce site."],
    ["/fr/conditions", "Conditions d’utilisation — Oveliqt", "Les conditions applicables à l’utilisation du site Oveliqt."],
    ...oveliqServicePages.map(({ service }) => {
      const title = frenchServiceTitles[service.id] ?? service.title;
      return [`/fr/services/${service.id}`, `${title} — Oveliqt`, `Découvrez notre offre de ${title.toLowerCase()} en français.`] as const;
    }),
    ...oveliqProjectDetails.items.map((project) => [`/fr/projets/${project.slug}`, `${project.title} — Oveliqt`, `Découvrez le projet ${project.title} réalisé par Oveliqt.`]),
  ] as const;
  return [
    homeMeta,
    ...frenchPages.map(([path, title, description]) => ({
      path, title, description, image: DEFAULT_OG_IMAGE,
      noindex: path === "/fr/confidentialite" ? oveliqPrivacyPage.draft : path === "/fr/conditions" ? oveliqTermsPage.draft : false,
    })),
    ...staticPages.map((name) => ({
      path: `/${name}`,
      title: oveliqPageMeta[name].title,
      description: oveliqPageMeta[name].description,
      image: DEFAULT_OG_IMAGE,
    })),
    // Legal pages stay noindex (and out of the sitemap) until their draft copy is reviewed.
    ...([["privacy", oveliqPrivacyPage], ["terms", oveliqTermsPage]] as const).map(([name, page]) => ({
      path: `/${name}`,
      title: oveliqPageMeta[name].title,
      description: oveliqPageMeta[name].description,
      image: DEFAULT_OG_IMAGE,
      noindex: page.draft,
    })),
    ...oveliqServicePages.map(({ service, detail }) => ({
      path: `/services/${service.id}`,
      title: `${service.title} — ${SITE_NAME}`,
      description: detail.metaDescription,
      image: `/assets/services/editorial-${service.visual}.jpg`,
    })),
    ...oveliqProjectDetails.items.map((project) => ({
      path: `/work/${project.slug}`,
      title: `${project.title} — ${SITE_NAME}`,
      description: project.intro,
      // Social crawlers ignore SVG previews, so vector covers use the default card.
      image: /\.(jpe?g|png|webp)$/i.test(project.mediaSrc) ? project.mediaSrc : DEFAULT_OG_IMAGE,
    })),
  ];
}

export const notFoundMeta: RouteMeta = {
  path: "/404",
  title: oveliqPageMeta.notFound.title,
  description: oveliqPageMeta.notFound.description,
  image: DEFAULT_OG_IMAGE,
  noindex: true,
};

const INDEXABLE_ROBOTS = "max-image-preview:large";

export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}

/**
 * `[selector, attribute, value]` for each head tag a route controls.
 * A `null` value means the tag is removed (canonical on noindex pages).
 */
export function headTags(meta: RouteMeta): ReadonlyArray<readonly [string, string, string | null]> {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image);
  return [
    ['meta[name="description"]', "content", meta.description],
    ['meta[name="robots"]', "content", meta.noindex ? "noindex" : INDEXABLE_ROBOTS],
    ['link[rel="canonical"]', "href", meta.noindex ? null : url],
    ['meta[property="og:title"]', "content", meta.title],
    ['meta[property="og:description"]', "content", meta.description],
    ['meta[property="og:url"]', "content", url],
    ['meta[property="og:image"]', "content", image],
    ['meta[name="twitter:title"]', "content", meta.title],
    ['meta[name="twitter:description"]', "content", meta.description],
    ['meta[name="twitter:image"]', "content", image],
  ];
}
