import { randomBytes } from "crypto";
import { upsertDocument, loadCollection, deleteDocument } from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";

export type InviteTokenKind = "org_user" | "client_user";

export type InviteTokenRecord = {
  id: string;
  token: string;
  kind: InviteTokenKind;
  email: string;
  subjectId: string;
  clientId?: string;
  /** Owning TSM org for team seats */
  tsmOrgId?: string;
  /** Portal role label at invite time (Dispatcher / Viewer) */
  seatRole?: string;
  invitedName?: string;
  createdAt: string;
  expiresAt: string;
  consumedAt?: string;
};

const g = globalThis as typeof globalThis & {
  __tsmInviteTokens?: Map<string, InviteTokenRecord>;
};

function memoryStore() {
  if (!g.__tsmInviteTokens) g.__tsmInviteTokens = new Map();
  return g.__tsmInviteTokens;
}

function newToken() {
  return randomBytes(24).toString("base64url");
}

/** Create (or replace) an invite token and return the path `/invite/[token]`. */
export async function createInviteToken(input: {
  kind: InviteTokenKind;
  email: string;
  subjectId: string;
  clientId?: string;
  tsmOrgId?: string;
  seatRole?: string;
  invitedName?: string;
  ttlHours?: number;
}): Promise<{ token: string; invitePath: string; record: InviteTokenRecord }> {
  const token = newToken();
  const now = new Date();
  const ttlHours = input.ttlHours ?? 168;
  const record: InviteTokenRecord = {
    id: token,
    token,
    kind: input.kind,
    email: input.email.trim().toLowerCase(),
    subjectId: input.subjectId,
    clientId: input.clientId,
    tsmOrgId: input.tsmOrgId?.trim() || undefined,
    seatRole: input.seatRole?.trim() || undefined,
    invitedName: input.invitedName?.trim() || undefined,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ttlHours * 3600_000).toISOString(),
  };

  memoryStore().set(token, record);

  if (isDatabaseConfigured()) {
    try {
      await upsertDocument("invite_tokens", token, record);
    } catch (err) {
      console.error("[invite-tokens] persist failed", err);
    }
  }

  return { token, invitePath: `/invite/${token}`, record };
}

export async function getInviteToken(token: string): Promise<InviteTokenRecord | undefined> {
  const key = token.trim();
  if (!key) return undefined;

  const cached = memoryStore().get(key);
  if (cached) return cached;

  if (isDatabaseConfigured()) {
    try {
      const rows = await loadCollection<InviteTokenRecord>("invite_tokens");
      for (const row of rows) {
        if (row?.token) memoryStore().set(row.token, row);
      }
      return memoryStore().get(key);
    } catch (err) {
      console.error("[invite-tokens] load failed", err);
    }
  }

  return undefined;
}

/** Mark invite consumed (one-time). Soft-delete from memory + DB when possible. */
export async function consumeInviteToken(token: string): Promise<boolean> {
  const record = await getInviteToken(token);
  if (!record) return false;
  if (record.consumedAt) return false;

  memoryStore().delete(token);
  if (isDatabaseConfigured()) {
    try {
      await deleteDocument("invite_tokens", token);
    } catch {
      try {
        await upsertDocument("invite_tokens", token, {
          ...record,
          consumedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("[invite-tokens] consume persist failed", err);
      }
    }
  }
  return true;
}
