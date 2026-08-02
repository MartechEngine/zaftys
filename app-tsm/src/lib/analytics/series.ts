import {
  fetchShipmentsForEnrichment,
  getExceptions,
  listVehiclesSafe,
} from "@/lib/data/shipment-repository";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { allowDemoSeeds } from "@/lib/data/demo-mode";
import {
  getOutboundListingStats,
  listOutboundListings,
  listOffersForListing,
} from "@/lib/network/listing-store";
import { isExceptionShipment } from "@/lib/shipments/filters";
import { getOperationsReport, getDriverScorecards } from "@/lib/reports/operations-report";
import { getFleetUtilizationReport } from "@/lib/reports/fleet-report";
import { getLanesReport } from "@/lib/reports/lanes-report";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(dayKey(d));
  }
  return out;
}

/** Deterministic demo history so sparklines look alive without durable DB. */
function seedSeries(base: number, days: string[], salt: number): number[] {
  return days.map((_label, i) => {
    const wave = Math.sin((i + salt) * 0.7) * (base * 0.25);
    const drift = (i / Math.max(days.length - 1, 1)) * (base * 0.15);
    return Math.max(0, Math.round(base + wave + drift + ((salt * i) % 3)));
  });
}

/**
 * Prefer real day-bucket counts from shipment.updatedAt; fall back to seeded
 * values when a day has no matching shipments (demo UI only).
 */
function dayBucketSeries<T extends { updatedAt: string }>(
  shipments: T[],
  days: string[],
  predicate: (s: T) => boolean,
  fallbackBase: number,
  salt: number,
): number[] {
  const useSeed = allowDemoSeeds();
  const seeded = useSeed ? seedSeries(fallbackBase, days, salt) : null;
  const byDay = new Map(days.map((d) => [d, 0]));
  for (const s of shipments) {
    if (!predicate(s)) continue;
    const key = dayKey(new Date(s.updatedAt));
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }
  return days.map((d, i) => {
    const count = byDay.get(d) ?? 0;
    if (count > 0) return count;
    return seeded ? seeded[i] : 0;
  });
}

export async function getCommandCenterAnalytics() {
  const { ensureNetworkHydrated } = await import("@/lib/network/network-persistence");
  await ensureNetworkHydrated();
  const shipments = await fetchShipmentsForEnrichment();
  const active = shipments.filter((s) =>
    ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
  );
  const pending = shipments.filter((s) => s.status === "pending");
  const days = lastNDays(14);
  const activeSpark = dayBucketSeries(
    shipments,
    days,
    (s) =>
      ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
    Math.max(active.length, 3),
    2,
  );
  activeSpark[activeSpark.length - 1] = active.length;

  const exceptionCount = shipments.filter(isExceptionShipment).length;
  const exceptionSpark = dayBucketSeries(
    shipments,
    days,
    isExceptionShipment,
    Math.max(exceptionCount, 1),
    5,
  );
  exceptionSpark[exceptionSpark.length - 1] = exceptionCount;

  const statusCounts = new Map<string, number>();
  for (const s of shipments) {
    if (s.status === "cancelled") continue;
    statusCounts.set(s.status, (statusCounts.get(s.status) ?? 0) + 1);
  }
  const statusMix = [...statusCounts.entries()]
    .map(([id, value]) => ({
      id,
      label: id.replace(/_/g, " "),
      value,
    }))
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  const exceptions = await getExceptions();
  const reasonMap = new Map<string, number>();
  for (const e of exceptions) {
    const label = e.reason.split("—")[0]?.trim() || e.reason;
    reasonMap.set(label, (reasonMap.get(label) ?? 0) + 1);
  }
  const exceptionReasons = [...reasonMap.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const now = Date.now();
  const aging = { "<1h": 0, "1–4h": 0, "4–24h": 0, ">24h": 0 };
  for (const s of pending.filter((x) => !x.driver)) {
    const ageH = (now - new Date(s.updatedAt).getTime()) / 3_600_000;
    if (ageH < 1) aging["<1h"] += 1;
    else if (ageH < 4) aging["1–4h"] += 1;
    else if (ageH < 24) aging["4–24h"] += 1;
    else aging[">24h"] += 1;
  }
  if (
    allowDemoSeeds() &&
    Object.values(aging).every((v) => v === 0) &&
    pending.length > 0
  ) {
    aging["1–4h"] = Math.min(pending.length, 2);
    aging["4–24h"] = Math.max(0, pending.length - 2);
  }

  const { openPosts, offersWaiting } = getOutboundListingStats();
  const listings = listOutboundListings();
  const fillRates = listings
    .filter((l) => ["posted", "offers_received", "partially_assigned"].includes(l.state))
    .map((l) => (l.trucksNeeded > 0 ? l.trucksFilled / l.trucksNeeded : 0));
  const fillRate =
    fillRates.length > 0
      ? Math.round((fillRates.reduce((a, b) => a + b, 0) / fillRates.length) * 100)
      : 0;

  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    activeTripsSpark: { labels: days.map((d) => d.slice(5)), values: activeSpark },
    exceptionsSpark: { labels: days.map((d) => d.slice(5)), values: exceptionSpark },
    statusMix,
    exceptionReasons,
    unassignedAging: Object.entries(aging).map(([bucket, count]) => ({ bucket, count })),
    network: { openPosts, offersWaiting, fillRate },
  };
}

export async function getOperationsAnalytics(days = 30) {
  const report = await getOperationsReport();
  const shipments = await fetchShipmentsForEnrichment();
  const labels = lastNDays(days);
  const byDay = new Map(labels.map((d) => [d, { fleet: 0, network: 0 }]));

  for (const s of shipments) {
    const key = dayKey(new Date(s.updatedAt));
    const row = byDay.get(key);
    if (!row) continue;
    if (s.originType === "network") row.network += 1;
    else row.fleet += 1;
  }

  const tripsOverTime = labels.map((date, i) => {
    const row = byDay.get(date) ?? { fleet: 0, network: 0 };
    if (!allowDemoSeeds()) {
      return {
        date: date.slice(5),
        trips: row.fleet + row.network,
        fleet: row.fleet,
        network: row.network,
      };
    }
    const seededFleet = seedSeries(Math.max(report.totalTrips / 10, 2), labels, 3)[i];
    const seededNet = seedSeries(Math.max(report.totalTrips / 20, 1), labels, 7)[i];
    const fleet = row.fleet || seededFleet;
    const network = row.network || seededNet;
    return {
      date: date.slice(5),
      trips: fleet + network,
      fleet,
      network,
    };
  });

  const weeks = ["W-3", "W-2", "W-1", "This week"];
  const onTimeByWeek = allowDemoSeeds()
    ? weeks.map((week, i) => ({
        week,
        pct: Math.min(99, Math.max(70, report.onTimePercent - 6 + i * 3)),
      }))
    : weeks.map((week, i) => ({
        week,
        pct: i === weeks.length - 1 ? report.onTimePercent : 0,
      }));
  onTimeByWeek[onTimeByWeek.length - 1].pct = report.onTimePercent;

  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    kpis: {
      totalTrips: report.totalTrips,
      onTimePercent: report.onTimePercent,
      avgTransitHours: report.avgTransitHours,
      exceptions: report.exceptions,
    },
    tripsOverTime,
    onTimeByWeek,
    byCorridor: report.byCorridor.slice(0, 8).map((c) => ({
      corridor: c.corridor,
      trips: c.trips,
      onTimePct: c.onTime,
    })),
  };
}

export async function getDriversAnalytics() {
  const cards = await getDriverScorecards();
  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    leaderboard: cards.slice(0, 8).map((d) => ({
      name: d.name,
      trips: d.trips,
      rating: d.rating,
    })),
    scatter: cards.map((d) => ({
      id: d.id,
      name: d.name,
      trips: d.trips,
      rating: d.rating,
      onTime: Number.parseFloat(String(d.onTime).replace("%", "")) || 0,
    })),
  };
}

export async function getFleetAnalytics() {
  const report = await getFleetUtilizationReport();
  const vehicles = await listVehiclesSafe();
  const byStatus = new Map<string, number>();
  for (const v of vehicles) {
    byStatus.set(v.status, (byStatus.get(v.status) ?? 0) + 1);
  }
  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    utilizationPct: report.utilizationPercent,
    statusMix: [...byStatus.entries()].map(([id, value]) => ({
      id,
      label: id.replace(/_/g, " "),
      value,
    })),
    capacity: report.byVehicle.slice(0, 6).map((v) => ({
      label: v.registration,
      used: allowDemoSeeds()
        ? Math.round((v.utilizationPercent / 100) * 32)
        : Math.round(v.utilizationPercent),
      capacity: allowDemoSeeds() ? 32 : 100,
    })),
  };
}

export async function getLanesAnalytics() {
  const lanes = await getLanesReport();
  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    corridors: lanes.corridors.slice(0, 8).map((l) => ({
      corridor: l.corridor,
      trips: l.trips,
      onTimePct: l.onTime,
      // No real transit-hour field yet — invent only in demo UI.
      avgHours: allowDemoSeeds() ? Math.round(8 + l.trips * 0.4) : 0,
    })),
  };
}

export async function getNetworkAnalytics() {
  const { ensureNetworkHydrated } = await import("@/lib/network/network-persistence");
  await ensureNetworkHydrated();
  const listings = listOutboundListings({ state: "all" });
  const pipeline: Record<string, number> = {
    draft: 0,
    posted: 0,
    offers_received: 0,
    partially_assigned: 0,
    assigned: 0,
    withdrawn: 0,
    expired: 0,
  };
  for (const l of listings) {
    if (l.state in pipeline) pipeline[l.state] += 1;
  }

  const ttfBuckets = [
    { bucket: "<15m", count: 0 },
    { bucket: "15–60m", count: 0 },
    { bucket: "1–4h", count: 0 },
    { bucket: ">4h", count: 0 },
  ];
  for (const l of listings) {
    const offers = listOffersForListing(l.id);
    if (!l.postedAt || offers.length === 0) continue;
    const first = offers.reduce((a, b) => (a.submittedAt < b.submittedAt ? a : b));
    const mins =
      (new Date(first.submittedAt).getTime() - new Date(l.postedAt).getTime()) / 60_000;
    if (mins < 15) ttfBuckets[0].count += 1;
    else if (mins < 60) ttfBuckets[1].count += 1;
    else if (mins < 240) ttfBuckets[2].count += 1;
    else ttfBuckets[3].count += 1;
  }
  if (allowDemoSeeds() && ttfBuckets.every((b) => b.count === 0)) {
    ttfBuckets[0].count = 2;
    ttfBuckets[1].count = 1;
  }

  const { openPosts, offersWaiting } = getOutboundListingStats();
  const open = listings.filter((l) =>
    ["posted", "offers_received", "partially_assigned"].includes(l.state),
  );
  const fillRate =
    open.length === 0
      ? 0
      : Math.round(
          (open.reduce((s, l) => s + l.trucksFilled / Math.max(l.trucksNeeded, 1), 0) /
            open.length) *
            100,
        );

  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    pipeline: Object.entries(pipeline).map(([stage, count]) => ({ stage, count })),
    ttfBuckets,
    openPosts,
    offersWaiting,
    fillRate,
  };
}

export async function getBillingAnalytics() {
  const invoices = await listInvoices();
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const revenueByMonth = months.map((month, i) => {
    const base = invoices.reduce((s, inv) => s + (inv.subtotalInr || 0), 0) / months.length;
    if (!allowDemoSeeds()) {
      return { month, revenue: Math.round(base), gst: Math.round(base * 0.18) };
    }
    return {
      month,
      revenue: Math.round(seedSeries(base || 80_000, months, 4)[i]),
      gst: Math.round(seedSeries((base || 80_000) * 0.18, months, 9)[i]),
    };
  });
  if (invoices.length > 0) {
    revenueByMonth[revenueByMonth.length - 1].revenue = invoices.reduce(
      (s, inv) => s + (inv.subtotalInr || 0),
      0,
    );
    revenueByMonth[revenueByMonth.length - 1].gst = invoices.reduce(
      (s, inv) => s + Math.round((inv.subtotalInr || 0) * 0.18),
      0,
    );
  }

  const aging = { "0–30": 0, "31–60": 0, "61–90": 0, "90+": 0 };
  for (const inv of invoices) {
    if (inv.status === "paid") continue;
    if (allowDemoSeeds()) {
      const n = inv.id.charCodeAt(inv.id.length - 1) % 4;
      const bucket = n === 0 ? "90+" : n === 1 ? "61–90" : n === 2 ? "31–60" : "0–30";
      aging[bucket as keyof typeof aging] += inv.subtotalInr || 0;
    } else {
      // No due-date field yet — bucket all open AR as current rather than invent age.
      aging["0–30"] += inv.subtotalInr || 0;
    }
  }
  if (allowDemoSeeds() && Object.values(aging).every((v) => v === 0)) {
    aging["0–30"] = 120_000;
    aging["31–60"] = 45_000;
  }

  const paid = invoices.filter((i) => i.status === "paid").length;
  const pending = invoices.filter((i) => i.status !== "paid").length;
  const lastRevenue = revenueByMonth[revenueByMonth.length - 1]?.revenue ?? 0;
  const lastGst = revenueByMonth[revenueByMonth.length - 1]?.gst ?? 0;

  return {
    demoSeries: process.env.TSM_DEMO_UI === "1",
    revenueByMonth,
    arAging: Object.entries(aging).map(([bucket, amount]) => ({ bucket, amount })),
    statusMix: [
      { id: "paid", label: "Paid", value: paid },
      { id: "pending", label: "Open", value: pending },
    ],
    marginBridge: allowDemoSeeds()
      ? [
          { label: "Shipper revenue", value: lastRevenue },
          { label: "Partner payout", value: -Math.round(lastRevenue * 0.62) },
          { label: "GST", value: -lastGst },
          { label: "Net margin", value: Math.round(lastRevenue * 0.2) },
        ]
      : [
          { label: "Shipper revenue", value: lastRevenue },
          { label: "GST", value: -lastGst },
        ],
  };
}

export type CommandCenterAnalytics = Awaited<ReturnType<typeof getCommandCenterAnalytics>>;
export type OperationsAnalytics = Awaited<ReturnType<typeof getOperationsAnalytics>>;
export type DriversAnalytics = Awaited<ReturnType<typeof getDriversAnalytics>>;
export type FleetAnalytics = Awaited<ReturnType<typeof getFleetAnalytics>>;
export type LanesAnalytics = Awaited<ReturnType<typeof getLanesAnalytics>>;
export type NetworkAnalytics = Awaited<ReturnType<typeof getNetworkAnalytics>>;
export type BillingAnalytics = Awaited<ReturnType<typeof getBillingAnalytics>>;
