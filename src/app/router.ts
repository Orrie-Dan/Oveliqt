/**
 * Minimal pathname router — the site is a handful of static pages linked with
 * plain anchors, so each navigation is a full document load (intro
 * motion and scroll restoration all start clean). Static hosts must rewrite
 * unknown paths to `/index.html` (Vite dev/preview already do).
 */
import { headTags, type RouteMeta } from "./seo";

export type OveliqRoute =
  | { name: "home" }
  | { name: "work" }
  | { name: "project"; slug: string }
  | { name: "services" }
  | { name: "service"; slug: string }
  | { name: "pricing" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "not-found" };

const staticRoutes: Record<string, OveliqRoute> = {
  "/": { name: "home" },
  "/work": { name: "work" },
  "/services": { name: "services" },
  "/pricing": { name: "pricing" },
  "/about": { name: "about" },
  "/contact": { name: "contact" },
};

/** `/about/` and `/about` resolve to the same route. */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function currentPath(): string {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

/** Project and service slugs are validated against content in `App.tsx` (unknown → 404). */
export function resolveRoute(pathname: string): OveliqRoute {
  const path = normalizePath(pathname);
  const project = /^\/work\/([a-z0-9-]+)$/.exec(path);
  if (project) return { name: "project", slug: project[1] };
  const service = /^\/services\/([a-z0-9-]+)$/.exec(path);
  if (service) return { name: "service", slug: service[1] };
  return staticRoutes[path] ?? { name: "not-found" };
}

/** Nav items are active on their own page and its children (hash links never are). */
export function isActivePath(href: string, pathname: string): boolean {
  if (!href.startsWith("/") || href.includes("#")) return false;
  const target = normalizePath(href);
  const path = normalizePath(pathname);
  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
}

/** Sync title, description, canonical and social tags with the current route (see `seo.ts`). */
export function applyPageMeta(meta: RouteMeta) {
  document.title = meta.title;
  for (const [selector, attribute, value] of headTags(meta)) {
    const element = document.querySelector(selector);
    if (value === null) element?.remove();
    else element?.setAttribute(attribute, value);
  }
}
