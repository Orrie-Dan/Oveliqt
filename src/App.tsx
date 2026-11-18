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
import { findProjectDetail, findServicePage } from "./app/content";
import { applyPageMeta, currentPath, normalizePath, resolveRoute } from "./app/router";
import { allRouteMeta, notFoundMeta } from "./app/seo";

export default function App() {
  const route = resolveRoute(currentPath());
  const project = route.name === "project" ? findProjectDetail(route.slug) : undefined;
  const servicePage = route.name === "service" ? findServicePage(route.slug) : undefined;
  const page =
    (route.name === "project" && !project) || (route.name === "service" && !servicePage) ? "not-found" : route.name;

  useEffect(() => {
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
    case "not-found":
      return <NotFoundPage />;
    default:
      return <Page />;
  }
}
