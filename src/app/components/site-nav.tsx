import { useCallback, useEffect, useId, useRef, useState } from "react";
import CtaArrow from "./cta-arrow";
import OveliqtLogo from "../svgs/oveliqt-logo";
import { oveliqNavigation, oveliqStartProject, type OveliqNavItem } from "../content";
import { heroIntroMode } from "../motion/hero-intro";
import { currentPath, isActivePath } from "../router";

const maskStyle = {
  maskImage: "linear-gradient(270deg, var(--clr-1) 100%, var(--foreground) 102%, var(--foreground) 108%)",
} as const;

function NavMaskLink({
  item,
  onNavigate,
  widthClass,
  className = "",
  restClass = "text-background",
}: {
  item: OveliqNavItem;
  onNavigate?: () => void;
  widthClass: string;
  className?: string;
  /** Text colour of the resting layer (the hover layer is always accent). */
  restClass?: string;
}) {
  const current = isActivePath(item.href, currentPath());

  return (
    <a
      aria-current={current ? "page" : undefined}
      className={`flex relative justify-start items-center content-center text-primary cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      data-component="link"
      href={item.href}
      onClick={onNavigate}
    >
      <div className={`${widthClass} flex relative justify-start items-center content-center shrink-0 group`}>
        <div
          className={`${widthClass} h-full flex absolute top-0 z-2 min-w-0 flex-col justify-center shrink-0 whitespace-pre text-nowrap group-hover:[mask-image:linear-gradient(270deg,_var(--clr-1)_0.59746%,_var(--foreground)_4.40478%,_var(--foreground)_108%)] group-hover:[-webkit-mask-image:linear-gradient(270deg,_var(--clr-1)_0.59746%,_var(--foreground)_4.40478%,_var(--foreground)_108%)] focus:[mask-image:linear-gradient(270deg,_var(--clr-1)_100%,_var(--foreground)_102%,_var(--foreground)_108%)] focus:[-webkit-mask-image:linear-gradient(270deg,_var(--clr-1)_100%,_var(--foreground)_102%,_var(--foreground)_108%)]`}
          style={maskStyle}
        >
          <p className="block text-accent [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-lg leading-[1.375rem] tracking-[-0.9px] text-left [font-feature-settings:'calt'_0,_'case'] [font-variation-settings:'wght'_var(--type-wght-heading)]" dir="auto">
            {item.label}
            {item.showArrow ? " ↗" : ""}
          </p>
        </div>
        <div className={`${widthClass} flex relative flex-col justify-center shrink-0 whitespace-pre text-nowrap`}>
          <p className={`block ${restClass} group-aria-[current=page]:text-accent [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-lg leading-[1.375rem] tracking-[-0.9px] text-left [font-feature-settings:'calt'_0,_'case'] [font-variation-settings:'wght'_var(--type-wght-heading)]`} dir="auto">
            {item.label}
            {item.showArrow ? " ↗" : ""}
          </p>
        </div>
      </div>
    </a>
  );
}

const navLinkWidths: Record<string, string> = {
  Work: "w-[3.25rem]",
  Services: "w-[5rem]",
  "Ways to work together": "w-[11.5rem]",
  About: "w-[3.5rem]",
  Contact: "w-[4.5rem]",
};

/** Shared "Start a project" button. Light nav: charcoal fill; dark nav: white fill. */
function NavStartProject({ light, locale = "en" }: { light: boolean; locale?: "en" | "fr" }) {
  return (
    <a
      className={`group inline-flex items-center gap-2 h-10 px-4 rounded-[2px] [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[0.9375rem] tracking-[-0.02em] [font-variation-settings:'wght'_560] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        light
          ? "bg-[#262A2D] text-white hover:bg-[#07090C]"
          : "bg-white text-[#07090C] hover:bg-[#E8D9C8]"
      }`}
      data-component="link"
      href={locale === "fr" ? "/fr/contact" : oveliqStartProject.href}
    >
      {locale === "fr" ? "Parlons de votre projet" : oveliqStartProject.label}
      <CtaArrow className="w-[0.8em] h-[0.8em] group-hover:text-accent" />
    </a>
  );
}

export default function SiteNav({ variant = "dark", locale = "en" }: { variant?: "dark" | "light"; locale?: "en" | "fr" }) {
  const light = variant === "light";
  const ink = light ? "text-[#262A2D]" : "text-background";
  const navItems = locale === "fr" ? [
    { label: "Projets", href: "/fr/projets" }, { label: "Services", href: "/fr/services" },
    { label: "Collaborer", href: "/fr/tarifs" }, { label: "À propos", href: "/fr/a-propos" },
  ] : oveliqNavigation;
  const englishToFrench: Record<string, string> = { "/": "/fr", "/work": "/fr/projets", "/services": "/fr/services", "/pricing": "/fr/tarifs", "/about": "/fr/a-propos", "/contact": "/fr/contact", "/privacy": "/fr/confidentialite", "/terms": "/fr/conditions" };
  const frenchToEnglish: Record<string, string> = { "/fr": "/", "/fr/projets": "/work", "/fr/services": "/services", "/fr/tarifs": "/pricing", "/fr/a-propos": "/about", "/fr/contact": "/contact", "/fr/confidentialite": "/privacy", "/fr/conditions": "/terms" };
  const path = currentPath();
  const matchingProject = path.match(/^\/fr\/projets\/([a-z0-9-]+)$/);
  const matchingService = path.match(/^\/fr\/services\/([a-z0-9-]+)$/);
  const englishProject = path.match(/^\/work\/([a-z0-9-]+)$/);
  const englishService = path.match(/^\/services\/([a-z0-9-]+)$/);
  const langHref = locale === "fr"
    ? matchingProject ? `/work/${matchingProject[1]}`
      : matchingService ? `/services/${matchingService[1]}`
        : (frenchToEnglish[path] ?? "/")
    : englishProject ? `/fr/projets/${englishProject[1]}`
      : englishService ? `/fr/services/${englishService[1]}`
        : (englishToFrench[path] ?? "/fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [skipIntro] = useState(() => heroIntroMode() === "skip");
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  /*
   * Scroll journey: the nav steps aside while reading down and returns on any
   * upward scroll; a hairline shows page progress (the native scrollbar is
   * hidden). Native scrolling only: passive listener, one DOM write per frame.
   */
  useEffect(() => {
    const nav = navRef.current;
    const bar = progressRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.max(0, window.scrollY);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      const delta = y - lastY;
      if (Math.abs(delta) < 6 && y > 80) return;
      const hide = !menuOpenRef.current && y > window.innerHeight * 0.6 && delta > 0;
      nav.dataset.hidden = hide ? "true" : "false";
      nav.dataset.scrolled = y > 24 ? "true" : "false";
      lastY = y;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    if (navRef.current) navRef.current.dataset.hidden = "false";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab") {
        const controls = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <div ref={progressRef} className="oveliq-scroll-progress" aria-hidden="true" />
      <nav
        ref={navRef}
        className={`oveliq-site-nav w-full flex fixed inset-x-0 top-0 z-10 min-w-0 justify-center items-center shrink-0 [backdrop-filter:blur(6px)] ${
          light ? "oveliq-site-nav--light h-15 min-[861px]:h-[4.75rem] bg-[rgba(255,255,255,0.94)]" : "h-15 bg-clr-0"
        }`}
        data-component="nav"
        aria-label={locale === "fr" ? "Navigation principale" : "Primary"}
      >
        <div className={`oveliq-nav-enter${skipIntro ? " is-settled" : ""} w-full h-full flex relative px-[clamp(1.25rem,3.2vw,3.75rem)] justify-between items-center content-center grow shrink-0 ${
          light ? "max-w-[1600px] after:content-[''] after:absolute after:bottom-0 after:inset-x-[clamp(1.25rem,3.2vw,3.75rem)] after:h-px after:bg-[#E5E5E5]" : "max-w-[100%]"
        }`}>
          <a
            className="flex relative justify-start items-center content-center shrink-0 overflow-clip text-primary cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            data-component="link"
            href={locale === "fr" ? "/fr" : "/"}
          >
            <OveliqtLogo className={`block w-auto ${light ? "h-[1.125rem] min-[861px]:h-[1.5rem] " : "h-[1.125rem] "}${ink}`} title="Oveliqt home" />
          </a>
          <div className="flex relative justify-end items-center content-center shrink-0 gap-6 max-lg:gap-0">
            <a className={`${ink} text-sm underline underline-offset-4`} href={langHref} data-locale-switch="" lang={locale === "fr" ? "en" : "fr"} aria-label={locale === "fr" ? "Voir le site en anglais" : "Voir le site en français"}>{locale === "fr" ? "EN" : "FR"}</a>
            <div className="hidden max-lg:flex max-lg:relative max-lg:justify-end max-lg:items-center">
              <button
                ref={menuButtonRef}
                type="button"
                className={`${ink} [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-sm font-medium tracking-[0.12em] uppercase cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent px-1 py-2`}
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen(true)}
              >
                {locale === "fr" ? "MENU" : "MENU"}
              </button>
            </div>
            <div className={`flex relative justify-end items-center content-center max-lg:hidden ${light ? "gap-9" : "gap-7"}`}>
              {navItems.map((item) => (
                <NavMaskLink
                  key={item.href}
                  item={item}
                  widthClass={navLinkWidths[item.label] ?? "w-auto"}
                  restClass={light ? "text-[#262A2D]" : "text-background"}
                />
              ))}
            </div>
            <div className={`max-lg:hidden ${light ? "ml-6" : "ml-2"}`}>
              <NavStartProject light={light} locale={locale} />
            </div>
          </div>
        </div>
      </nav>

      {menuOpen ? (
        <div
          ref={menuRef}
          id={menuId}
          className="fixed inset-0 z-[100] flex flex-col bg-color-004 max-lg:flex"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-15 shrink-0 items-center justify-between px-4">
            <OveliqtLogo className="block h-[1.125rem] w-auto text-background" title="Oveliqt" />
            <button
              ref={closeRef}
              type="button"
              className="text-background [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-sm font-medium tracking-[0.12em] uppercase cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent px-1 py-2"
              onClick={closeMenu}
            >
              {locale === "fr" ? "FERMER" : "CLOSE"}
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-8 px-6 pb-16" aria-label="Mobile primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActivePath(item.href, currentPath()) ? "page" : undefined}
                className="text-background aria-[current=page]:text-accent [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[2rem] leading-[2.375rem] tracking-[-1.92px] uppercase [font-variation-settings:'wght'_var(--type-wght-display)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                onClick={closeMenu}
              >
                {item.label}
                {item.showArrow ? " ↗" : ""}
              </a>
            ))}
            <a
              href={locale === "fr" ? "/fr/contact" : oveliqStartProject.href}
              className="mt-4 text-accent [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[2rem] leading-[2.375rem] tracking-[-1.92px] uppercase [font-variation-settings:'wght'_var(--type-wght-display)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              onClick={closeMenu}
            >
              {locale === "fr" ? "Parlons de votre projet" : oveliqStartProject.label} ↗
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}

/** Hero CTA with arrow hover stack — reused in hero. */
export function HeroPrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex relative py-5.5 px-6 rounded-[50px] justify-center items-center content-center gap-2.5 overflow-clip text-primary bg-background cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:rounded-[50px] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      data-component="link"
      href={href}
    >
      <div className="flex relative justify-center items-center content-center shrink-0 overflow-clip group min-w-[9rem]">
        <div
          className="h-[1.65rem] flex absolute top-1/2 left-1/2 z-2 min-w-0 flex-col justify-center shrink-0 whitespace-pre text-nowrap -translate-x-1/2 -translate-y-1/2 group-hover:[mask-image:linear-gradient(270deg,_var(--clr-1)_-0.54738%,_var(--foreground)_3.28076%,_var(--foreground)_108%)] group-hover:[-webkit-mask-image:linear-gradient(270deg,_var(--clr-1)_-0.54738%,_var(--foreground)_3.28076%,_var(--foreground)_108%)]"
          style={maskStyle}
        >
          <p className="block text-accent [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[1.375rem] leading-[1.625rem] tracking-[-0.88px] [font-variation-settings:'wght'_var(--type-wght-ui)]" dir="auto">
            {label}
          </p>
        </div>
        <div className="flex relative flex-col justify-center shrink-0 whitespace-pre text-nowrap">
          <p className="block text-color-004 [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[1.375rem] leading-[1.625rem] tracking-[-0.88px] [font-variation-settings:'wght'_var(--type-wght-ui)]" dir="auto">
            {label}
          </p>
        </div>
      </div>
      <CtaArrow className="text-color-004 group-hover:text-accent" />
      <span className="sr-only">↗</span>
    </a>
  );
}
