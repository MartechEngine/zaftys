import SEO from "@/components/SEO";
import {
  HomeFinalCtaSection,
  HomeHeroSection,
  HomeIndustriesSection,
  HomeInsightsSection,
  HomeNetworkSection,
  HomeOperatingModelSection,
  HomePlatformSection,
} from "@/components/home";
import { pageSeo } from "@/lib/page-seo";
import { logisticsServiceSchema, organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";

/**
 * Homepage section order - locked to positioning (see src/lib/home-sections.ts).
 *
 * 1. hero            WHAT + PROOF   Heavy freight promise
 * 2. operating-model HOW            Operator identity (fleet + contract + network)
 * 3. platform        PLATFORM       ZAFTYS TMS
 * 4. network         NETWORK        TranZfort + labeled capacity
 * 5. industries      WHO            Verticals
 * 6. insights        KNOW           Intelligence tertiary
 * 7. final-cta       ACT            Request Transportation
 */
const Home = () => {
  const schema = [organizationSchema, websiteSchema, localBusinessSchema, logisticsServiceSchema];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SEO
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        canonical="/"
        schema={schema}
      />

      <HomeHeroSection />
      <HomeOperatingModelSection />
      <HomePlatformSection />
      <HomeNetworkSection />
      <HomeIndustriesSection />
      <HomeInsightsSection />
      <HomeFinalCtaSection />
    </div>
  );
};

export default Home;
