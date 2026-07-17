import { logActivity } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmClientUserInviteResends?: Record<
    string,
    { lastResentAt: string; count: number }
  >;
};

export function resendClientUserInvite(userId: string) {
  if (!g.__tsmClientUserInviteResends) g.__tsmClientUserInviteResends = {};
  const lastResentAt = new Date().toISOString();
  const count = (g.__tsmClientUserInviteResends[userId]?.count ?? 0) + 1;
  g.__tsmClientUserInviteResends[userId] = { lastResentAt, count };
  logActivity({
    shipmentId: "",
    type: "client_user.invite_resent",
    message: `${userId} · resend #${count}`,
    timestamp: lastResentAt,
  });
  return { lastResentAt, count };
}

export function getClientUserInviteResend(userId: string) {
  return g.__tsmClientUserInviteResends?.[userId];
}
