import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { absoluteUrl, allRouteMeta, headTags, notFoundMeta, type RouteMeta } from "./src/app/seo";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, "dist");

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Rewrite the route-controlled head tags (see `headTags`) in the built index.html. */
function renderHead(html: string, meta: RouteMeta): string {
  let out = html.replace('<html lang="en">', `<html lang="${meta.path.startsWith("/fr") ? "fr" : "en"}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  for (const [selector, attribute, value] of headTags(meta)) {
    // selector shape: tag[key="name"] — matches `<tag key="name" attribute="…" />` on one line
    const [, tag, key, name] = /^(\w+)\[(\w+)="([^"]+)"\]$/.exec(selector)!;
    const pattern = new RegExp(`(<${tag} ${key}="${name}" ${attribute}=")[^"]*(")`);
    if (!pattern.test(out)) throw new Error(`oveliq-seo: index.html is missing ${selector}`);
    out = value === null
      ? out.replace(new RegExp(`[ \\t]*<${tag} ${key}="${name}" [^>]*>\\r?\\n?`), "")
      : out.replace(pattern, `$1${escapeAttr(value)}$2`);
  }
  return out.replace(/("url": ")[^"]*(")/, `$1${absoluteUrl("/")}$2`);
}

/**
 * Writes `dist/<route>/index.html` for every route with its own title,
 * description, canonical and social tags (the body still renders client-side),
 * plus `404.html`, `sitemap.xml` and `robots.txt` from the same route list.
 */
function oveliqSeo(): Plugin {
  return {
    name: "oveliq-seo",
    apply: "build",
    async closeBundle() {
      const template = await readFile(path.join(outDir, "index.html"), "utf8");
      const routes = allRouteMeta();
      for (const meta of routes) {
        const file = path.join(outDir, meta.path === "/" ? "" : meta.path, "index.html");
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, renderHead(template, meta));
      }
      await writeFile(
        path.join(outDir, "404.html"),
        renderHead(template, notFoundMeta),
      );
      const urls = routes
        .filter((meta) => !meta.noindex)
        .map((meta) => `  <url><loc>${absoluteUrl(meta.path)}</loc><changefreq>monthly</changefreq></url>`)
        .join("\n");
      await writeFile(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      await writeFile(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), oveliqSeo()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
