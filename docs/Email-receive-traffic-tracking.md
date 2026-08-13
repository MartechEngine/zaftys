# Email receive & traffic tracking — ZAFTYS CTO decision

| Field | Value |
|-------|-------|
| **Project** | `zaftys-main` — marketing site (`zaftys.com`) |
| **Purpose** | Locked architecture for website traffic analytics, inbound form email, and newsletter subscription list — open source, zero SaaS spend, scalable |
| **Status** | Decisions locked (13 Aug 2026). Implementation not started |
| **Owner** | CTO / eng |
| **Last updated** | 13 August 2026 |
| **Related** | `marketing/SEO&Blog.md`, `marketing-website-sitemap-new.md`, `legal/terms-and-policies-draft.md`, `public/api/*.php` |

---

## How to use this file

1. **Section 1** — CTO decisions (what we do / do not do).
2. **Section 2** — Target architecture.
3. **Section 3** — Phased delivery plan with checklists.
4. **Section 4** — Implementation specs (Matomo, email, subscribers).
5. **Section 5** — Measurement goals & privacy.
6. **Section 6** — Decision log & rejected options.

Mark checklist items `[x]` when shipped. Do not reopen rejected options without a new CTO note in Section 6.

---

## Executive summary (CTO)

We will:

1. **Track traffic with self-hosted Matomo** on Hostinger (PHP + MySQL) — not Google Analytics / GTM as the primary stack.
2. **Receive all website form mail at `contact@zaftys.com`** (already provisioned). Keep Hostinger webmail; do **not** self-host a mail server.
3. **Build a real subscriber list on Hostinger MySQL**, fed by existing Footer/Blog newsletter UI via `newsletter.php`. Notify `contact@` on each signup.
4. **Send newsletters manually at first** (export + Hostinger SMTP / webmail BCC in small batches). Move to **Listmonk** on a free/cheap VPS only when campaigns become regular.
5. **Harden form delivery** by replacing PHP `mail()` with **Hostinger SMTP** for contact / partner / careers / newsletter alerts.

Constraints we accept: software is free; Hostinger hosting/email we already pay for; Listmonk (Phase 2) may need a free-tier or low-cost VPS. No paid ESP, no Google Analytics dependency, no self-hosted Mailcow/Postal.

---

# 1. CTO decisions (locked)

## 1.1 Decision matrix

| Area | Decision | Rationale |
|------|----------|-----------|
| Traffic analytics | **Matomo** (self-hosted on Hostinger) | Open source, GA-class depth, PHP+MySQL fits current host, data stays ours, scales without tool-switching |
| Search Console | **Keep Google Search Console** | Indexation / SEO ops only — not a traffic SaaS substitute |
| GTM / GA4 | **Do not adopt as primary** | Conflicts with OSS / zero-third-party analytics goal; Matomo covers marketing needs |
| Form email receive | **`contact@zaftys.com` only** | Already live; one ops inbox; simpler than splitting newsletter@ / leads@ early |
| Public mailto / schema | **Prefer `contact@` for website CTAs**; keep `legal@` / `info@` only where legal docs require | End email address drift (`info@` in UI vs `contact@` in PHP) |
| Mail server | **Hostinger email only** | Self-hosted MTA (Mailcow, Mailu, Postal, Stalwart) is ops-heavy and not “best” for a marketing site |
| Subscriber storage (Phase 1) | **MySQL table on Hostinger** | Real list, exportable, no SaaS; works with existing PHP APIs |
| Newsletter product (Phase 2) | **Listmonk** when volume/campaigns justify it | Best OSS newsletter engine at scale; defer until Phase 1 works |
| Campaign sending (Phase 1) | **Manual from export + Hostinger SMTP/webmail** | Honest zero-cost path; avoid blasting via raw `mail()` |
| Form transport | **Hostinger SMTP** (auth) instead of bare `mail()` | Reliability and deliverability without a third-party ESP |
| Report PDF email gate | **Out of scope** | Already deferred in resources docs |
| Paid tools (Brevo, Mailchimp, Formspree, etc.) | **Rejected** | Explicit product constraint |

## 1.2 Canonical addresses

| Address | Role |
|---------|------|
| `contact@zaftys.com` | **Canonical ops inbox** — contact, partner, careers, newsletter alerts, general website leads |
| `info@zaftys.com` | Legacy / secondary public address — **forward to `contact@`** or retire from site CTAs after migration |
| `legal@zaftys.com` | Privacy / legal / grievance only (unchanged) |
| `no-reply@zaftys.com` | Technical From for automated form notifications (SMTP authenticated if Hostinger allows) |

**Rule:** New product copy and PHP targets use `contact@zaftys.com` unless the use case is legal.

## 1.3 What “done” means

| Capability | Done when |
|------------|-----------|
| Traffic tracking | Matomo live on production; SPA pageviews + key goals firing; team can open dashboards without Google Analytics |
| Email receiving | All four form endpoints deliver reliably to `contact@`; SMTP authenticated; spam/honeypot retained |
| Subscription list | Every Footer/Blog subscribe writes a unique row to MySQL; CSV export possible; duplicate emails rejected gracefully |

---

# 2. Target architecture

```text
Browser (zaftys.com)
 │
 ├─ Matomo tracking script ──► Matomo (subdomain or /analytics)
 │                                  └── Hostinger MySQL (matomo_*)
 │
 ├─ React forms
 │    ├─ Contact / Partner / Careers ──► /api/*.php ──SMTP──► contact@zaftys.com
 │    └─ Newsletter (Footer, Blog) ──► /api/newsletter.php
 │                                         ├─ INSERT subscribers (MySQL)
 │                                         └─ SMTP notify → contact@zaftys.com
 │
 └─ WhatsApp CTAs (primary conversion) ──► tracked as Matomo goal/event

Phase 2 (later):
  newsletter.php ──API──► Listmonk (VPS) ──SMTP──► Hostinger or relay
  Matomo goals remain source of truth for site conversion analytics
```

## 2.1 Hosting layout (recommended)

| Component | Location | Notes |
|-----------|----------|-------|
| Marketing SPA | Existing Hostinger site root | Unchanged deploy path |
| PHP APIs | `public/api/` | Harden + SMTP |
| Matomo | Prefer `analytics.zaftys.com` **or** `zaftys.com/matomo/` | Subdomain cleaner for CSP/cookies; path install OK on shared hosting |
| Subscribers DB | Hostinger MySQL | Separate DB or dedicated tables with prefix `zaftys_` |
| Listmonk (Phase 2) | Separate VPS / free-tier cloud | Not on shared PHP hosting |

## 2.2 Current state (as of Aug 2026)

| Item | Status |
|------|--------|
| Contact / partner / careers / newsletter PHP | Exist; use `mail()` → `contact@zaftys.com` |
| Newsletter UI | Footer + Blog |
| Real subscriber storage | **Missing** |
| Analytics | **Not wired** (GTM comment only in `index.html`) |
| Email address consistency | UI/schema often `info@`; PHP uses `contact@` |

---

# 3. Phased delivery plan

## 3.1 Priority legend

| Priority | Meaning |
|----------|---------|
| **P0** | Ship first — unblocks measurement or breaks lead capture |
| **P1** | Reliability / list integrity |
| **P2** | Scale / campaign automation |
| **P3** | Nice-to-have |

---

## Phase 0 — Prerequisites (ops, ~1 day)

- [ ] Confirm Hostinger plan includes **MySQL** and enough DB slots for Matomo + app tables.
- [ ] Confirm `contact@zaftys.com` inbox works (send/receive test from external Gmail).
- [ ] Create Hostinger **email forwarding**: `info@` → `contact@` (if `info@` must remain published anywhere).
- [ ] Create MySQL database + user for Matomo; second DB or schema for `subscribers` (or one DB with clear prefixes).
- [ ] Obtain Hostinger **SMTP** host, port, username, password for `no-reply@` or `contact@`.
- [ ] Decide Matomo URL: `analytics.zaftys.com` vs path install; add DNS/SSL if subdomain.

**Exit criteria:** Inbox + MySQL + SMTP credentials verified offline.

---

## Phase 1 — Traffic tracking (Matomo) — P0

**Owner:** eng + whoever has Hostinger panel access  
**Target:** 2–4 days including QA

### 1A. Install

- [ ] Install Matomo on Hostinger (official installer or upload).
- [ ] Complete setup wizard; create site “ZAFTYS Marketing” with URL `https://zaftys.com`.
- [ ] Enable HTTPS; force Matomo admin behind strong password + 2FA if available.
- [ ] Restrict Matomo directory listing; keep `config/config.ini.php` non-public.
- [ ] Configure trusted hosts / CORS for `zaftys.com` and `www.zaftys.com`.

### 1B. Wire marketing site

- [ ] Add Matomo site ID + tracker URL via env (`VITE_MATOMO_URL`, `VITE_MATOMO_SITE_ID`) — **no hardcoded secrets**.
- [ ] Load Matomo in SPA in a way that tracks **client-side route changes** (React Router), not only first paint.
- [ ] Exclude `/login` and internal noise if needed.
- [ ] Verify pageviews for `/`, `/blog`, `/resources/reports`, `/contact`.

### 1C. Goals / events (minimum set)

| Goal / event | Trigger |
|--------------|---------|
| `cta_whatsapp` | WhatsApp button / FAB click |
| `cta_mailto` | Hero / nav mailto click |
| `form_contact_success` | Contact form success toast path |
| `form_partner_success` | Partner form success |
| `form_careers_success` | Careers form success |
| `newsletter_subscribe_success` | Newsletter success |
| `report_view` | Market report detail page view |
| `report_pdf_open` | PDF reader open (if trackable) |

- [ ] Implement the minimum goal/event set above.
- [ ] Document event names in this file when shipped (keep names stable).

### 1D. Privacy / legal sync

- [ ] Update Cookie Policy / Privacy copy to describe Matomo (self-hosted analytics).
- [ ] Prefer cookieless / privacy-friendly Matomo config where product-acceptable; if cookies required, ensure banner/consent language matches reality.
- [ ] Do **not** enable invasive session recording unless a later CTO decision says so.

**Exit criteria:** Team can answer “which pages convert?” from Matomo without GA.

---

## Phase 2 — Email receive reliability — P0/P1

**Target:** 1–2 days

### 2A. SMTP for all form APIs

- [ ] Add shared PHP mail helper (e.g. `public/api/_mail.php` or Composer PHPMailer if Hostinger allows) using SMTP.
- [ ] Store SMTP credentials **outside web root** or in Hostinger env — never commit passwords to git.
- [ ] Update: `contact.php`, `partner.php`, `careers.php`, `newsletter.php`.
- [ ] Keep honeypot (`website`) on all public forms; add honeypot to Footer/Blog newsletter posts if missing.
- [ ] Standardize From / Reply-To:
  - From: `ZAFTYS Website <no-reply@zaftys.com>` (or SMTP account identity)
  - Reply-To: submitter email where applicable
  - To: `contact@zaftys.com`

### 2B. Address consistency on site

- [ ] Change `COMPANY_EMAIL` / schema / mailto CTAs from `info@` → `contact@` **or** document intentional split + forwarding.
- [ ] Spot-check Contact page, Footer, Hero mailto, JSON-LD.

### 2C. Ops hygiene

- [ ] Create mailbox filters/labels: `Website / Contact`, `Website / Partner`, `Website / Careers`, `Website / Newsletter`.
- [ ] Weekly check that form test messages land in Inbox (not Spam).

**Exit criteria:** 4 form types deliver to `contact@` via SMTP in production tests.

---

## Phase 3 — Subscription list (MySQL) — P1

**Target:** 1–2 days

### 3A. Schema

```sql
CREATE TABLE zaftys_newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(64) NOT NULL DEFAULT 'footer',  -- footer | blog | other
  status ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
  subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL DEFAULT NULL,
  ip_hash CHAR(64) NULL,          -- optional, hashed; avoid storing raw IP long-term
  user_agent VARCHAR(512) NULL,   -- optional, truncate
  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3B. API behaviour (`newsletter.php`)

1. Validate email.
2. Honeypot → fake success.
3. `INSERT` subscriber; on duplicate unique email → return success (idempotent) or friendly “already subscribed”.
4. Send SMTP notification to `contact@` (optional throttle: skip notify on duplicate).
5. Return JSON `{ success: true }` for existing UI toasts.

- [ ] Implement DB insert + duplicate handling.
- [ ] Pass `source` from Footer vs Blog (`footer` / `blog`).
- [ ] Protect DB credentials (config outside public web root).
- [ ] Add `.htaccess` deny for any export files if file-based fallback is ever used.

### 3C. Export / admin (minimum)

Pick **one** for Phase 3 (prefer simplest):

| Option | When |
|--------|------|
| **A. phpMyAdmin export** | Fastest; no new UI |
| **B. Password-protected `subscribers-export.php`** | CSV download for marketing |

- [ ] Document how marketing exports the list.
- [ ] Never expose the table or CSV on a public URL without auth.

### 3D. Unsubscribe (minimum viable)

Until Listmonk:

- [ ] Privacy/newsletter copy: “Reply to unsubscribe” or email `contact@` with subject `Unsubscribe`.
- [ ] Ops process: set `status = unsubscribed` in DB when requested.
- [ ] Optional later: signed unsubscribe link endpoint.

**Exit criteria:** Subscribe from Footer and Blog creates durable rows; export works; duplicates don’t corrupt the list.

---

## Phase 4 — Campaigns at scale (Listmonk) — P2

**Trigger to start:** Regular newsletter sending (monthly+) **or** list > ~500 **or** need double opt-in / templates / open tracking.

- [ ] Provision small VPS or free-tier cloud (Docker).
- [ ] Deploy **Listmonk** + Postgres.
- [ ] Configure SMTP → Hostinger (rate limits!) or upgrade SMTP later if volume grows.
- [ ] Enable double opt-in list.
- [ ] Migrate MySQL subscribers → Listmonk (CSV import).
- [ ] Point `newsletter.php` at Listmonk public subscription API (keep React UI).
- [ ] Keep Matomo as site analytics; use Listmonk for campaign metrics only.
- [ ] Do **not** run Listmonk on shared Hostinger PHP hosting.

**Exit criteria:** Campaign send + unsubscribe + bounce handling without a paid ESP.

---

## Phase 5 — Optional polish — P3

- [ ] Matomo custom dimensions: industry page slug, report slug, UTM discipline.
- [ ] Matomo alerts (traffic drop / spike).
- [ ] Careers resume upload to disk + attach (currently filename only) — separate security review.
- [ ] Rate-limit PHP APIs (IP / time window).
- [ ] Centralize PHP config (`../config/zaftys-secrets.php` outside `public/`).
- [ ] Revisit Mautic **only** if marketing automation (drips, lead scoring) becomes a real requirement — not before Listmonk.

---

# 4. Implementation specs

## 4.1 Matomo (traffic)

| Item | Spec |
|------|------|
| Product | Matomo (open source) |
| Hosting | Hostinger shared/cloud as available |
| DB | Dedicated MySQL database |
| Frontend | Env-driven tracker; SPA route tracking |
| Primary KPIs | Sessions, top pages, referrers, WhatsApp CTA, form successes, report engagement |
| Not in v1 | Heatmaps, session replay, A/B testing plugins |

**Rejected analytics alternatives (for this project):**

| Tool | Why not primary |
|------|-----------------|
| Google Analytics 4 / GTM | Third-party; not aligned with OSS / data-ownership decision |
| Plausible CE | Needs Docker/ClickHouse; weaker Hostinger fit |
| Umami | Excellent lightweight option — reserve as Plan B if Matomo is too heavy on shared hosting |
| PostHog | Product-analytics platform; overkill for marketing site |
| GoatCounter | Too minimal for conversion goals we need |

**Plan B:** If Matomo strains Hostinger resources, switch to **Umami** on a free/cheap VPS and keep the same event taxonomy.

## 4.2 Email receive

| Item | Spec |
|------|------|
| Inbox | `contact@zaftys.com` |
| Transport | Hostinger SMTP (authenticated) |
| Endpoints | `contact.php`, `partner.php`, `careers.php`, `newsletter.php` |
| Spam | Honeypot field `website` on all public forms |
| Self-hosted MTA | **Forbidden for v1–v2** (Mailcow, Mailu, Postal, Stalwart, etc.) |

## 4.3 Subscription list

| Phase | System | Notes |
|-------|--------|-------|
| 1 | MySQL `zaftys_newsletter_subscribers` | Source of truth |
| 2 | Listmonk | Source of truth after migration |
| Always | Notify `contact@` on new signup (configurable) | Ops visibility |

**Rejected list tools (for now):** Brevo, Mailchimp, ConvertKit, Buttondown, Formspree, HubSpot.  
**Deferred:** phpList (acceptable Hostinger-native alternative if eng prefers packaged UI over custom table — note in decision log if chosen).  
**Deferred:** Mautic (automation suite; heavier than we need).

## 4.4 Repo touchpoints (expected)

| Area | Likely files |
|------|----------------|
| Tracker | `index.html` and/or `src/components/SEO.tsx` / new `src/lib/matomo.ts`, `src/App.tsx` (route hits) |
| Env example | `.env.example` with `VITE_MATOMO_URL`, `VITE_MATOMO_SITE_ID` |
| Newsletter UI | `src/components/Footer.tsx`, `src/pages/Blog.tsx` (pass `source`) |
| PHP | `public/api/newsletter.php`, contact/partner/careers + shared SMTP helper |
| Constants | `src/lib/constants.ts`, `src/lib/schema.ts` (email canonicalization) |
| Legal | Privacy / cookies sections if analytics description changes |

---

# 5. Measurement, privacy, ops

## 5.1 North-star marketing metrics (Matomo)

1. Qualified outreach: WhatsApp CTA clicks + contact form successes.  
2. Content demand: report and blog engagement.  
3. List growth: newsletter subscribe successes (cross-check MySQL count weekly).  
4. Acquisition: top referrers / campaigns (UTM discipline).

## 5.2 Privacy rules

- Store only what we need for analytics and the newsletter.
- Prefer hashed IP or Matomo anonymization settings.
- Honour unsubscribe promptly (Phase 3 process; Phase 4 automated).
- Update Privacy + Cookie pages before Matomo goes live on production if cookies/identifiers require disclosure.
- No selling of subscriber data. Newsletter is ZAFTYS insights / product updates only.

## 5.3 Security rules

- No secrets in git.
- Matomo admin not exposed without HTTPS + strong auth.
- Subscriber export behind auth or Hostinger panel only.
- Rate-limit public PHP endpoints when practical.
- Careers file uploads (if added later) need malware size/type checks — not part of this doc’s Phase 1–3.

## 5.4 Ops cadence

| Cadence | Action |
|---------|--------|
| Weekly | Export or review new subscribers; skim Matomo goals |
| Monthly | Content/newsletter decision from report + blog metrics |
| Quarterly | Revisit Phase 4 Listmonk trigger |

---

# 6. Decision log

| Date | Decision | Notes |
|------|----------|-------|
| 2026-08-13 | Adopt Matomo for traffic | Best OSS fit for Hostinger + scalable GA replacement |
| 2026-08-13 | Canonical form inbox = `contact@zaftys.com` | Already provisioned; avoid new addresses unless noise demands split |
| 2026-08-13 | No paid ESP / no GA primary | Product constraint: zero third-party purchase for these capabilities |
| 2026-08-13 | No self-hosted mail server | Hostinger email is sufficient for receive |
| 2026-08-13 | Phase 1 list = MySQL; Phase 2 = Listmonk | Avoid premature VPS ops; preserve upgrade path |
| 2026-08-13 | SMTP over `mail()` | Reliability without SaaS |
| 2026-08-13 | Report email paywall remains out of scope | See `marketing/resources-reports-tasks.md` |

### Explicitly rejected / deferred

| Option | Status | Reason |
|--------|--------|--------|
| GA4 + GTM as primary analytics | Rejected | Not OSS-first; data leaves our host |
| Brevo / Mailchimp / etc. | Rejected | Paid or third-party list lock-in vs stated constraint |
| Mailcow / Postal / Mailu | Rejected (near-term) | Ops cost, IP reputation, spam war |
| PostHog | Rejected for marketing site | Wrong problem shape |
| Plausible Cloud | Rejected | Paid cloud; CE needs infra we skip in Phase 1 |
| Listmonk in Phase 1 | Deferred | Needs VPS; MySQL list is enough to start |
| Mautic | Deferred | Automation overkill until Listmonk proven |
| phpList | Deferred alternative | Use if eng wants UI admin without building export |

---

# 7. Immediate next actions (eng)

1. Complete **Phase 0** Hostinger checks (MySQL, SMTP, inbox, Matomo URL).  
2. Install Matomo → wire SPA tracker + goals (**Phase 1**).  
3. SMTP-harden PHP APIs + canonicalize `contact@` (**Phase 2**).  
4. Ship MySQL newsletter persistence + export process (**Phase 3**).  
5. Revisit Listmonk only when Phase 4 trigger hits.

When implementation starts, update **Status** at the top of this file and check boxes in Section 3 as work lands.
