import { getDriver } from "@/lib/data/fleet-repository";
import { resendDriverInvite } from "@/lib/mutations/entity-stores";

export type DriverInviteStatus = {
  driverId: string;
  driverName: string;
  phone: string;
  inviteStatus: "accepted" | "pending" | "not_sent";
  lastActive: string;
  appVersion: string;
  canResend: boolean;
  lastResentAt?: string;
};

export async function getDriverInvite(id: string): Promise<DriverInviteStatus | undefined> {
  const driver = await getDriver(id);
  if (!driver) return undefined;

  const onTrip = driver.status === "on_trip";
  const onDuty = driver.status === "on_duty";
  const g = globalThis as typeof globalThis & {
    __tsmInviteResends?: Record<string, number>;
  };
  const resentCount = g.__tsmInviteResends?.[id] ?? 0;

  return {
    driverId: driver.id,
    driverName: driver.name,
    phone: driver.phone,
    inviteStatus: onTrip || onDuty ? "accepted" : resentCount > 0 ? "pending" : "pending",
    lastActive: onTrip ? "4 min ago" : onDuty ? "12 min ago" : "Never",
    appVersion: onTrip || onDuty ? "Navigator 2.1.0" : "—",
    canResend: true,
    lastResentAt: resentCount > 0 ? new Date().toISOString() : undefined,
  };
}

export async function resendNavigatorInvite(
  id: string,
): Promise<DriverInviteStatus | undefined> {
  const invite = await getDriverInvite(id);
  if (!invite) return undefined;
  const { resentAt } = resendDriverInvite(id);
  return {
    ...invite,
    inviteStatus: invite.inviteStatus === "not_sent" ? "pending" : invite.inviteStatus,
    lastResentAt: resentAt,
    canResend: true,
  };
}
