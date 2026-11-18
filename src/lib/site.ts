/**
 * Public origin used for canonical URLs, Open Graph tags and the sitemap.
 * Override per environment with `VITE_SITE_ORIGIN` (e.g. a staging domain).
 */
const DEFAULT_SITE_ORIGIN = "https://oveliqt.com";

// In the browser bundle Vite inlines `import.meta.env`; when vite.config.ts loads
// this module at build time it is undefined, so fall back to the process env.
const nodeEnv = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env;
const envOrigin: string | undefined = import.meta.env?.VITE_SITE_ORIGIN ?? nodeEnv?.VITE_SITE_ORIGIN;

export const SITE_ORIGIN = (envOrigin || DEFAULT_SITE_ORIGIN).replace(/\/$/, "");
