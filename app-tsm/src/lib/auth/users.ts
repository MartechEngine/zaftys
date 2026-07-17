import type { SessionUser } from "@/lib/auth/types";
import { defaultRouteForRole } from "@/lib/navigation";

/** Dev-only users — replace with DB / Fleetbase org users in production */
export const DEV_USERS: Array<SessionUser & { password: string }> = [
  {
    id: "u-admin",
    email: "admin@zaftys.com",
    name: "Admin",
    role: "admin",
    password: "dev",
  },
  {
    id: "u-dispatcher",
    email: "dispatcher@zaftys.com",
    name: "Dispatcher",
    role: "dispatcher",
    password: "dev",
  },
  {
    id: "u-fleet",
    email: "fleet@zaftys.com",
    name: "Fleet Manager",
    role: "fleet_manager",
    password: "dev",
  },
  {
    id: "u-client",
    email: "client@acme.com",
    name: "Acme Client",
    role: "client",
    password: "dev",
  },
];

export function verifyDevCredentials(email: string, password: string) {
  const user = DEV_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) return null;
  const { password: _, ...sessionUser } = user;
  return sessionUser;
}

export function getDefaultRoute(role: SessionUser["role"]) {
  return defaultRouteForRole(role);
}
