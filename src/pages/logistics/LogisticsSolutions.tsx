import { SolutionPageLayout } from "@/components/SolutionPageLayout";
import { logisticsSolutions } from "@/lib/solution-pages";

export const ThreePlTransportation = () => (
  <SolutionPageLayout {...logisticsSolutions.threePl} />
);

export const ContractLogistics = () => (
  <SolutionPageLayout {...logisticsSolutions.contract} />
);

export const DedicatedFleet = () => (
  <SolutionPageLayout {...logisticsSolutions.dedicated} />
);

export const IndustrialFreight = () => (
  <SolutionPageLayout {...logisticsSolutions.industrial} />
);

export const ContainerTransportation = () => (
  <SolutionPageLayout {...logisticsSolutions.container} />
);

export default ThreePlTransportation;
