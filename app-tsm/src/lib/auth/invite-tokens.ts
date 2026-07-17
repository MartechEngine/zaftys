import { randomBytes } from "crypto";
import { upsertDocument, loadCollection } from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";

export type InviteTokenKind = "org_user" | "client_user";

export type InviteTokenRecord = {
  id: string;
  token: string;
  kind: InviteTokenKind;
  email: string;
  subjectId: string;
  clientId?: string;
  createdAt: string;
  expiresAt: string;
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
