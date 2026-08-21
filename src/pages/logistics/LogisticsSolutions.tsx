import { LogisticsServiceLeaf } from "@/pages/logistics/LogisticsServiceLeaf";
import { logisticsServiceLeaves } from "@/lib/logistics-service-leaves";

export const ThreePlTransportation = () => <LogisticsServiceLeaf leaf={logisticsServiceLeaves.threePl} />;
export const ContractLogistics = () => <LogisticsServiceLeaf leaf={logisticsServiceLeaves.contract} />;
export const DedicatedFleet = () => <LogisticsServiceLeaf leaf={logisticsServiceLeaves.dedicated} />;
export const IndustrialFreight = () => <LogisticsServiceLeaf leaf={logisticsServiceLeaves.industrial} />;
export const ContainerTransportation = () => <LogisticsServiceLeaf leaf={logisticsServiceLeaves.container} />;
