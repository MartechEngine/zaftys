import { demoOrchestratorPhases } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { listNetworkOverflow } from "@/lib/data/overflow-repository";
import {
  listOrchestratorRuns,
  recordOrchestratorRun,
} from "@/lib/mutations/entity-stores";

export type OrchestratorPhase = {
  id: string;
  name: string;
  status: "complete" | "running" | "pending";
  duration: string;
};

export type OrchestratorProposal = {
  publicId: string;
  shipmentId: string;
  partner: string;
  eta: string;
  route: string;
  action: string;
};

export async function getOrchestratorState() {
  const [shipments, overflow] = await Promise.all([
    fetchAllShipmentsRaw(),
    listNetworkOverflow(undefined, "active"),
  ]);

  const target =
    shipments.find((s) => s.status === "pending" && s.originType === "network" && !s.driver) ??
    shipments.find((s) => s.status === "pending" && !s.driver) ??
    shipments.find((s) => s.status === "pending");

  const hasTarget = Boolean(target);
  const networkTarget = target?.originType === "network";

  const phases: OrchestratorPhase[] = demoOrchestratorPhases.map((phase, index) => {
    if (!hasTarget) {
      return { ...phase, status: "pending" as const, duration: "—" };
    }
    if (index < 2) return { ...phase, status: "complete" as const };
    if (index === 2) return { ...phase, status: "running" as const, duration: "1.1s" };
    return { ...phase, status: "pending" as const, duration: "—" };
  });

  const proposal: OrchestratorProposal | null = target
    ? {
        publicId: target.publicId,
        shipmentId: target.id,
        partner: networkTarget ? "Maharashtra Hauliers" : "Internal fleet pool",
        eta: target.eta ?? "Tomorrow, 10:00 AM",
        route: `${target.origin} → ${target.destination}`,
        action: networkTarget
          ? "Assign to network overflow partner"
          : "Assign nearest available driver",
      }
    : null;

  return {
    handsFreeMode: false,
    lastRun: target
      ? {
          publicId: target.publicId,
          duration: "2.4s",
          outcome: networkTarget
            ? "routed to network overflow review"
            : "awaiting manual assignment",
        }
      : null,
    pendingTargets: shipments.filter((s) => s.status === "pending" && !s.driver).length,
    openOverflow: overflow.length,
    phases,
    proposal,
    recentRuns: listOrchestratorRuns().slice(0, 5),
  };
}

export async function runOrchestratorPipeline() {
  const state = await getOrchestratorState();
  const run = recordOrchestratorRun();
  return {
    run,
    proposal: state.proposal,
    pendingTargets: state.pendingTargets,
    phases: state.phases.map((phase, index) =>
      index < 3
        ? { ...phase, status: "complete" as const }
        : { ...phase, status: "pending" as const },
    ),
  };
}
