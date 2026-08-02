/**
 * Team seats (Phase C) — TSM-only credentials under a linked org.
 * Never creates TranZfort Auth users.
 */

import type { UserRole } from "@/lib/auth/types";
import { canPublishToTranzfort, toTsmSeatRole, type TsmSeatRole } from "@/lib/tsm/org";
import { listAuthUsersForOrg } from "@/lib/auth/auth-users-store";

/** Trial / v1 seat cap (pending + active login seats per org). */
export const MAX_SEATS_PER_ORG = 3;

export function canManageSeats(role: UserRole | TsmSeatRole): boolean {
  return toTsmSeatRole(role as UserRole) === "account_admin";
}

/** Map invite UI labels → portal UserRole (viewer ≈ fleet_manager for path access). */
export function mapInviteRoleToPortalRole(roleLabel: string): UserRole {
  const r = roleLabel.trim().toLowerCase();
  if (r === "admin" || r === "account_admin" || r.includes("admin")) return "admin";
  if (r === "viewer" || r.includes("view") || r === "read") return "fleet_manager";
  return "dispatcher";
}

export function isAdminRoleLabel(roleLabel: string): boolean {
  return mapInviteRoleToPortalRole(roleLabel) === "admin";
}

/** Active seat logins that can manage seats (portal role=admin). */
export function countActiveAdminSeats(tsmOrgId: string): number {
  return listAuthUsersForOrg(tsmOrgId).filter(
    (u) => u.status === "active" && u.role === "admin",
  ).length;
}

export function seatRoleLabel(role: UserRole): string {
  const seat = toTsmSeatRole(role);
  if (seat === "account_admin") return "Admin";
  if (seat === "dispatcher") return "Dispatcher";
  return "Viewer";
}

export function seatCanPublish(role: UserRole, canPublishFlag?: boolean): boolean {
  if (canPublishFlag === false) return false;
  return canPublishToTranzfort(role);
}
