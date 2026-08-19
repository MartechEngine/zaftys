import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { technologySolutions } from "@/lib/solution-pages";

export const FleetManagement = () => (
  <SolutionPageLayout {...technologySolutions.fleetManagement} />
);

export const TrackingVisibility = () => (
  <SolutionPageLayout {...technologySolutions.tracking} />
);

export const LogisticsApis = () => (
  <SolutionPageLayout {...technologySolutions.apis} />
);

export default FleetManagement;
