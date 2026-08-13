/**
 * Writes dist/config/zaftys-secrets.php from environment variables.
 * Used by GitHub Actions. Never print secret values.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";

function phpQuote(value) {
  return `'${String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

function required(name) {
  const value = process.env[name]?.trim() ?? "";
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

function optional(name, fallback) {
  const value = process.env[name]?.trim() ?? "";
  return value || fallback;
}

const dbName = required("DB_NAME");
const dbUser = required("DB_USER");
const dbPass = required("DB_PASS");
const smtpUser = required("SMTP_USER");
const smtpPass = required("SMTP_PASS");
const migrateToken = required("MIGRATE_TOKEN");

const ipHashSalt = optional(
  "IP_HASH_SALT",
  createHash("sha256").update(`${migrateToken}:ip-hash`).digest("hex").slice(0, 40),
);

const php = `<?php
return [
    'smtp_host' => ${phpQuote(optional("SMTP_HOST", "smtp.hostinger.com"))},
    'smtp_port' => ${Number.parseInt(optional("SMTP_PORT", "465"), 10) || 465},
    'smtp_encryption' => ${phpQuote(optional("SMTP_ENCRYPTION", "ssl"))},
    'smtp_user' => ${phpQuote(smtpUser)},
    'smtp_pass' => ${phpQuote(smtpPass)},
    'smtp_from' => ${phpQuote(optional("SMTP_FROM", smtpUser))},
    'smtp_from_name' => ${phpQuote(optional("SMTP_FROM_NAME", "ZAFTYS Website"))},

    'mail_contact' => ${phpQuote(optional("MAIL_CONTACT", "contact@zaftys.com"))},
    'mail_subscribers' => ${phpQuote(optional("MAIL_SUBSCRIBERS", "subscribers@zaftys.com"))},
    'mail_partner' => ${phpQuote(optional("MAIL_PARTNER", "partner@zaftys.com"))},
    'mail_careers' => ${phpQuote(optional("MAIL_CAREERS", "careers@zaftys.com"))},

    'db_host' => ${phpQuote(optional("DB_HOST", "localhost"))},
    'db_name' => ${phpQuote(dbName)},
    'db_user' => ${phpQuote(dbUser)},
    'db_pass' => ${phpQuote(dbPass)},

    'ip_hash_salt' => ${phpQuote(ipHashSalt)},
    'migrate_token' => ${phpQuote(migrateToken)},
];
`;

const out = resolve(process.env.ZAFTS_SECRETS_OUT || "dist/config/zaftys-secrets.php");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, php, { encoding: "utf8", mode: 0o600 });
console.log(`Wrote ${out}`);
