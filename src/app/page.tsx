import ProductGridSection from "./sections/product-grid-section";
import ServicesSection from "./sections/services-section";
import BusinessExplorerSection from "./sections/business-explorer-section";
import HowWeWorkSection from "./sections/how-we-work-section";
import FaqSection from "./sections/faq-section";
import HomeHeroSection from "./sections/home-hero-section";
import SiteLayout from "./components/site-layout";

export default function Page() {
  return (
    <SiteLayout>
      <HomeHeroSection />
      <ProductGridSection />
      <ServicesSection />
      <HowWeWorkSection />
      <BusinessExplorerSection />
      <FaqSection />
    </SiteLayout>
  );
}

