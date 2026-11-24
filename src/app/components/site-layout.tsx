import { useEffect, type ReactNode } from "react";
import SiteNav from "./site-nav";
import FooterSection from "../sections/footer-section";
import CustomCursor from "./custom-cursor";

/**
 * Shared page shell: fixed nav, page body, conversion footer (`#contact`).
 * Content renders after the document loads, so a cross-page hash link
 * (e.g. `/#process`) is scrolled to once the target exists.
 */
export default function SiteLayout({
  children,
  navVariant = "dark",
  locale,
}: {
  children: ReactNode;
  /** `light` = white nav with grey divider (homepage editorial hero). */
  navVariant?: "dark" | "light";
  locale?: "en" | "fr";
}) {
  const activeLocale = locale ?? (typeof window !== "undefined" && window.location.pathname.startsWith("/fr") ? "fr" : "en");
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="block" id="main">
      <a className="oveliq-skip-link" href="#page-content">{activeLocale === "fr" ? "Aller au contenu" : "Skip to content"}</a>
      <CustomCursor />
      <div className="min-h-screen flex relative flex-col justify-start items-center content-center overflow-clip bg-background grid-cols-1">
        <SiteNav variant={navVariant} locale={activeLocale} />
        <div className="h-[min-content] min-h-screen contents relative min-w-0 flex-col justify-start items-center content-center overflow-clip bg-background">
          <main id="page-content" tabIndex={-1} className="w-full flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip">
            {children}
          </main>
        </div>
        <FooterSection locale={activeLocale} />
      </div>
    </div>
  );
}
