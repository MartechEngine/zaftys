import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { networkSolutions } from "@/lib/solution-pages";

export const TransporterNetwork = () => (
  <SolutionPageLayout {...networkSolutions.transporterNetwork} />
);

export const TruckCapacity = () => (
  <SolutionPageLayout {...networkSolutions.truckCapacity} />
);

export default TransporterNetwork;
