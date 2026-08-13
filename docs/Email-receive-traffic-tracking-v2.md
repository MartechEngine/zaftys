# Email Receive, Traffic Analytics & Subscriber Management — ZAFTYS CTO Decision v2

| Field | Value |
|---|---|
| **Project** | `zaftys-main` — marketing site (`zaftys.com`) |
| **Purpose** | Production architecture for website traffic analytics, conversion/lead tracking, inbound form email, newsletter subscription storage, attribution, privacy, and future newsletter campaigns |
| **Status** | **Shipped to production (13 Aug 2026)** — email, newsletter, Clarity/GA4, exact IP, geo CSV, contact City/PIN |
| **Owner** | CTO / solo engineering |
| **Last updated** | 13 August 2026 |
| **Related** | `marketing/SEO&Blog.md`, `marketing-website-sitemap-new.md`, `legal/terms-and-policies-draft.md`, `public/api/*.php` |
| **Build mode** | Solo developer, limited Hostinger backend experience — **easy mode is the default** |

---

## How to use this file

**If you are operating:** Sections **8** and **10** checklists are done for v1. Use **Section 6** for day-to-day ops.

The rest of this file is the **full architecture** (keep it). Do not reopen deferred P2 items without a new decision.

1. **Section 0** — Easy mode: what you click in Hostinger vs what code we add. **Read this first.**
2. **Section 1** — CTO decisions: what we do and do not do.
3. **Section 2** — Target architecture.
4. **Section 3** — Phased delivery plan (reference; easy mode trims this).
5. **Section 4** — Implementation specifications.
6. **Section 5** — Measurement, attribution, privacy, and security.
7. **Section 6** — Operational procedures.
8. **Section 7** — Decision log and rejected options.
9. **Section 8** — Immediate engineering actions.
10. **Section 10** — Exact visitor IP, form-email IPs, morning CSV, 90-day delete.

Mark checklist items `[x]` only when shipped and verified in production.

Do not reopen rejected options without a new CTO decision recorded in Section 7.

---

# Current production stack (as of 13 August 2026)

This overrides older Matomo-first wording later in the file.

| Piece | What is live |
|---|---|
| Form email | Hostinger SMTP. Contact → `contact@`, Partner → `partner@`, Careers → `careers@` |
| Newsletter | MySQL `zaftys_newsletter_subscribers`. New signups alert `subscribers@`. Unsubscribe = email `subscribers@` |
| Public mailto | `info@zaftys.com` |
| Traffic analytics | **Microsoft Clarity** + **GA4** (not Matomo). IDs from GitHub Secrets at build time |
| Exact visitor IP | **Section 10** — MySQL `zaftys_page_visits` + form emails + morning CSV to `info@`. Not taken from GA4/Clarity |
| Geo on CSV | Approximate country/region/city/ISP via ipwho.is (cached per IP). City-level, not GPS |
| Contact City/PIN | Optional fields on `/contact`; included on `contact@` email with typed values + approx IP location |
| Secrets | GitHub Actions writes `zaftys-secrets.php` on deploy. Never commit that file |
| Deploy | Push `main` → FTP to Hostinger → `POST /api/migrate.php` |
| Daily digest | GitHub Action `visit-digest.yml` ~07:00 IST → CSV to `info@` → purge rows older than 90 days |

GA4 is configured with `anonymize_ip: true`. Clarity/GA4 are **not** the source of exact IPs. Exact IPs come only from Hostinger `REMOTE_ADDR`.

---

# Executive summary

ZAFTYS will use a **self-owned, open-source-first architecture** for marketing-site analytics, lead capture, email receiving, and newsletter subscriptions.

We will:

1. Track website traffic and conversions with **self-hosted Matomo**, provided the selected Hostinger plan has sufficient resources and supports the required Matomo installation. If Matomo materially strains shared hosting, use **Umami on a small VPS** without changing the site's event taxonomy.
2. Keep **`contact@zaftys.com` dedicated to the Contact page form only** — not partner, careers, or newsletter noise.
3. Create **`subscribers@zaftys.com`** for newsletter signup alerts (the list itself lives in MySQL). Create **`partner@`** and **`careers@`** for those forms. Do **not** create an email for analytics/tracking.
4. Use **Hostinger authenticated SMTP** for transactional website notifications instead of PHP `mail()`.
5. Store newsletter subscribers in a **dedicated MySQL table** during Phase 1.
6. Capture basic **consent, source, attribution, subscription status, and audit metadata** needed to operate the list responsibly.
7. Keep the website newsletter UI independent from the campaign engine so that the backend can later migrate from MySQL to **Listmonk** without redesigning the React UI.
8. Track not only traffic but **business conversions**: WhatsApp, call, email, quote, demo, partner, contact, and other important CTAs.
9. Capture **UTM attribution** so marketing and sales can identify which campaigns generate qualified website activity.
10. Use basic server-side anti-abuse controls on all public PHP endpoints: validation, honeypot, rate limiting, payload limits, and safe error handling.
11. Send newsletters manually only while the list and campaign volume are genuinely small. Move to **Listmonk** when campaign frequency, list size, or compliance/automation requirements justify it.
12. Do **not** self-host a mail server.
13. Do **not** introduce paid ESPs, GA4/GTM as the primary analytics stack, or unnecessary marketing automation during the initial phases.

### Core principle

> **Measure business outcomes, own the data, minimize stored personal data, keep infrastructure simple, and introduce additional services only when operational demand justifies them.**

### Solo-dev principle

> **Keep the full architecture. Ship a thin first version. Prefer Hostinger panel clicks over custom backend. Prefer copy-paste PHP over learning DevOps. Never require SSH, Docker, Composer, or a VPS for v1.**

---

# 0. Solo-dev easy mode (default)

This section **overrides** later checklists when they conflict.

ZAFTYS is a **solo developer** with little Hostinger backend experience. The v2 architecture stays. The first build is intentionally smaller so it can be finished and tested.

## 0.1 Split of work

| You do (Hostinger hPanel) | Code does (repo — copy-paste / agent) |
|---|---|
| Create/confirm mailboxes (Section 1.2) | SMTP helper; each PHP form has its own To: |
| Confirm `contact@`, `subscribers@`, `partner@`, `careers@` | Public mailto/schema uses `info@`, not the form inboxes |
| Create 1 MySQL database + user | Newsletter table SQL (paste in phpMyAdmin) |
| Copy SMTP host / port / username | Secrets file template you fill once |
| Optional: Hostinger **Auto Installer** Matomo | React tracker + conversion events + UTM |
| phpMyAdmin to view/export subscribers | No custom admin UI in v1 |
| File Manager to upload `config` file | `.htaccess` so `/config` is not public |

You do **not** need to: SSH, Docker, Composer, VPS, cron debugging, Mailcow, Listmonk, or write PHP from scratch.

## 0.2 What v1 actually ships (keep it this small)

| Capability | v1 (easy) | Later (still in this doc, not now) |
|---|---|---|
| Form email to `contact@` | Hostinger SMTP via one PHP helper | — |
| Newsletter list | MySQL table + existing Footer/Blog forms | Listmonk |
| Unsubscribe | Reply / email `contact@`; you mark the row in phpMyAdmin | One-click signed link |
| Double opt-in | **No** — consent checkbox + recorded `consent_version` | Listmonk DOI |
| Analytics | Matomo **only if** Hostinger Auto Installer (or 1-click) works | Umami on VPS if Matomo fails |
| Events | WhatsApp, call, mailto, 3 forms, newsletter, report view/PDF | Extra dimensions, alerts |
| Quote tracking | `cta_whatsapp` / `cta_mailto` + contact form `interest` | Separate quote form (does not exist) |
| UTM | First-touch in browser `sessionStorage`; copy onto newsletter row | Full CRM |
| Abuse protection | Honeypot + validation + max length + simple file rate limit | Fancy bot detection |
| Export | phpMyAdmin CSV | `subscribers-export.php` |
| Careers resume file | Filename only (current) | Upload hardening |

## 0.3 Hostinger click path (Phase 0 — about 45 minutes)

Do these in **hPanel**. Write the values into a notes file; they go into `config/zaftys-secrets.php` later. Never commit that file to Git.

1. **Email → Email accounts** — create/confirm (test each from Gmail):
   - `contact@zaftys.com` — Contact **form** only
   - `subscribers@zaftys.com` — newsletter signup **alerts**
   - `partner@zaftys.com` — Partner form
   - `careers@zaftys.com` — Careers form
   - `info@zaftys.com` — public “email us” / mailto CTAs (not the contact form)
   - Optional: `no-reply@zaftys.com` — SMTP From only (you do not check this inbox)

2. **Do not** create `tracking@` or similar. Traffic tracking is Matomo, not email.

3. **Email → SMTP** (or Email client config)  
   Typical Hostinger values (confirm in panel; they vary):
   - Host: `smtp.hostinger.com` or `smtp.zaftys.com`
   - Port: `465` (SSL) or `587` (TLS)
   - Username: prefer `no-reply@zaftys.com`; if that mailbox is extra work, authenticate as `contact@zaftys.com`
   - Password: that mailbox’s password  

   One SMTP login sends all form notifications. The **To:** address is what splits inboxes (`contact@` vs `subscribers@` vs `partner@` vs `careers@`).

4. **Databases → MySQL**  
   Create **one** database, e.g. `u123_zaftys`, and one user with that DB only.  
   Matomo, if installed via Auto Installer, will create **its own** database — do not mix if the installer can make a second DB. If you only get one DB, use table prefixes (`zaftys_` vs Matomo’s).

5. **phpMyAdmin**  
   Confirm you can open the empty database. You will paste one `CREATE TABLE` later.

6. **File Manager**  
   Find site root (`public_html` is usually the live website).  
   Create folder `config` **next to** `public_html` if the panel allows (`domains/zaftys.com/config`).  
   If you **cannot** create files above `public_html`, create `public_html/config/` and we will block it with `.htaccess`. That is acceptable for v1.

7. **Auto Installer / Website → Applications**  
   Search **Matomo**.  
   - If it exists: install to `analytics.zaftys.com` **or** `/matomo/` following the installer. Prefer subdomain if DNS is easy.  
   - If it does **not** exist, or install fails, or the site becomes slow: **skip Matomo**. Do not debug Apache for days. Analytics waits; email + list still ship.

8. **PHP version**  
   In hPanel, set PHP to **8.1 or 8.2** if available. Do not go below 8.0.

### Phase 0 exit (easy)

You have: working split mailboxes (Section 1.2), SMTP notes, one MySQL database, File Manager access, and either Matomo installed **or** a written note “Matomo skipped — analytics later.”

## 0.4 What you will not do in v1

- No VPS, Docker, Umami, Listmonk, Mautic, Mailcow.
- No Composer / PHPMailer package install. SMTP helper is **one file we add to the repo**.
- No double opt-in confirmation emails (spam + extra PHP).
- No subscriber admin UI and no public CSV URL.
- No rate-limit database table. A small file-based limiter is enough.
- No careers file-upload security project.
- No self-hosted mail server.

If a later section says those are required for “done,” **easy mode wins**: v1 is done without them.

## 0.5 Event names for v1 (do not invent extra forms)

There is **no** separate quote API. Quote is WhatsApp or mailto, or Contact form interest.

Ship these events only:

```text
cta_whatsapp
cta_call
cta_mailto
cta_demo
cta_partner
cta_tranzfort

form_contact_success
form_partner_success
form_careers_success
newsletter_subscribe_success

report_view
report_pdf_open
```

Optional event **property** (not a new event): `intent` (`quote`, `demo`, …) and `placement` (`hero`, `fab`, `footer`, `report`).

Do **not** implement `form_quote_success` until a quote form exists.

## 0.6 Newsletter v1 behaviour (simple)

```text
User submits email (Footer or Blog)
       ↓
Validate + honeypot + rate limit
       ↓
INSERT MySQL (unique email)
       ↓
status = active
       ↓
consent_at + consent_version recorded
       ↓
optional: one SMTP notify to subscribers@
       ↓
React toast: Subscribed
```

- Duplicate email → still `{ "success": true }` (no error leak). Skip extra notify.
- Unsubscribe → user emails `contact@` with subject `Unsubscribe`; you set `status = unsubscribed` in phpMyAdmin.
- Double opt-in → **Phase 4 / Listmonk**, not v1.
- Keep `confirmed_at` column nullable for later; do not build confirm links now.

## 0.7 Suggested solo sequence (do not parallelize)

| Step | Days | What |
|---|---|---|
| 1 | 0.5 | Section 0.3 Hostinger clicks |
| 2 | 0.5 | Secrets file + SMTP helper + test contact form to inbox |
| 3 | 0.5 | Same helper on partner, careers, newsletter notify |
| 4 | 0.5 | MySQL table + newsletter.php insert + Footer/Blog `source` |
| 5 | 1–2 | Analytics tracker + events + UTM **only if** Matomo (or later Umami) exists |
| 6 | 0.5 | Privacy/cookie one-paragraph update + `contact@` on the site |

If SMTP is painful, **stop and fix SMTP** before analytics. A working inbox is more important than dashboards.

## 0.8 How to test without being a backend expert

1. Open the live site (or Hostinger preview).
2. Submit Contact with your Gmail → must arrive in `contact@` webmail.
3. Submit Footer newsletter with a second Gmail → row appears in phpMyAdmin.
4. Submit the same email again → still success; still one row.
5. Click WhatsApp FAB → if Matomo is live, event appears (wait 1–2 minutes).
6. If any PHP error is a white page: File Manager → that API file, or Hostinger error log. Do not change random `.htaccess` rules.

---

# 1. CTO decisions

## 1.1 Decision matrix

| Area | Decision | Rationale |
|---|---|---|
| Traffic analytics | **Matomo**, self-hosted if Hostinger resources/support are sufficient | Open source, strong marketing analytics, data ownership, PHP + MySQL fit |
| Analytics fallback | **Umami on small VPS** if Matomo materially strains Hostinger | Keeps analytics self-owned while reducing hosting load |
| Search Console | **Keep Google Search Console** | Required for SEO/indexation operations; it is not being used as the primary analytics platform |
| GTM / GA4 | **Do not adopt as primary analytics** | Not aligned with the current OSS/data-ownership constraint |
| Form inbox (Contact page) | **`contact@zaftys.com` only** | Dedicated to Contact form submissions — not mixed with list or other forms |
| Newsletter alerts | **`subscribers@zaftys.com`** | Signup notifications; list storage remains MySQL |
| Partner form | **`partner@zaftys.com`** | Separate ops inbox |
| Careers form | **`careers@zaftys.com`** | Separate ops inbox |
| Public mailto / schema | **`info@zaftys.com`** | Nav “Get a Quote”, hero emails, footer mailto — not the Contact form |
| Legal inbox | **`legal@zaftys.com`** | Privacy/legal/grievance only |
| Analytics / tracking email | **Do not create** | Tracking is Matomo events, not a mailbox |
| Automated From | **`no-reply@zaftys.com`** if easy; else SMTP as `contact@` | One SMTP login; **To:** splits the inboxes |
| Legacy mixing | **Do not forward newsletter/partner/careers into `contact@`** | Protects the Contact-form inbox |
| Mail transport | **Hostinger authenticated SMTP** | Better reliability than bare PHP `mail()` without adding an ESP |
| Mail server | **No self-hosted MTA** | Mailcow/Postal/Mailu/Stalwart create unnecessary operational and reputation burden |
| Subscriber storage | **MySQL on Hostinger** | Simple, exportable, no SaaS dependency |
| Subscriber consent | **Store consent metadata** | Supports responsible list management and future auditing |
| Newsletter engine | **Listmonk later** | Introduce only when list/campaign requirements justify VPS infrastructure |
| Campaign sending Phase 1 | **Manual small-batch process** | Avoid premature newsletter infrastructure |
| Bulk campaign threshold | **Move to Listmonk when operationally justified** | See Section 4.4 |
| Form protection | **Honeypot + validation + max length + simple file rate limit** | Enough for v1; no extra DB table |
| Attribution | **UTM first-touch in sessionStorage + copy onto newsletter row** | Matomo campaign reports if analytics is live |
| Lead analytics | **Small stable event list** (Section 0.5) | No fake events for forms that do not exist |
| Double opt-in | **Deferred to Listmonk** | Too much PHP/email for solo v1; record consent instead |
| Subscriber admin | **phpMyAdmin only in v1** | No export PHP (public leak risk) |
| SMTP identity | **One SMTP login** (`no-reply@` preferred) | Do not create extra SMTP users per form |
| Delivery mode | **Easy mode (Section 0) is default** | Full checklists below are the ceiling, not the first build |
| Paid ESPs | **Rejected for initial architecture** | Product constraint |
| Report PDF email gate | **Out of scope** | Already deferred in related resources |

---

## 1.2 Canonical addresses

| Address | Role | Who checks it |
|---|---|---|
| `contact@zaftys.com` | **Contact page form only** (`contact.php`) | Sales / ops for “reach us” form leads |
| `subscribers@zaftys.com` | Newsletter signup **alerts** (`newsletter.php` notify). List of record = MySQL | Marketing; later Listmonk From/Reply |
| `partner@zaftys.com` | Partner registration form (`partner.php`) | Fleet / partner ops |
| `careers@zaftys.com` | Careers form (`careers.php`) | Hiring |
| `info@zaftys.com` | Public published email: footer, JSON-LD, nav/hero **mailto** CTAs | Whoever handles click-to-email (not form dumps) |
| `legal@zaftys.com` | Privacy, legal, grievance | Legal |
| `no-reply@zaftys.com` | SMTP **From** for automated site mail (optional mailbox) | Nobody — not an ops inbox |

### Routing rule (PHP)

| Endpoint | To |
|---|---|
| `/api/contact.php` | `contact@zaftys.com` |
| `/api/newsletter.php` (alert) | `subscribers@zaftys.com` |
| `/api/partner.php` | `partner@zaftys.com` |
| `/api/careers.php` | `careers@zaftys.com` |

### Public site rule

- Contact **form** → `contact@` only.
- Click **email us** (mailto) → `info@`.
- Do **not** put `contact@` on mailto buttons if you want that inbox to stay form-only.
- Do **not** create `tracking@`. Matomo is tracking.
- Create further mailboxes only when a **new form or workflow** needs a quiet inbox (not for analytics).

### Unsubscribe

User emails `subscribers@zaftys.com` with subject `Unsubscribe` (or replies to a campaign). Ops sets MySQL `status = unsubscribed`.

---

## 1.3 What “done” means

| Capability | Done when |
|---|---|
| Traffic tracking | Matomo is live and verified, SPA route changes are tracked, core goals/events fire, and dashboards are usable |
| Analytics fallback | If Matomo is unsuitable for the Hostinger environment, Umami is deployed without changing the event taxonomy |
| Email receiving | Contact form → `contact@`; newsletter alert → `subscribers@`; partner → `partner@`; careers → `careers@`; all via authenticated SMTP |
| Subscriber storage | Footer and Blog subscriptions create durable, unique database records |
| Consent | Subscriber records retain the consent metadata required by the chosen signup flow |
| Attribution | UTM source/medium/campaign are captured where present |
| Lead tracking | Important business CTAs and successful forms appear as Matomo events/goals |
| Security | Public PHP endpoints have validation, honeypot, rate limiting, payload limits, and secrets outside the public web root |
| Unsubscribe | Subscribers can request removal and operations can promptly set `status = unsubscribed` |
| Export | Authorized staff can export the active list without exposing it publicly |

---

# 2. Target architecture

```text
                           ┌──────────────────────────────┐
                           │        Browser / User        │
                           │        zaftys.com            │
                           └──────────────┬───────────────┘
                                          │
                  ┌───────────────────────┼────────────────────────┐
                  │                       │                        │
                  ▼                       ▼                        ▼
          React / SPA              Matomo Tracker             WhatsApp / Call /
          Marketing Site           (self-hosted)              Email / CTA links
                  │                       │                        │
                  │                       ▼                        ▼
                  │                Matomo Analytics          Goal / Event
                  │                + campaign data            tracking
                  │
                  ▼
             Public PHP APIs
                  │
       ┌──────────┼───────────┐
       │          │           │
       ▼          ▼           ▼
   Contact      Partner     Careers
    Form         Form        Form
       │          │           │
       ▼          ▼           ▼
   contact@    partner@    careers@
  (form only)


       Newsletter Footer / Blog
                  │
                  ▼
          /api/newsletter.php
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
       MySQL          SMTP notification
   subscriber list    to subscribers@
          │
          ▼
      phpMyAdmin CSV
          │
          ▼
  Manual small campaigns
     while volume is low

Public mailto / schema → info@zaftys.com
(not mixed into contact@)

PHASE 2 / FUTURE

       newsletter.php
             │
             ▼
       Listmonk API
             │
             ▼
       Listmonk/Postgres
             │
             ▼
     Authenticated SMTP
             │
             ▼
       Campaign delivery


ANALYTICS FALLBACK

If Matomo is unsuitable for Hostinger:

Browser → Umami tracker → Small VPS
```

---

## 2.1 Hosting layout

| Component | Location | Notes |
|---|---|---|
| Marketing SPA | Existing Hostinger site root | Existing deploy path remains unchanged |
| PHP APIs | `public/api/` | Hardened server-side endpoints |
| Secrets/config | Outside `public/` | Never publicly reachable |
| Matomo | Prefer `analytics.zaftys.com` or `/matomo/` | Only if Hostinger resources/support are adequate |
| Matomo database | Dedicated MySQL database | Avoid mixing large analytics tables with application tables where practical |
| Subscriber DB | Hostinger MySQL | Dedicated table prefix `zaftys_` |
| Umami fallback | Small VPS/free-tier cloud if required | Only if Matomo is unsuitable |
| Listmonk | Separate VPS/free-tier cloud | Do not run on shared Hostinger PHP hosting |
| Email | Hostinger mail | No self-hosted MTA |

---

## 2.2 Current state

| Item | Status |
|---|---|
| Contact / partner / careers / newsletter PHP | Exist; currently use `mail()` |
| Newsletter UI | Footer + Blog |
| Real subscriber storage | Missing |
| Analytics | Not wired; GTM comment only in `index.html` |
| Email address consistency | UI/schema may use `info@`; PHP uses `contact@` |
| SMTP helper | Missing |
| Central secrets configuration | Needs implementation |
| Basic rate limiting | Needs implementation |
| UTM capture | Needs implementation |
| Lead/conversion event taxonomy | Defined in this document; implementation pending |

---

# 3. Phased delivery plan

## 3.1 Priority legend

| Priority | Meaning |
|---|---|
| **P0** | Ship first; infrastructure, lead capture, or security dependency |
| **P1** | Reliability, attribution, list integrity, and operational controls |
| **P2** | Scale and campaign automation |
| **P3** | Optional optimization |

---

# Phase 0 — Prerequisites

**Target: approximately 1 day**

### Infrastructure

- [ ] Confirm Hostinger plan includes MySQL.
- [ ] Confirm available database slots/resources.
- [ ] Create/confirm mailboxes: `contact@`, `subscribers@`, `partner@`, `careers@`, `info@`. Optional `no-reply@`.
- [ ] Gmail test **into** each ops mailbox (at least `contact@` and `subscribers@`).
- [ ] Confirm Hostinger SMTP host, port, username, and authentication requirements.
- [ ] Confirm SMTP sender (`no-reply@` or `contact@` as login only).
- [ ] Do **not** forward `subscribers@` / `partner@` / `careers@` → `contact@`.
- [ ] Do **not** create `tracking@`.
- [ ] Create/confirm MySQL database and user.
- [ ] Decide Matomo URL: `analytics.zaftys.com` vs `zaftys.com/matomo/` (or skip).
- [ ] If using `analytics.zaftys.com`, configure DNS and SSL.
- [ ] Check Hostinger PHP version (8.1+ preferred).
- [ ] Check available storage/memory before committing to Matomo.

### Security

- [ ] Create a secrets/config location outside `public/`.
- [ ] Confirm configuration files cannot be served directly by the web server.
- [ ] Confirm `.gitignore` excludes local secret files.
- [ ] Establish backup expectations for subscriber data.

### Exit criteria

Infrastructure, email, database, SMTP, and Matomo feasibility are verified.

---

# Phase 1 — Traffic analytics and conversion tracking

**Priority: P0**

**Target: 2–4 days including QA**

## 1A. Matomo installation

- [ ] Install Matomo only after Hostinger resource feasibility is confirmed.
- [ ] Create Matomo site: `ZAFTYS Marketing`.
- [ ] Site URL: `https://zaftys.com`.
- [ ] Enable HTTPS.
- [ ] Protect Matomo admin with strong authentication.
- [ ] Enable 2FA if supported.
- [ ] Configure trusted hosts.
- [ ] Disable unnecessary public exposure.
- [ ] Ensure Matomo configuration/database credentials are protected.
- [ ] Confirm scheduled tasks/cron requirements, if applicable.
- [ ] Verify Matomo performance under normal site traffic.

### Fallback

If Matomo causes material resource problems or cannot be supported reliably on the Hostinger environment:

- [ ] Stop optimization attempts after reasonable troubleshooting.
- [ ] Deploy Umami on a small VPS.
- [ ] Reuse the same event and goal taxonomy.
- [ ] Update this decision log.

---

## 1B. React / SPA tracking

- [ ] Add Matomo URL/site ID through environment/configuration.
- [ ] Do not expose passwords or secrets in frontend environment variables.
- [ ] Load tracker safely.
- [ ] Track client-side route changes.
- [ ] Track first pageview correctly.
- [ ] Avoid duplicate pageviews during React route changes.
- [ ] Verify:
  - `/`
  - `/blog`
  - `/resources/reports`
  - `/contact`
  - other important landing pages.

---

## 1C. Core business conversion events

Minimum event taxonomy:

| Event | Trigger |
|---|---|
| `cta_whatsapp` | WhatsApp button/FAB click |
| `cta_call` | Telephone CTA click |
| `cta_mailto` | Email/mailto CTA click |
| `cta_request_quote` | Request quote CTA |
| `cta_demo` | TMS/demo CTA |
| `cta_partner` | Partner CTA |
| `cta_tranzfort` | Tranzfort CTA |
| `form_contact_success` | Contact form successfully submitted |
| `form_quote_success` | Quote form successfully submitted |
| `form_partner_success` | Partner form successfully submitted |
| `form_careers_success` | Careers form successfully submitted |
| `newsletter_subscribe_success` | Newsletter subscription succeeds |
| `report_view` | Market report detail viewed |
| `report_pdf_open` | Report PDF opened, if trackable |

### Rule

Event names are stable API-like identifiers. Do not rename events casually after dashboards/campaign reporting depend on them.

---

## 1D. UTM attribution

Capture, where present:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

At minimum, preserve attribution during the visitor session so a conversion can be associated with the campaign that brought the user to the site.

Example:

```text
https://zaftys.com/contact
?utm_source=linkedin
&utm_medium=social
&utm_campaign=enterprise-logistics
&utm_content=allcargo-outreach
```

### Requirements

- [ ] Capture UTM parameters on landing.
- [ ] Preserve them through relevant SPA navigation.
- [ ] Avoid storing unnecessary personal information alongside attribution.
- [ ] Verify Matomo campaign reporting.
- [ ] Document campaign naming conventions.

---

## 1E. Privacy

- [ ] Update Privacy Policy before production analytics launch.
- [ ] Update Cookie Policy if cookies/identifiers are used.
- [ ] Prefer privacy-friendly/cookieless Matomo configuration where compatible with requirements.
- [ ] Do not enable session recording by default.
- [ ] Do not enable invasive heatmaps/session replay in v1.
- [ ] Review anonymization settings.
- [ ] Store only analytics data required for business measurement.

### Exit criteria

ZAFTYS can answer:

- Where did visitors come from?
- Which pages do they view?
- Which campaigns generate traffic?
- Which CTAs generate action?
- Which forms generate successful submissions?
- Which content produces demand?

---

# Phase 2 — Reliable website email

**Priority: P0/P1**

**Target: 1–2 days**

## 2A. SMTP implementation

Create a shared mail helper:

```text
public/api/_mail.php
```

or use PHPMailer if supported and appropriate.

### Requirements

- [ ] Use authenticated Hostinger SMTP.
- [ ] Never use bare PHP `mail()` for production form delivery.
- [ ] Keep SMTP credentials outside `public/`.
- [ ] Never commit SMTP credentials to Git.
- [ ] Use a single reusable mail helper.
- [ ] Implement safe timeout/error handling.
- [ ] Log operational failures without logging passwords or unnecessary personal data.

### Endpoints

Update:

```text
contact.php
partner.php
careers.php
newsletter.php
```

---

## 2B. Email headers

Preferred structure:

```text
From: ZAFTYS Website <no-reply@zaftys.com>
To:   (mailbox for that form — see Section 1.2)
Reply-To: submitter email
```

| Form | To |
|---|---|
| Contact | `contact@zaftys.com` |
| Newsletter alert | `subscribers@zaftys.com` |
| Partner | `partner@zaftys.com` |
| Careers | `careers@zaftys.com` |

If Hostinger requires the authenticated account to be the From identity, follow Hostinger's permitted sender policy.

Never allow an arbitrary user-supplied email to become the From address.

---

## 2C. Address consistency

- [ ] Contact form PHP → `contact@` only.
- [ ] Newsletter notify → `subscribers@`.
- [ ] Partner PHP → `partner@`.
- [ ] Careers PHP → `careers@`.
- [ ] Footer / JSON-LD / hero mailto / nav Get a Quote → `info@` (not `contact@`).
- [ ] Legal pages keep `legal@`.
- [ ] Do not forward `subscribers@` / `partner@` / `careers@` into `contact@`.

---

## 2D. Anti-spam controls

All public PHP endpoints should have:

- [ ] Server-side validation.
- [ ] Honeypot field `website`.
- [ ] Simple file-based rate limiting (no extra MySQL table in v1).
- [ ] Maximum request body/payload size.
- [ ] Maximum field length.
- [ ] Safe HTML/text escaping.
- [ ] Content-type validation.
- [ ] Generic user-facing errors.
- [ ] No sensitive server errors returned to browsers.
- [ ] Duplicate/abuse handling where appropriate.

### Honeypot rule

A triggered honeypot should return a harmless success response rather than revealing that the request was rejected.

---

## 2E. Careers uploads

If careers resumes are later handled through PHP:

- [ ] Validate extension.
- [ ] Validate MIME/type.
- [ ] Enforce maximum size.
- [ ] Generate safe server-side filenames.
- [ ] Store outside public web root where possible.
- [ ] Malware scanning where practical.
- [ ] Never execute uploaded files.
- [ ] Attach to email only after validation.

This remains outside the current Phase 1–3 delivery unless already required.

### Exit criteria

All four form types deliver to their **dedicated** mailboxes through authenticated SMTP (`contact@` / `subscribers@` / `partner@` / `careers@`).

---

# Phase 3 — Newsletter subscriber database

**Priority: P1**

**Target: 1–2 days**

## 3A. Subscriber schema

Recommended schema:

```sql
CREATE TABLE zaftys_newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(64) NOT NULL DEFAULT 'footer',
  status ENUM('pending', 'active', 'unsubscribed')
    NOT NULL DEFAULT 'pending',

  subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP NULL DEFAULT NULL,
  unsubscribed_at TIMESTAMP NULL DEFAULT NULL,

  consent_at TIMESTAMP NULL DEFAULT NULL,
  consent_version VARCHAR(32) NULL DEFAULT NULL,

  source_url VARCHAR(512) NULL DEFAULT NULL,

  utm_source VARCHAR(128) NULL DEFAULT NULL,
  utm_medium VARCHAR(128) NULL DEFAULT NULL,
  utm_campaign VARCHAR(255) NULL DEFAULT NULL,
  utm_content VARCHAR(255) NULL DEFAULT NULL,
  utm_term VARCHAR(255) NULL DEFAULT NULL,

  ip_hash CHAR(64) NULL DEFAULT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email),
  KEY idx_status (status),
  KEY idx_source (source),
  KEY idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Data-minimization rule

Do **not** store raw IP addresses unless a documented security requirement exists.

User-Agent should not be stored by default. Add it only if a real operational/security requirement is identified.

---

## 3B. Newsletter API behaviour

`newsletter.php` should:

1. Validate email.
2. Normalize email consistently.
3. Check honeypot.
4. Apply rate limiting.
5. Capture source: `footer`, `blog`, etc.
6. Capture relevant UTM attribution.
7. Capture consent metadata.
8. Insert subscriber.
9. Handle duplicate email safely.
10. v1: do **not** send a confirmation email. Insert `status = active`.
11. Notify `subscribers@` on **new** subscribers only; skip notify on duplicates.
12. Return JSON compatible with the existing React UI.

### Duplicate behaviour

A duplicate subscription should **not create a second row**.

The UI can return either:

```json
{ "success": true }
```

or a friendly:

```text
This email is already subscribed.
```

Do not expose database errors to users.

---

## 3C. Double opt-in / confirmation

**v1 (easy mode): single opt-in + consent metadata.**

```text
User submits email
       ↓
status = active
       ↓
consent_at + consent_version stored
```

Privacy/newsletter copy must say the truth: signup is immediate; unsubscribe by emailing `subscribers@`.

**Later (Listmonk / Phase 4):** double opt-in.

Do not build confirmation tokens, confirm URLs, or confirm emails in v1.

Keep nullable columns `confirmed_at` / `pending` status in the schema so Phase 4 does not require a painful migration. v1 inserts `status = 'active'`.

---

## 3D. Subscriber source

The website should identify where the subscription came from:

```text
footer
blog
landing-page
other
```

This allows future analysis of which parts of the website generate subscribers.

---

## 3E. Export / admin

**v1: Option A only — phpMyAdmin.**

Export: phpMyAdmin → table `zaftys_newsletter_subscribers` → Export CSV. Filter `status = active` before sending any campaign.

**Option B — authenticated export endpoint** is deferred. Do not add `subscribers-export.php` until phpMyAdmin is genuinely too slow. A public or weakly protected export URL is worse than inconvenience.

---

## 3F. Unsubscribe

Minimum Phase 3:

- [ ] User can reply to unsubscribe.
- [ ] User can email `subscribers@zaftys.com` with subject `Unsubscribe`.
- [ ] Operations changes subscriber status to `unsubscribed`.
- [ ] Unsubscribed users are excluded from future campaigns.

Preferred later:

- [ ] Signed one-click unsubscribe URL.
- [ ] Automated status update.

### Exit criteria

Footer and Blog subscriptions create durable records, duplicate subscriptions are handled safely, consent/attribution is recorded, exports are protected, and unsubscribe requests are honored.

---

# Phase 4 — Newsletter campaigns with Listmonk

**Priority: P2**

Listmonk is introduced only when operational demand justifies it.

## 4.1 Trigger conditions

Start Phase 4 when **one or more** are true:

- Regular newsletter campaigns are being sent monthly or more frequently.
- Subscriber list approaches/exceeds approximately **500 active subscribers**.
- Manual sending becomes operationally inconvenient.
- Double opt-in workflow needs automation.
- Unsubscribe management needs automation.
- Bounce handling is required.
- Templates/campaign management are required.
- Campaign analytics become important.
- Manual CSV workflows create unacceptable operational risk.

The 500-subscriber number is a planning threshold, **not a technical limit**.

---

## 4.2 Architecture

```text
ZAFTYS React Newsletter UI
          │
          ▼
     newsletter.php
          │
          ▼
      Listmonk API
          │
          ▼
   Listmonk + Postgres
          │
          ▼
    Authenticated SMTP
          │
          ▼
      Subscribers
```

Matomo remains responsible for **website analytics**.

Listmonk becomes responsible for **newsletter campaign operations**.

---

## 4.3 Migration

- [ ] Export active MySQL subscribers.
- [ ] Exclude unsubscribed records.
- [ ] Validate/deduplicate emails.
- [ ] Preserve source and consent information where Listmonk supports it.
- [ ] Import into Listmonk.
- [ ] Validate subscriber counts.
- [ ] Send a test campaign.
- [ ] Verify unsubscribe behavior.
- [ ] Update `newsletter.php` to use Listmonk API.
- [ ] Keep React UI unchanged where possible.

---

## 4.4 Sending infrastructure

Initially:

```text
Listmonk → Hostinger SMTP
```

If volume increases and Hostinger SMTP becomes unsuitable:

```text
Listmonk → dedicated transactional/bulk SMTP provider
```

Any future external provider requires a new CTO decision because the current architecture explicitly avoids paid ESP dependency.

---

# Phase 5 — Optional polish

**Priority: P3**

- [ ] Matomo custom dimensions.
- [ ] Industry page dimension.
- [ ] Report slug dimension.
- [ ] Advanced UTM conventions.
- [ ] Traffic spike/drop alerts.
- [ ] Advanced campaign attribution.
- [ ] Signed unsubscribe links if not already implemented.
- [ ] Automated subscriber administration UI.
- [ ] Careers upload hardening if required.
- [ ] Advanced API monitoring.
- [ ] Advanced bot detection if abuse increases.
- [ ] Revisit Mautic only if marketing automation, lead scoring, or drip campaigns become real requirements.

---

# 4. Implementation specifications

## 4.1 Matomo

| Item | Specification |
|---|---|
| Product | Matomo |
| Hosting | Hostinger only if resources/support are adequate |
| Fallback | Umami on small VPS |
| Database | Dedicated MySQL database |
| Frontend | Environment/config-driven tracker |
| SPA | Client-side route tracking |
| Primary KPIs | Sessions, top pages, referrers, campaigns, CTA events, form success, report engagement |
| v1 exclusions | Heatmaps, session replay, A/B testing |
| Privacy | Anonymization/cookieless configuration where appropriate |

---

## 4.2 Analytics event taxonomy

```text
cta_whatsapp
cta_call
cta_mailto
cta_request_quote
cta_demo
cta_partner
cta_tranzfort

form_contact_success
form_quote_success
form_partner_success
form_careers_success

newsletter_subscribe_success

report_view
report_pdf_open
```

### Event naming rules

- Lowercase.
- Snake case.
- Stable names.
- No user email or phone number in event names.
- No sensitive personal information in event properties.
- Add properties only where useful for aggregate reporting.

---

## 4.3 Email receive

| Item | Specification |
|---|---|
| Contact form inbox | `contact@zaftys.com` — this form only |
| Newsletter alerts | `subscribers@zaftys.com` |
| Partner form | `partner@zaftys.com` |
| Careers form | `careers@zaftys.com` |
| Public mailto | `info@zaftys.com` |
| Transport | Hostinger authenticated SMTP (one login) |
| Endpoints | `contact.php`, `partner.php`, `careers.php`, `newsletter.php` |
| From | `no-reply@zaftys.com` or authenticated Hostinger identity |
| Reply-To | User email where appropriate |
| Spam | Honeypot + validation + rate limiting |
| Tracking mailbox | None — Matomo |
| Self-hosted MTA | Forbidden for v1/v2 |

---

## 4.4 Subscriber database

| Phase | System | Source of truth |
|---|---|---|
| Phase 3 | MySQL | MySQL |
| Phase 4 | Listmonk | Listmonk |
| Always | Matomo | Website analytics only |

Do not confuse:

**analytics database**

with:

**subscriber database**

or:

**campaign database**.

They serve different purposes.

---

## 4.5 Security configuration

Recommended structure:

```text
/                    ← website
/public/
  api/
    contact.php
    partner.php
    careers.php
    newsletter.php
    _mail.php

/config/
  zaftys-secrets.php
```

The exact filesystem layout may differ depending on Hostinger deployment, but the security requirement is fixed:

> **Credentials and secrets must not be directly accessible from the public web root.**

---

## 4.6 Expected repository touchpoints

| Area | Likely files |
|---|---|
| Tracker | `index.html`, `src/lib/matomo.ts`, `src/App.tsx` |
| Environment example | `.env.example` |
| Newsletter UI | `src/components/Footer.tsx`, `src/pages/Blog.tsx` |
| PHP | `public/api/newsletter.php`, `contact.php`, `partner.php`, `careers.php` |
| SMTP helper | `public/api/_mail.php` or equivalent |
| Secrets | `config/zaftys-secrets.php` outside public root |
| Constants | `src/lib/constants.ts`, `src/lib/schema.ts` |
| Legal | Privacy/Cookie pages |
| Attribution | Shared UTM capture utility |

---

# 5. Measurement, attribution, privacy & security

## 5.1 North-star marketing metrics

The site should ultimately answer:

### Acquisition

- Sessions
- Users
- Top referrers
- UTM source
- UTM medium
- UTM campaign
- Landing pages

### Engagement

- Blog views
- Report views
- Report PDF opens
- Key service/industry page engagement

### Conversion

- WhatsApp clicks
- Calls
- Emails
- Quote requests
- Demo requests
- Partner enquiries
- Contact form submissions
- Careers submissions
- Newsletter subscriptions

### Business principle

Traffic is useful only insofar as it contributes to:

```text
Visitor
   ↓
Engagement
   ↓
Business CTA
   ↓
Lead
   ↓
Sales conversation
   ↓
Customer
```

Matomo measures the website portion of this funnel.

CRM/sales systems, when introduced later, should become the source of truth for actual opportunity/customer status.

---

## 5.2 UTM discipline

Recommended convention:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Example:

```text
utm_source=linkedin
utm_medium=social
utm_campaign=enterprise-logistics
utm_content=allcargo-outreach
```

Campaign naming should be:

- consistent
- lowercase
- readable
- stable
- documented

Avoid random campaign names such as:

```text
campaign1
test123
newcampaign
```

---

## 5.3 Privacy rules

- Store only data required for the stated purpose.
- Do not store raw IP addresses unless required.
- Prefer IP hashing/anonymization.
- Do not store User-Agent by default.
- Do not put personal data into Matomo event names.
- Do not sell subscriber data.
- Use subscriber data only for ZAFTYS insights/product updates or other clearly disclosed purposes.
- Honor unsubscribe requests promptly.
- Keep Privacy/Cookie policy synchronized with actual implementation.
- Do not claim anonymous/cookieless analytics if the deployed configuration uses identifying cookies.
- Do not enable session replay without a separate privacy/security review.

---

## 5.4 Consent metadata

For newsletter subscriptions, record where practical:

```text
consent_at
consent_version
confirmed_at
source
source_url
```

The `consent_version` identifies the wording/version of the consent or privacy language shown at signup.

Example:

```text
consent_version = newsletter-v1
```

If the consent language materially changes, increment the version.

---

## 5.5 Security rules

### Secrets

- No secrets in Git.
- No SMTP passwords in frontend code.
- No database passwords in public PHP files.
- No credentials in `.env` files committed to the repository.
- Use environment variables or protected server-side configuration.

### Public APIs

All public endpoints should have:

- input validation
- length limits
- content-type checks
- honeypot
- rate limiting
- safe errors
- prepared SQL statements
- output encoding
- controlled email headers

### Database

- Use prepared statements.
- Use least-privilege DB credentials.
- Separate analytics DB where practical.
- Never expose database credentials to frontend JavaScript.
- Back up subscriber data.

### Export

- Require authentication.
- Do not expose CSV files publicly.
- Exclude unsubscribed users from active campaign exports.
- Remove temporary export files after use.

---

# 6. Operational procedures

## 6.1 Weekly

- [ ] Review new newsletter subscribers.
- [ ] Check Matomo conversion events.
- [ ] Review website form delivery.
- [ ] Confirm messages are not unexpectedly going to Spam.
- [ ] Review unusual traffic spikes.
- [ ] Process unsubscribe requests.

---

## 6.2 Monthly

- [ ] Review top acquisition channels.
- [ ] Review UTM campaign performance.
- [ ] Review top blog/report content.
- [ ] Review WhatsApp/call/email CTA activity.
- [ ] Review qualified lead generation.
- [ ] Decide whether a newsletter campaign is justified.
- [ ] Review subscriber growth.

---

## 6.3 Quarterly

- [ ] Review Matomo resource usage.
- [ ] Review Hostinger resource limits.
- [ ] Review subscriber count.
- [ ] Review campaign frequency.
- [ ] Determine whether Listmonk trigger conditions have been reached.
- [ ] Review privacy/security implementation.
- [ ] Review whether analytics still meets business requirements.

---

# 7. Decision log

| Date | Decision | Notes |
|---|---|---|
| 2026-08-13 | Adopt Matomo as preferred analytics | Open-source, self-owned, suitable if Hostinger resources are adequate |
| 2026-08-13 | Umami as analytics fallback | Use if Matomo materially strains Hostinger |
| 2026-08-13 | Split mailboxes by form | `contact@` = Contact form only; `subscribers@` = list alerts; `partner@` / `careers@` = those forms; `info@` = public mailto |
| 2026-08-13 | No tracking@ mailbox | Analytics is Matomo, not email |
| 2026-08-13 | No paid ESP initially | Avoid third-party dependency |
| 2026-08-13 | No self-hosted mail server | Hostinger email is sufficient |
| 2026-08-13 | SMTP over `mail()` | Reliability and authentication |
| 2026-08-13 | MySQL subscriber list in Phase 3 | Simple source of truth before campaign platform |
| 2026-08-13 | Listmonk in Phase 4 | Introduce only when operationally justified |
| 2026-08-13 | Basic rate limiting promoted to P1 | Public PHP endpoints require stronger abuse controls |
| 2026-08-13 | UTM capture promoted to P1 | Required for marketing attribution |
| 2026-08-13 | Consent metadata added | Improves list governance and future migration |
| 2026-08-13 | Lead conversion taxonomy expanded | Website success is measured by business actions, not traffic alone |
| 2026-08-13 | Solo-dev easy mode is the default | Limited Hostinger experience; v1 is thin; full v2 architecture is kept as the ceiling |
| 2026-08-13 | Double opt-in deferred to Listmonk | Record consent in v1; avoid confirm-email PHP |
| 2026-08-13 | phpMyAdmin-only list admin in v1 | No export endpoint |
| 2026-08-13 | `form_quote_success` not in v1 | No separate quote form; use WhatsApp/mailto + contact `interest` |
| 2026-08-13 | SMTP as `contact@` if `no-reply@` is extra | One mailbox is enough to start |
| 2026-08-13 | Clarity + GA4 instead of Matomo | Matomo not in Hostinger Auto Installer; live tracking uses GitHub Secrets `VITE_CLARITY_ID` and `VITE_GA_MEASUREMENT_ID` |
| 2026-08-13 | Exact visitor IP logging approved | Server `REMOTE_ADDR` stored in MySQL; IP on form emails; morning CSV to `info@`; auto-delete after 90 days |
| 2026-08-13 | Do not send exact IP into GA4/Clarity events | Google/Microsoft products stay anonymized; ZAFTYS owns the raw IP log |

---

# 7.1 Explicitly rejected / deferred

| Option | Status | Reason |
|---|---|---|
| GA4 + GTM as primary analytics | Rejected | Not aligned with current OSS/data-ownership architecture |
| Brevo / Mailchimp / ConvertKit | Rejected for initial architecture | Third-party/paid dependency |
| Mailcow / Postal / Mailu / Stalwart | Rejected | Operational complexity and mail reputation burden |
| PostHog | Rejected for marketing site | Overkill for current problem |
| Plausible Cloud | Rejected | Paid cloud dependency |
| Listmonk in Phase 1 | Deferred | VPS and campaign infrastructure not yet justified |
| Mautic | Deferred | Automation suite is unnecessary until marketing automation becomes a real requirement |
| phpList | Deferred alternative | Possible future packaged newsletter UI |
| Matomo regardless of hosting limits | Rejected | Hosting reliability takes priority; use Umami fallback |
| Session replay in v1 | Rejected/deferred as a self-built feature | Microsoft Clarity already provides session insights |
| Raw IP storage | **Reversed 13 Aug 2026** | Exact IP now stored for 90 days (Section 10). Still do not send IP into GA4/Clarity |
| User-Agent storage | **Reversed 13 Aug 2026 for visit log** | Stored truncated on `zaftys_page_visits` for the morning CSV |
| Email every pageview | Rejected | Inbox flood / SMTP limits. Daily CSV digest instead |
| phpMyAdmin as the only way to see visitor IPs | Rejected for operations | Form emails + morning CSV. phpMyAdmin remains a backup |
| Double opt-in in v1 | Deferred | Solo-dev complexity; Listmonk later |
| Umami VPS in v1 | Deferred | Only if Matomo one-click fails **and** dashboards are urgently needed |
| Mixing all forms into `contact@` | Rejected | Contact inbox stays form-only |
| `tracking@` / analytics mailbox | Rejected | Tracking is Matomo events |

---

# 8. Immediate engineering actions

**Status (13 Aug 2026):** P0 + P1 shipped on `main` and verified live. Matomo skipped → Clarity + GA4. Do not start P2 until Section 4.1 triggers hit.

## You in hPanel (before code)

1. [x] Create/confirm: `contact@`, `subscribers@`, `partner@`, `careers@`, `info@` (optional `no-reply@`). Gmail-test each ops inbox.
2. [x] Do **not** forward other mailboxes into `contact@`. Do **not** create `tracking@`.
3. [x] Copy SMTP host, port, username, password into a private note (prefer `no-reply@` login).
4. [x] Create one MySQL database + user; open phpMyAdmin.
5. [x] Create `config` folder (above `public_html` or inside + `.htaccess` deny).
6. [x] Try Hostinger Auto Installer for Matomo. **Skipped** — not available / not used. Live analytics = Clarity + GA4.

## Code (P0 — inbox first)

7. [x] Add `config/zaftys-secrets.php` template (real passwords never committed) + gitignore.
8. [x] Add one SMTP helper file; stop using PHP `mail()`.
9. [x] Point each form at the helper with the correct **To:** (`contact@` / `subscribers@` / `partner@` / `careers@`).
10. [x] Honeypot + validation + max field length on all four APIs.
11. [x] Simple file-based rate limit.
12. [x] Production test: Contact form → `contact@` only. Newsletter → MySQL + `subscribers@`. Partner → `partner@`. Careers → `careers@`.

## Code (P1 — list)

13. [x] Paste `CREATE TABLE` in phpMyAdmin (also applied by CI `migrate.php`).
14. [x] `newsletter.php`: insert, unique email, consent, source, UTM if present.
15. [x] Footer + Blog pass `source`; add newsletter consent line if missing.
16. [x] Duplicate subscribe returns success; still one row.
17. [x] Unsubscribe = email `subscribers@` + phpMyAdmin `status = unsubscribed`.
18. [x] Public mailto / schema / footer → `info@` (not `contact@`).

## Code (P1 — analytics)

19. [x] SPA pageviews + CTA/form events (Clarity + GA4; Matomo not used).
20. [x] UTM first-touch helper.
21. [x] Privacy/Cookie sentence matching the real tracker (+ exact IP / geo).

## P2 — do not start

22. [ ] Listmonk / Umami VPS / export PHP / double opt-in / careers uploads — only when Section 4.1 triggers hit.

---

# 10. Exact visitor IP (locked 13 August 2026)

## 10.1 Why this exists

GA4 and Clarity do **not** give ZAFTYS the exact visitor IP (GA4 uses `anonymize_ip: true`). The Hostinger server already sees `REMOTE_ADDR` on every request. This section stores that address so operations can see it without logging into phpMyAdmin every day.

This does **not** change Google indexing. Do **not** send the IP to `gtag` or Clarity as a custom event property.

IP is personal data under Indian DPDP. Privacy Policy + Cookie Policy must describe exact IP, purpose, and 90-day hosting retention. Cookie Policy notes that server IP logging is **not** a cookie and can continue if analytics cookies are blocked.

GDPR is **not** assumed to be “off” just because ZAFTYS is an Indian company. If EU visitors or EU customers appear, review again. This v1 log is for security, abuse, and traffic measurement — not for selling data.

## 10.2 What we collect

| Channel | Exact IP | Where you see it |
|---|---|---|
| Contact form | Yes | `contact@` — IP, optional City/PIN you typed, plus approximate IP city/ISP |
| Partner form | Yes | `partner@` email body |
| Careers form | Yes | `careers@` email body |
| New newsletter signup | Yes, on the **alert email** | `subscribers@`. MySQL row still stores `ip_hash` only |
| Every SPA page view | Yes | MySQL `zaftys_page_visits` + morning CSV to `info@` (includes approx country/region/city/ISP) |

IP is taken **only** from `zaftys_client_ip()` (`REMOTE_ADDR`). Ignore any IP the browser sends.

Page-view row also stores: time (UTC), path, referrer, user agent (truncated), UTM tags, and **approximate** country/region/city/ISP from ipwho.is (cached per IP). This is city-level, not GPS — mobile ISPs often show the carrier hub city.

Contact form optional **City** and **PIN** are what the visitor types. That is more accurate for a logistics lead than IP geo.

## 10.3 How it works

```text
Browser pageview  →  POST /api/visit.php  →  INSERT zaftys_page_visits (exact IP)
Form submit       →  existing PHP APIs    →  email inbox includes "IP: …"

Every morning     →  GitHub Action 07:00 IST
                  →  POST /api/visit-digest.php (MIGRATE_TOKEN)
                  →  CSV of last 24 hours attached to info@
                  →  DELETE rows older than 90 days
```

Frontend: `src/lib/visit-log.ts` runs next to `trackPageview` in `App.tsx`.

Files:

- `public/api/_geo.php` — ipwho.is lookup + cache on previous visit rows
- `public/api/visit.php` — public beacon (rate limited; always returns success to the page)
- `public/api/visit-digest.php` — token-protected daily job
- `.github/workflows/visit-digest.yml` — cron `30 1 * * *` (07:00 IST) + manual **Run workflow**

CSV columns: `visited_at,ip,country,region,city,isp,path,referrer,user_agent,utm_source,utm_medium,utm_campaign,utm_content,utm_term`

One row **per page view**, not unique IPs only. Capped at 15,000 rows per email so SMTP cannot choke. Times in the CSV are UTC. Geo columns are approximate.

## 10.4 90-day delete

The digest job runs:

```sql
DELETE FROM zaftys_page_visits
WHERE visited_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 90 DAY)
```

This removes IPs from **Hostinger MySQL**. It does **not** delete:

- emails already in `contact@` / `partner@` / `careers@` / `subscribers@` / `info@`
- CSV attachments already received

That is expected.

## 10.5 What you do (solo-dev)

After this is merged to `main` and deployed:

1. No new Hostinger mailbox is required. Digest goes to existing `info@zaftys.com`. Optional GitHub Secret `MAIL_VISITS` if you want a different inbox.
2. Submit a test Contact form (optional City + PIN) → confirm the mail has `IP: …`, `City:`, `PIN:`, and `IP location (approx):`.
3. Click two pages on zaftys.com.
4. GitHub → **Actions → Daily visitor IP digest → Run workflow**.
5. Check `info@` for the CSV.
6. After that, the morning mail is automatic. phpMyAdmin is backup only.

Do **not** put the visit table on a public webpage.

## 10.6 SEO / analytics / policy (short)

| Concern | Result |
|---|---|
| Google indexing | No change. Beacon is a background POST |
| GA4 / Clarity | Unchanged. Do not pass IP into those tags |
| DPDP | Disclose exact IP + 90-day hosting retention (Privacy v1.3) |
| Cookie Policy | Server IP is not a cookie; one sentence points at Privacy |

## 10.7 Checklist

1. [x] `002_page_visits.sql` applied via migrate on deploy
2. [x] Contact / partner / careers / subscriber alert emails include IP
3. [x] SPA pageviews POST `/api/visit.php`
4. [x] Manual digest workflow sends CSV to `info@`
5. [x] Scheduled digest runs on `main` at 07:00 IST
6. [x] Rows older than 90 days are deleted by the same job
7. [x] Privacy + Cookie copy published
8. [x] Approximate country/region/city/ISP on visit rows + morning CSV
9. [x] Optional City + PIN on contact form and `contact@` email

---

# 9. Final architecture decision

The approved ZAFTYS marketing-site architecture is:

```text
                 ZAFTYS MARKETING WEBSITE
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        Matomo / Umami          PHP APIs
        Website Analytics            │
              │             ┌────────┼────────┐
              │             │        │        │
              │             ▼        ▼        ▼
              │          Contact  Partner  Careers
              │             │        │        │
              │             ▼        ▼        ▼
              │         contact@  partner@  careers@
              │
              │
              ▼
       Conversion + UTM
          attribution


          NEWSLETTER
              │
              ▼
        newsletter.php
              │
              ├── MySQL subscriber DB
              └── alert → subscribers@
              │
              ├── Consent
              ├── Source
              ├── UTM
              ├── Status
              └── Unsubscribe
              │
              ▼
       Manual small campaigns
              │
              │  when scale requires
              ▼
          Listmonk
              │
              ▼
       Authenticated SMTP
```

## Final principle

ZAFTYS should **not build a large marketing stack before the website generates enough demand to justify it**.

The architecture therefore starts with:

**Hostinger SMTP + MySQL list + thin PHP + Matomo only if one-click works**

and evolves into:

**Matomo/Umami + Listmonk + dedicated campaign infrastructure**

only when traffic, subscribers, and marketing activity justify the additional operational complexity.

Solo-dev rule: **Section 0 easy mode is how we build; Sections 1–7 are what we are building toward.**

---

**Implementation status:** Complete for v1 (13 Aug 2026). Merged via PRs #1 (email/Clarity/GA4), #2 (exact IP + morning CSV), #3 (geo columns + contact City/PIN). Live on Hostinger.

**Next action:** Operate — check `contact@` / `info@` digests, GA4 Realtime, Clarity. Do not start P2 (Listmonk / VPS) until traffic and list size justify it. Unrelated local WIP (sitemap/SEO/report covers) stays out of this track until a separate PR.
