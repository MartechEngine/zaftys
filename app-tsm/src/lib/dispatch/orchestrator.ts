import { demoOrchestratorPhases } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { listNetworkOverflow } from "@/lib/data/overflow-repository";
import {
  listOrchestratorRuns,
  recordOrchestratorRun,
} from "@/lib/mutations/entity-stores";
import { getOrchestratorApplied } from "@/lib/mutations/sprint18-store";

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

  const applied = getOrchestratorApplied();

  return {
    handsFreeMode: false,
    applied,
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

export async function applyOrchestratorProposal() {
  const state = await getOrchestratorState();
  if (!state.proposal) return null;
  if (state.applied?.shipmentId === state.proposal.shipmentId) {
    const { getShipment } = await import("@/lib/data/shipment-repository");
    const shipment = await getShipment(state.proposal.shipmentId);
    return shipment ? { applied: state.applied, shipment, proposal: state.proposal } : null;
  }

  const { assignShipment } = await import("@/lib/data/shipment-repository");
  const { recordOrchestratorApply } = await import("@/lib/mutations/sprint18-store");

  const shipment = await assignShipment(state.proposal.shipmentId, "d1", "v1");
  if (!shipment) return null;

  const applied = recordOrchestratorApply({
    shipmentId: state.proposal.shipmentId,
    publicId: state.proposal.publicId,
    action: state.proposal.action,
    appliedAt: new Date().toISOString(),
    driverId: "d1",
    vehicleId: "v1",
  });

  return { applied, shipment, proposal: state.proposal };
}
