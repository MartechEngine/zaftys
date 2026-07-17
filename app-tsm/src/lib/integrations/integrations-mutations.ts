import { logActivity } from "@/lib/dev-store";
import type { WebhookRecord, DeviceRecord, TelematicsProvider } from "@/lib/integrations/integrations-repository";

const g = globalThis as typeof globalThis & {
  __tsmWebhooks?: WebhookRecord[];
  __tsmDevices?: DeviceRecord[];
  __tsmTelematics?: TelematicsProvider[];
};

export function listStoredWebhooks(): WebhookRecord[] {
  if (!g.__tsmWebhooks) g.__tsmWebhooks = [];
  return [...g.__tsmWebhooks];
}

export function createStoredWebhook(input: {
  url: string;
  events: string;
}): WebhookRecord {
  if (!g.__tsmWebhooks) g.__tsmWebhooks = [];
  const wh: WebhookRecord = {
    id: `wh-${Date.now().toString(36)}`,
    url: input.url.trim(),
    events: input.events.trim() || "order.*",
    status: "active",
    lastDelivery: "Just now",
  };
  g.__tsmWebhooks.unshift(wh);
  logActivity({
    shipmentId: "",
    type: "webhook.created",
    message: `Webhook ${wh.url}`,
    timestamp: new Date().toISOString(),
  });
  return wh;
}

export function listStoredDevices(): DeviceRecord[] {
  if (!g.__tsmDevices) g.__tsmDevices = [];
  return [...g.__tsmDevices];
}

export function createStoredDevice(input: {
  imei: string;
  vehicle: string;
  vehicleId?: string;
  provider?: string;
}): DeviceRecord {
  if (!g.__tsmDevices) g.__tsmDevices = [];
  const device: DeviceRecord = {
    id: `dv-${Date.now().toString(36)}`,
    imei: input.imei.trim(),
    vehicle: input.vehicle.trim(),
    vehicleId: input.vehicleId,
    provider: input.provider?.trim() || "Flespi",
    firmware: "2.4.1",
    status: "online",
  };
  g.__tsmDevices.unshift(device);
  logActivity({
    shipmentId: "",
    type: "device.registered",
    message: `${device.imei} → ${device.vehicle}`,
    timestamp: new Date().toISOString(),
  });
  return device;
}

export function listStoredTelematics(): TelematicsProvider[] {
  if (!g.__tsmTelematics) g.__tsmTelematics = [];
  return [...g.__tsmTelematics];
}

export function createStoredTelematics(input: {
  name: string;
}): TelematicsProvider {
  if (!g.__tsmTelematics) g.__tsmTelematics = [];
  const provider: TelematicsProvider = {
    id: `tp-${Date.now().toString(36)}`,
    name: input.name.trim(),
    vehicles: 0,
    status: "connected",
    lastPing: "Just now",
  };
  g.__tsmTelematics.unshift(provider);
  logActivity({
    shipmentId: "",
    type: "telematics.added",
    message: provider.name,
    timestamp: new Date().toISOString(),
  });
  return provider;
}
