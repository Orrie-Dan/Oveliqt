import CtaArrow from "../components/cta-arrow";
import { oveliqCompany, oveliqContact } from "../content";
import { Reveal, RevealLines } from "../motion";
import "./footer.css";

/**
 * Conversion-forward footer / `#contact`.
 * Spector newsletter, social, legal, and branding removed.
 * No dead form — CTA href is content-driven and replaceable.
 * Motion intensity: LOW.
 */
export default function FooterSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const {
    label,
    headlineLines,
    supporting,
    ctaLabel,
    ctaHref,
    email,
    wordmark,
    nav,
    copyright,
  } = oveliqContact;

  /** Primary CTA opens the guided brief (or a scheduling URL via ctaHref); email is the secondary link below. */
  const resolvedCtaHref = ctaHref || "/contact#project-brief";

  return (
    <footer
      className="oveliq-footer"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="oveliq-footer__inner">
        <div className="oveliq-footer__conversion">
          <Reveal className="oveliq-footer__label-row" staggerIndex={0}>
            <p className="oveliq-footer__label" dir="auto">
              {locale === "fr" ? "VOTRE PROJET / NOTRE PROCHAINE CONVERSATION" : label}
            </p>
            <div className="oveliq-footer__rule" aria-hidden="true" />
          </Reveal>

          <RevealLines
            as="h2"
            id="contact-heading"
            lines={locale === "fr" ? ["Parlons de", "votre projet."] : [...headlineLines]}
            className="oveliq-footer__headline"
            lineClassNames={[
              "oveliq-footer__headline-line",
              "oveliq-footer__headline-line oveliq-footer__headline-line--accent",
            ]}
            delayMs={50}
          />

          <Reveal delayMs={120}>
            <p className="oveliq-footer__supporting" dir="auto">
              {locale === "fr" ? "Une idée à explorer, un processus à simplifier ou un produit à faire évoluer ? Écrivez-nous sur WhatsApp ou par e-mail." : supporting}
            </p>
          </Reveal>

          <Reveal className="oveliq-footer__cta-wrap" delayMs={160}>
            {resolvedCtaHref ? (
              <a
                href={resolvedCtaHref}
                className="oveliq-footer__cta group"
                data-oveliq-contact-cta=""
              >
                <span className="oveliq-footer__cta-text">{locale === "fr" ? "Démarrer une conversation" : ctaLabel}</span>
                <CtaArrow className="text-color-002 group-hover:text-accent" />
              </a>
            ) : (
              <p
                className="oveliq-footer__cta-note"
                data-oveliq-contact-cta="pending"
              >
                Ready to start a project? Contact details will appear here once
                configured.
              </p>
            )}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="oveliq-footer__email"
                data-oveliq-contact-email=""
              >
                {email}
              </a>
            ) : null}
          </Reveal>
        </div>

        <Reveal className="oveliq-footer__utility" delayMs={80} threshold={0.1}>
          <div className="oveliq-footer__columns">
            <div className="oveliq-footer__brand">
              <a href={locale === "fr" ? "/fr" : "/"} className="oveliq-footer__wordmark" data-oveliq-wordmark="">
                {wordmark}
              </a>
              <p className="oveliq-footer__legal">
                <span>{oveliqCompany.legalName}</span>
                <span>{oveliqCompany.city}</span>
                <span>{locale === "fr" ? "N° d’enregistrement" : "Company code"} {oveliqCompany.companyCode}</span>
              </p>
            </div>

            <nav className="oveliq-footer__col" aria-label="Footer">
              <p className="oveliq-footer__col-title">{locale === "fr" ? "Explorer" : "Explore"}</p>
              <ul className="oveliq-footer__nav-list">
                {(locale === "fr" ? [{ label: "Projets", href: "/fr/projets" }, { label: "Services", href: "/fr/services" }, { label: "Collaborer", href: "/fr/tarifs" }, { label: "À propos", href: "/fr/a-propos" }, { label: "Contact", href: "/fr/contact" }] : nav).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="oveliq-footer__nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="oveliq-footer__col" aria-label="Legal">
              <p className="oveliq-footer__col-title">{locale === "fr" ? "Informations légales" : "Legal"}</p>
              <ul className="oveliq-footer__nav-list oveliq-footer__nav-list--single">
                {oveliqCompany.legalLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="oveliq-footer__nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="oveliq-footer__bar">
            <p className="oveliq-footer__copyright" dir="auto">
              {copyright}
            </p>
            <button
              type="button"
              className="oveliq-footer__top"
              aria-label={locale === "fr" ? "Retour en haut de page" : "Scroll back to top"}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
              }}
            >
              {locale === "fr" ? "Retour en haut ↑" : "Back to top ↑"}
            </button>
          </div>
        </Reveal>

        <Reveal className="oveliq-footer__display" delayMs={120} threshold={0.1}>
          <p className="oveliq-footer__display-word" aria-hidden="true">
            {wordmark}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
