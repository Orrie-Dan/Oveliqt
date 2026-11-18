import ServicePricing from "../components/service-pricing";
import SiteLayout from "../components/site-layout";
import "./pages.css";
import "./pricing-page.css";

export default function PricingPage() {
  return (
    <SiteLayout>
      <ServicePricing />
    </SiteLayout>
  );
}
