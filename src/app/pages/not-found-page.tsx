import PageHero from "../components/page-hero";
import PillLink from "../components/pill-link";
import SiteLayout from "../components/site-layout";
import { oveliqNotFound } from "../content";

/** Fallback for unknown paths (static hosts should still return HTTP 404 where possible). */
export default function NotFoundPage() {
  return (
    <SiteLayout>
      <PageHero {...oveliqNotFound}>
        <PillLink href="/" label="Back to home" tone="dark" />
      </PageHero>
    </SiteLayout>
  );
}
