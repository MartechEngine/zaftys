import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { intelligenceSolutions } from "@/lib/solution-pages";

export const ZaftysAnalytics = () => (
  <SolutionPageLayout {...intelligenceSolutions.analytics} />
);

export const FreightRateIntelligence = () => (
  <SolutionPageLayout {...intelligenceSolutions.freightRates} />
);

export const MarketIntelligence = () => (
  <SolutionPageLayout {...intelligenceSolutions.marketIntelligence} />
);

export const SupplyChainAi = () => (
  <SolutionPageLayout {...intelligenceSolutions.ai} />
);

export default ZaftysAnalytics;
