import { demoIntegrations, demoWebhooks, demoApiLogs, demoPlatformEvents, demoTelematicsProviders, demoDevices, demoSensors, demoSocketChannels, demoFuelProviders } from "@/lib/demo-data";
import { getSyncStatus, listActivities, listVehicles } from "@/lib/data/shipment-repository";
import {
  createStoredDevice,
  createStoredTelematics,
  createStoredWebhook,
  deleteStoredWebhook,
  listStoredDevices,
  listStoredTelematics,
  listStoredWebhooks,
  patchStoredDevice,
} from "@/lib/integrations/integrations-mutations";
import {
  getDevicePatch,
  getFleetbaseKeyMask,
  getFuelProviderStatus,
  getTelematicsPing,
  isWebhookDeleted,
  markWebhookDeleted,
  patchDeviceFields,
  recordTelematicsPing,
  rotateFleetbaseKeyMask,
  setFuelProviderStatus,
} from "@/lib/mutations/sprint12-store";
import {
  getFleetbaseHealthCheck,
  recordFleetbaseHealthCheck,
} from "@/lib/mutations/sprint15-store";

export type IntegrationStatus = "connected" | "disconnected";

export type IntegrationRecord = {
  id: string;
  name: string;
  status: IntegrationStatus;
  latency: string;
  detail: string;
};

export type WebhookRecord = {
  id: string;
  url: string;
  events: string;
  status: "active" | "failed";
  lastDelivery: string;
};

function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs}h ago`;
}

export async function getIntegrationsOverview() {
  const sync = await getSyncStatus();

  const integrations: IntegrationRecord[] = demoIntegrations.map((item) => {
    if (item.name === "Fleetbase API") {
      const live =
        sync.dataSource === "fleetbase" ||
        sync.fleetbaseReachable ||
        Boolean(process.env.FLEETBASE_API_KEY);
      return {
        ...item,
        status: live ? ("connected" as const) : ("disconnected" as const),
        detail: live
          ? `Data source: ${sync.dataSource ?? "dev-store"}`
          : "Set FLEETBASE_API_KEY in .env.local",
        latency: sync.fleetbaseReachable ? item.latency : "—",
      };
    }

    if (item.name === "TranZfort Sync") {
      const configured = Boolean(sync.tranzfortConfigured);
      return {
        ...item,
        status: configured && sync.healthy ? ("connected" as const) : ("disconnected" as const),
        detail: configured
          ? `Last sync ${formatRelative(sync.lastSyncAt)}`
          : "Set TRANZFORT env vars to enable",
      };
    }

    if (item.name === "OpenFreeMap") {
      return {
        ...item,
        status: "connected" as const,
        detail: "Live map tiles (no API key required)",
      };
    }

    return item;
  });

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  return {
    integrations,
    webhooks: demoWebhooks as WebhookRecord[],
    connectedCount,
    telematicsConnected: 2,
    deviceCount: 3,
    sync,
  };
}

export type ApiLogRecord = {
  id: string;
  method: string;
  path: string;
  status: number;
  latency: string;
  time: string;
};

export type PlatformEventRecord = {
  id: string;
  type: string;
  resource: string;
  source: string;
  time: string;
};

export async function listApiLogs(): Promise<ApiLogRecord[]> {
  const sync = await getSyncStatus();
  const live: ApiLogRecord[] = [];

  if (sync.dataSource === "fleetbase" || sync.fleetbaseReachable) {
    live.push({
      id: "log-live-orders",
      method: "GET",
      path: "/v1/orders",
      status: 200,
      latency: "42ms",
      time: "Just now",
    });
  }

  if (sync.tranzfortConfigured) {
    live.push({
      id: "log-live-sync",
      method: "POST",
      path: "/api/sync/run",
      status: sync.healthy ? 200 : 503,
      latency: "—",
      time: formatRelative(sync.lastSyncAt),
    });
  }

  return [...live, ...demoApiLogs];
}

export async function listPlatformEvents(): Promise<PlatformEventRecord[]> {
  const activities = listActivities(5);
  const fromActivity: PlatformEventRecord[] = activities.map((a) => ({
    id: a.id,
    type: a.type,
    resource: a.message.split("·")[0]?.trim() ?? a.message.slice(0, 40),
    source: "TSM Portal",
    time: formatRelative(a.timestamp),
  }));

  const merged = [...fromActivity, ...demoPlatformEvents];
  const seen = new Set<string>();
  return merged.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

export type FleetbaseIntegrationDetail = {
  connection: "connected" | "disconnected" | "demo";
  apiUrl: string;
  apiKeyMasked: string;
  dataSource: string;
  lastHealthCheck: string;
  latencyMs: number | null;
  schedules: { name: string; lastRun: string; status: "ok" | "warning" | "error" }[];
};

export type TelematicsProvider = {
  id: string;
  name: string;
  vehicles: number;
  status: "connected" | "disconnected";
  lastPing: string;
};

export async function getFleetbaseIntegrationDetail(): Promise<FleetbaseIntegrationDetail> {
  const sync = await getSyncStatus();
  const live =
    sync.dataSource === "fleetbase" ||
    sync.fleetbaseReachable ||
    Boolean(process.env.FLEETBASE_API_KEY);

  const rotated = getFleetbaseKeyMask();
  const health = getFleetbaseHealthCheck();

  return {
    connection: live ? "connected" : process.env.TSM_DEMO_UI === "0" ? "disconnected" : "demo",
    apiUrl: process.env.FLEETBASE_API_URL ?? "http://localhost:8000/v1",
    apiKeyMasked:
      rotated ??
      (process.env.FLEETBASE_API_KEY ? "••••••••••••live" : "••••••••••••demo"),
    dataSource: sync.dataSource ?? "dev-store",
    lastHealthCheck: health
      ? formatRelative(health.checkedAt)
      : sync.fleetbaseReachable
        ? "2 min ago"
        : "—",
    latencyMs: health?.latencyMs ?? (sync.fleetbaseReachable ? 42 : null),
    schedules: [
      {
        name: "TranZfort sync",
        lastRun: sync.tranzfortConfigured ? formatRelative(sync.lastSyncAt) : "Not configured",
        status: sync.tranzfortConfigured && sync.healthy ? "ok" : "warning",
      },
      {
        name: "Document expiry scan",
        lastRun: "daily 06:00",
        status: "ok",
      },
      {
        name: "Webhook retry queue",
        lastRun: "every 5 min",
        status: "ok",
      },
    ],
  };
}

export async function rotateFleetbaseKey() {
  rotateFleetbaseKeyMask();
  return getFleetbaseIntegrationDetail();
}

export async function runFleetbaseHealthCheck() {
  const sync = await getSyncStatus();
  const start = Date.now();
  const reachable = Boolean(sync.fleetbaseReachable);
  const latencyMs = reachable ? Math.max(12, Date.now() - start + 42) : 0;
  recordFleetbaseHealthCheck(reachable || process.env.TSM_DEMO_UI !== "0", latencyMs || 38);
  return {
    ...(await getFleetbaseIntegrationDetail()),
    reachable: reachable || process.env.TSM_DEMO_UI !== "0",
  };
}

export async function listTelematicsProviders(): Promise<TelematicsProvider[]> {
  const sync = await getSyncStatus();
  const vehicleCount = sync.dataSource === "fleetbase" ? 12 : 5;

  const demo = demoTelematicsProviders.map((provider) => {
    const ping = getTelematicsPing(provider.id);
    let row = { ...provider };
    if (provider.name.startsWith("Flespi") && sync.fleetbaseReachable) {
      row = { ...row, vehicles: vehicleCount, lastPing: "Just now" };
    }
    if (ping) {
      row = { ...row, lastPing: ping, status: "connected" as const };
    }
    return row;
  });

  const stored = listStoredTelematics().map((provider) => {
    const ping = getTelematicsPing(provider.id);
    return ping ? { ...provider, lastPing: ping, status: "connected" as const } : provider;
  });

  return [...stored, ...demo];
}

export function validateCreateTelematicsInput(
  body: unknown,
): { name: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const name = String((body as Record<string, unknown>).name ?? "").trim();
  if (!name) return { error: "Provider name is required." };
  return { name };
}

export async function createTelematicsProvider(name: string) {
  return createStoredTelematics({ name });
}

export async function testTelematicsProvider(id: string) {
  const providers = await listTelematicsProviders();
  const provider = providers.find((p) => p.id === id);
  if (!provider) return undefined;
  recordTelematicsPing(id);
  const updated = (await listTelematicsProviders()).find((p) => p.id === id);
  return updated;
}

export type DeviceRecord = {
  id: string;
  imei: string;
  vehicle: string;
  vehicleId?: string;
  provider: string;
  firmware: string;
  status: "online" | "offline";
};

export type SensorRecord = {
  id: string;
  device: string;
  type: string;
  value: string;
  updated: string;
};

export type SocketChannelRecord = {
  id: string;
  channel: string;
  subscribers: number;
  lastMessage: string;
};

export type FuelProviderRecord = {
  id: string;
  name: string;
  stations: number;
  status: "connected" | "disconnected";
};

export type TraccarBridgeDetail = {
  serverUrl: string;
  devicesSynced: number;
  lastSync: string;
  status: "connected" | "disconnected";
};

export async function listDevices(vehicleRegistration?: string): Promise<DeviceRecord[]> {
  const vehicles = await listVehicles();
  const fromDemo: DeviceRecord[] = demoDevices.map((d) => {
    const vehicle = vehicles.find((v) => v.registration === d.vehicle);
    return { ...d, vehicleId: vehicle?.id };
  });

  const withDevice = new Set(fromDemo.map((d) => d.vehicle));
  const synthetic: DeviceRecord[] = vehicles
    .filter((v) => !withDevice.has(v.registration))
    .slice(0, 2)
    .map((v, index) => ({
      id: `dv-synth-${v.id}`,
      imei: `35963310001${2340 + index}`,
      vehicle: v.registration,
      vehicleId: v.id,
      provider: index % 2 === 0 ? "Flespi" : "Traccar",
      firmware: "2.4.1",
      status: v.status === "on_trip" ? ("online" as const) : ("offline" as const),
    }));

  const merged = [...listStoredDevices(), ...fromDemo, ...synthetic].map((d) => {
    const patch = getDevicePatch(d.id);
    return patch ? { ...d, ...patch } : d;
  });
  if (vehicleRegistration) {
    return merged.filter((d) => d.vehicle === vehicleRegistration);
  }
  return merged;
}

export function validateCreateDeviceInput(
  body: unknown,
): { imei: string; vehicle: string; provider?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const imei = String(data.imei ?? "").trim();
  const vehicle = String(data.vehicle ?? "").trim();
  if (!imei) return { error: "IMEI is required." };
  if (!vehicle) return { error: "Vehicle is required." };
  return {
    imei,
    vehicle,
    provider: String(data.provider ?? "").trim() || undefined,
  };
}

export async function createDevice(input: {
  imei: string;
  vehicle: string;
  provider?: string;
}) {
  return createStoredDevice(input);
}

export async function updateDevice(
  id: string,
  patch: { vehicle?: string; vehicleId?: string },
): Promise<DeviceRecord | undefined> {
  const existing = (await listDevices()).find((d) => d.id === id);
  if (!existing) return undefined;

  const stored = patchStoredDevice(id, patch);
  if (stored) return { ...stored, ...getDevicePatch(id) };

  patchDeviceFields(id, patch);
  return { ...existing, ...patch };
}

export async function listSensors(): Promise<SensorRecord[]> {
  const devices = await listDevices();
  const online = devices.filter((d) => d.status === "online");
  const live: SensorRecord[] = online.flatMap((device, index) => [
    {
      id: `sn-live-${device.id}-gps`,
      device: device.imei,
      type: "GPS",
      value: `${(20.9 + index * 0.05).toFixed(4)}°N, ${(77.7 + index * 0.08).toFixed(4)}°E`,
      updated: "30s ago",
    },
    {
      id: `sn-live-${device.id}-speed`,
      device: device.imei,
      type: "Speed",
      value: `${48 + index * 7} km/h`,
      updated: "30s ago",
    },
  ]);

  const seen = new Set<string>();
  return [...live, ...demoSensors].filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

export async function listWebhooks(): Promise<WebhookRecord[]> {
  return [...listStoredWebhooks(), ...(demoWebhooks as WebhookRecord[])].filter(
    (wh) => !isWebhookDeleted(wh.id),
  );
}

export function validateCreateWebhookInput(
  body: unknown,
): { url: string; events: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const url = String(data.url ?? "").trim();
  if (!url) return { error: "Webhook URL is required." };
  if (!/^https?:\/\//i.test(url)) return { error: "URL must start with http:// or https://." };
  return {
    url,
    events: String(data.events ?? "").trim() || "order.*",
  };
}

export async function createWebhook(input: { url: string; events: string }) {
  return createStoredWebhook(input);
}

export async function deleteWebhook(id: string): Promise<boolean> {
  const existing = (await listWebhooks()).find((w) => w.id === id);
  if (!existing) return false;
  if (deleteStoredWebhook(id)) return true;
  markWebhookDeleted(id);
  return true;
}

export async function listSocketChannels(): Promise<SocketChannelRecord[]> {
  const sync = await getSyncStatus();
  const live: SocketChannelRecord[] = [];

  if (sync.tranzfortConfigured) {
    live.push({
      id: "sk-live-sync",
      channel: "sync.completed",
      subscribers: 2,
      lastMessage: formatRelative(sync.lastSyncAt),
    });
  }

  live.push({
    id: "sk-live-map",
    channel: "driver.location",
    subscribers: 5,
    lastMessage: "15s ago",
  });

  const seen = new Set<string>();
  return [...live, ...demoSocketChannels].filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}

export async function listFuelProviders(): Promise<FuelProviderRecord[]> {
  const { listFuelTransactions } = await import("@/lib/fleet/fuel-repository");
  const transactions = await listFuelTransactions();
  const stationNames = new Set(transactions.map((t) => t.station.split(" ")[0]));

  return demoFuelProviders.map((provider) => {
    const statusOverride = getFuelProviderStatus(provider.id);
    const row = {
      ...provider,
      ...(statusOverride ? { status: statusOverride } : {}),
    };
    if (row.status === "connected") {
      return { ...row, stations: Math.max(provider.stations, stationNames.size * 12) };
    }
    return row;
  });
}

export async function updateFuelProviderStatus(
  id: string,
  status: "connected" | "disconnected",
): Promise<FuelProviderRecord | undefined> {
  const existing = (await listFuelProviders()).find((p) => p.id === id);
  if (!existing) return undefined;
  setFuelProviderStatus(id, status);
  return (await listFuelProviders()).find((p) => p.id === id);
}

export async function getTraccarBridgeDetail(): Promise<TraccarBridgeDetail> {
  const devices = await listDevices();
  const traccarCount = devices.filter((d) => d.provider === "Traccar").length;
  const sync = await getSyncStatus();
  const { getTraccarTestState } = await import("@/lib/mutations/sprint11-store");
  const test = getTraccarTestState();

  return {
    serverUrl: process.env.TRACCAR_SERVER_URL ?? "https://gps.zaftys.internal",
    devicesSynced: traccarCount,
    lastSync: test
      ? formatRelative(test.lastTestAt)
      : sync.tranzfortConfigured
        ? formatRelative(sync.lastSyncAt)
        : "3 min ago",
    status: test?.status ?? (traccarCount > 0 ? "connected" : "disconnected"),
  };
}

export async function testTraccarConnection() {
  const { recordTraccarTest } = await import("@/lib/mutations/sprint11-store");
  const test = recordTraccarTest();
  const detail = await getTraccarBridgeDetail();
  return { ...detail, testedAt: test.lastTestAt };
}
