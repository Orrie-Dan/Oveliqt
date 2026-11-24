import { useEffect } from "react";
import Page from "./app/page";
import WorkPage from "./app/pages/work-page";
import ProjectPage from "./app/pages/project-page";
import ServicesPage from "./app/pages/services-page";
import ServicePage from "./app/pages/service-page";
import PricingPage from "./app/pages/pricing-page";
import AboutPage from "./app/pages/about-page";
import ContactPage from "./app/pages/contact-page";
import NotFoundPage from "./app/pages/not-found-page";
import LegalPage from "./app/pages/legal-page";
import FrenchPage from "./app/pages/french-page";
import { findProjectDetail, findServicePage, oveliqPrivacyPage, oveliqTermsPage } from "./app/content";
import { applyPageMeta, currentPath, normalizePath, resolveRoute } from "./app/router";
import { allRouteMeta, notFoundMeta } from "./app/seo";

export default function App() {
  const route = resolveRoute(currentPath());
  const project = route.name === "project" ? findProjectDetail(route.slug) : undefined;
  const servicePage = route.name === "service" ? findServicePage(route.slug) : undefined;
  const page =
    (route.name === "project" && !project) || (route.name === "service" && !servicePage) ? "not-found" : route.name;

  useEffect(() => {
    document.documentElement.lang = route.name === "french" ? "fr" : "en";
    if (route.name === "french") {
      document.title = "Oveliqt — Studio logiciel & intelligence artificielle";
      const description = document.querySelector('meta[name="description"]');
      description?.setAttribute("content", "Oveliqt conçoit des sites web, logiciels, produits numériques et solutions d’intelligence artificielle.");
      return;
    }
    // Build output already ships these tags per route; this keeps dev and
    // host-level SPA fallbacks (e.g. legacy redirects) consistent.
    const path =
      page === "project"
        ? `/work/${project!.slug}`
        : page === "service"
          ? `/services/${servicePage!.service.id}`
          : normalizePath(currentPath());
    const meta = page === "not-found" ? notFoundMeta : allRouteMeta().find((item) => item.path === path);
    if (meta) applyPageMeta(meta);
  }, [page, project, servicePage]);

  switch (page) {
    case "french":
      return <FrenchPage section={route.name === "french" ? route.section : ""} slug={route.name === "french" ? route.slug : undefined} />;
    case "work":
      return <WorkPage />;
    case "project":
      return <ProjectPage project={project!} />;
    case "services":
      return <ServicesPage />;
    case "service":
      return <ServicePage page={servicePage!} />;
    case "pricing":
      return <PricingPage />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "privacy":
      return <LegalPage page={oveliqPrivacyPage} />;
    case "terms":
      return <LegalPage page={oveliqTermsPage} />;
    case "not-found":
      return <NotFoundPage />;
    default:
      return <Page />;
  }
}
