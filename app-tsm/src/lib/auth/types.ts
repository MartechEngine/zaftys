export type UserRole = "admin" | "dispatcher" | "fleet_manager" | "client" | "partner";

export type AuthSource = "auth_lite" | "tranzfort" | "seat";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  /** How this session was created. Default auth_lite for legacy DEV_USERS. */
  authSource?: AuthSource;
  /** TranZfort Auth user / profiles.id when authSource=tranzfort */
  tzUserId?: string;
  supplierId?: string;
  tsmOrgId?: string;
  /** Link to Settings org_users row when authSource=seat */
  orgUserId?: string;
  verificationStatus?: string;
  canPublishToTranzfort?: boolean;
}

export interface SessionPayload extends SessionUser {
  exp: number;
}
