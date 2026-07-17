export type UserRole = "admin" | "dispatcher" | "fleet_manager" | "client" | "partner";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface SessionPayload extends SessionUser {
  exp: number;
}
