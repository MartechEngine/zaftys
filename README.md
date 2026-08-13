# ZAFTYS Logistics Website

This repository contains the marketing website for **ZAFTYS Logistics**, a static site built with modern frontend tooling.

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Local development

Make sure you have Node.js and npm installed.

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available on the local development URL printed in your terminal (by default, Vite uses port 5173).

## Production build

```sh
npm run build
```

This command outputs a static production build to the `dist` folder, which can be deployed to any static hosting provider.

## Deploy (GitHub Actions → Hostinger FTP)

Push to `main` (or run **Actions → Build and Deploy ZAFTYS to Hostinger via FTP → Run workflow**) to:

1. Build the Vite site (copies `public/api` and `public/config` into `dist/`)
2. Generate `dist/config/zaftys-secrets.php` from GitHub Secrets
3. FTP `dist/` to Hostinger `public_html/`
4. POST `/api/migrate.php` to apply `public/config/migrations/*.sql` (newsletter + page-visit tables)

A separate scheduled workflow emails a 24-hour visitor CSV to `info@zaftys.com` and deletes visit rows older than 90 days.

Do not commit `zaftys-secrets.php` or database/SMTP passwords.

### GitHub → Settings → Secrets and variables → Actions

**Already used (keep these):**

| Secret | Example / notes |
|---|---|
| `FTP_SERVER` | Hostinger FTP hostname |
| `FTP_USERNAME` | FTP user |
| `FTP_PASSWORD` | FTP password |
| `FTP_PATH` | `public_html/` |

**Required for forms + newsletter:**

| Secret | What to put |
|---|---|
| `DB_NAME` | MySQL database name |
| `DB_USER` | MySQL user |
| `DB_PASS` | MySQL password |
| `SMTP_USER` | `no-reply@zaftys.com` |
| `SMTP_PASS` | Password for that mailbox |
| `MIGRATE_TOKEN` | Long random string (32+ chars). Same value is written into `zaftys-secrets.php` and sent as `X-Zaftys-Migrate-Token` after deploy |

**Recommended:**

| Secret | What to put |
|---|---|
| `DB_HOST` | `localhost` |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_ENCRYPTION` | `ssl` |
| `SMTP_FROM` | `no-reply@zaftys.com` |
| `SITE_URL` | `https://zaftys.com` (no trailing slash) |
| `IP_HASH_SALT` | Random string (stable across deploys). If omitted, CI derives one from `MIGRATE_TOKEN` |

**Optional (defaults exist in CI if unset):**

| Secret | Default |
|---|---|
| `SMTP_FROM_NAME` | `ZAFTYS Website` |
| `MAIL_CONTACT` | `contact@zaftys.com` |
| `MAIL_SUBSCRIBERS` | `subscribers@zaftys.com` |
| `MAIL_PARTNER` | `partner@zaftys.com` |
| `MAIL_CAREERS` | `careers@zaftys.com` |
| `MAIL_VISITS` | `info@zaftys.com` (daily visitor CSV) |
| `VITE_CLARITY_ID` | Microsoft Clarity project ID |
| `VITE_GA_MEASUREMENT_ID` | GA4 ID, e.g. `G-XXXXXXXX` |

Create `MIGRATE_TOKEN` once, for example:

```sh
openssl rand -hex 32
```

