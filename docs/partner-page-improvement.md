# ZAFTYS Partner page improvement

| Field | Value |
|-------|-------|
| **Status** | Tighten pass. Public copy no longer leads with Proposed labels, 70/30, or “no guaranteed loads or earnings.” |
| **URL** | Stay on `https://zaftys.com/partner`. No new route, no redirect, no replacement path. |
| **Product** | One ZAFTYS Partner desk with two labeled partnerships: TranZfort fleet capacity, and a truck-ownership operating partnership with ZAFTYS. |
| **Code today** | `src/pages/Partner.tsx`, `src/components/partner/PartnerEnquiryForm.tsx`, `src/lib/partner-page-copy.ts`, `public/api/partner.php` |
| **Problem this pass solves** | The page is too long. The same two paths are explained four times. CTAs compete with each other and sit below walls of copy, so they are easy to ignore. |

This document is the brief. Implement in the existing Vite + React app. Do not add a second site, a demo app, or a new framework.

---

## 1. Decision lock

Unchanged from the first brief.

1. `/partner` remains the only partner URL. Header, footer, Contact, Network hub, and network leaves already link here. Those links must keep resolving to this page.
2. The page serves both audiences. It does not collapse them into one contract.
3. A visitor who already owns trucks and arrived from “Become a Partner” or “Register as a partner” still sees fleet registration in the first screen and can submit a fleet lead.
4. A first-time buyer, or an owner who wants ZAFTYS to help operate a truck they own, gets a separate path, separate copy, and a separate email subject. That path is an enquiry, not a published loan or earnings product.
5. Existing website pages other than `/partner` stay as they are. Do not rewrite Network, About, Fleet, or logistics leaves as part of this work.

The two partnerships:

| | TranZfort fleet partner | Ownership partner |
|---|---|---|
| Who | Already runs one or more trucks | Buying a first truck, or placing a truck into a ZAFTYS operating partnership |
| Offer | Loads on corridors they already run, verification, TMS and GST billing when ZAFTYS contracts the trip | Agreed logistics support around a truck the partner owns |
| How ZAFTYS is paid today | Broker fee on booked TranZfort loads. Search and listing are free. | Only as the written operating agreement states. No public split until the business approves one. |
| Truck | Partner already owns and operates it | Partner buys and owns it. Financing, if any, is with a lender and subject to that lender's approval. |
| Label | Labeled network capacity. Never described as a ZAFTYS-owned truck. | Partner-owned asset. ZAFTYS does not become the borrower and does not take the loan off the partner. |

---

## 2. Why the current page is too big

v1 did the right product work and the wrong page density.

**What a visitor sees, in order**

1. Hero: H1, lead, extra “two agreements” line, two buttons, plus “Register your fleet”.
2. Path chooser: two cards, four bullets each, two more buttons.
3. Fleet essay: four benefit cards, four step cards, another button.
4. Ownership essay: capital paragraph, five Proposed feature cards, five steps, money waterfall, three legal notes, growth visual, another button.
5. Trust grid (facts already in the footer and the cards).
6. Form (the actual conversion).
7. Sixteen FAQ items that restates the essays.
8. Close band: the same two path buttons again, then WhatsApp, TranZfort, four internal links, and a mailto.

**CTA count on one URL**

Hero (3) + chooser (2) + fleet (1) + ownership (1) + form submit (1) + close path buttons (2) + WhatsApp + TranZfort + mailto. Path choice is asked about seven times. The form is the sixth major block.

**What that does**

- The two contracts are clear, but they are repeated until neither feels like a decision.
- Buttons look like navigation through more copy, not a next step.
- Legal care (no split, no guarantees, Proposed services) is correct, but it is spread across cards, notes, steps, and FAQ. One collapsed FAQ can hold it.
- A Network visitor who only wanted to register a fleet has to scroll past an ownership prospectus to reach the form.

The form, PHP mailer, hashes, SEO, and inbound links are not the problem. The layout around them is.

---

## 3. Tighten rules

1. **One conversion.** The form is the job of the page. Everything above it should make a person choose a path and submit. Everything below it is optional reading.
2. **Say each fact once.** Broker fee, labeled network, Proposed operating support, indicative capital, no guarantee, lender decides the loan. If it is already in a card or the form, it does not need its own section.
3. **Two path buttons in the viewport. One submit in the form. Talk options only at the bottom.** No third “Register your fleet” link next to the fleet button. No repeat of Join / Explore in the close band.
4. **Hero and chooser send people to `#partner-form`**, with the path already set. They do not send people into a long essay first.
5. **Keep the hashes.** `#partner-form` stays the form. `#fleet-partner` and `#ownership-partner` stay as ids on the two chooser cards so old in-page links still land. Do not keep empty essay sections just to host those ids.
6. **FAQ is the legal drawer.** Proposed services, profit, EMI, idle time, exit, and the long capital caveat live there, collapsed. They do not need five cards and a waterfall on the way to the form.
7. **Do not unwind the form or the API.** Paths `fleet` | `first-truck` | `expand`, Indian mobile, honeypot, subjects, leftover-field filtering, and success copy stay.

---

## 4. Keep, shorten, merge, drop

### Keep as-is (behavior, not layout)

- URL, canonical, sitemap loc, breadcrumb Home → Become a Partner.
- Header, footer, Company “Become a Partner”, Network inbound links.
- Two labeled contracts. Fleet remains the default form path.
- `POST /api/partner.php` to `partner@zaftys.com`. Legacy payload without `path` still works.
- TranZfort terms: search free, broker fee on booked loads, labeled network, verification.
- Ownership is an enquiry. No Aadhaar / PAN / bank collection. Do not put 70/30, Proposed badges, or “no guaranteed loads or earnings” in the hero, meta description, or path cards.
- Hero image `hero-partner.webp`. Existing `PageHero`, buttons, cards, toast, `trackEvent`.
- Form fields and validation already built.

### Keep, but shorten

| Block | Now | After |
|-------|-----|--------|
| Hero | Badge, H1, lead, extra paragraph, two buttons, extra text link | Badge, H1, one-sentence lead, two buttons only. Buttons go to `#partner-form`. |
| Path cards | Title, paragraph, four bullets, CTA | Title, one sentence, three short bullets, CTA. Put `#fleet-partner` / `#ownership-partner` on these cards. |
| Capital line | Long paragraph in the ownership essay | One short line on the ownership card. Full caveat stays in FAQ. |
| Fleet how-it-works | Four benefit cards + four step cards | Four step labels in the fleet card, or one compact row under both cards. No icon benefit grid. |
| Ownership how-it-works | Five Proposed cards + five steps + money + growth | One “proposed until the agreement names it” line, four step labels, one four-item money line. |
| Form intro | Two sentences | One sentence: pick a path, we reply. Consent line stays. |
| FAQ | 4 fleet + 12 ownership | 3 fleet + 5 ownership. See section 6. |
| Close | Path buttons + WhatsApp + TranZfort + four links + mailto | “Prefer to talk first?” WhatsApp, mailto, TranZfort. Text links to Network / TMS / Contact. No Join / Explore repeat. |

### Merge

- Chooser **is** the fleet and ownership sections. Do not keep a second fleet block and a second ownership block below the cards.
- Trust grid into one line under the form or into FAQ. Desk address already lives in the footer.
- Growth (“start with one truck”) into the ownership card’s last bullet or the “later truck” FAQ. Drop the 1-2-3 visual.
- Money waterfall + three notes into one FAQ answer (“How is profit calculated?”) plus one four-word sequence on the ownership card: freight, expenses, EMI / reserves, then share as agreed.
- Five Proposed feature cards into one sentence on the ownership card: freight, driver, dispatch, and reporting are proposed until the signed agreement names them.
- Hero “two agreements” line into the H1 / lead. Do not say it again under the buttons.
- Close path CTAs into the hero / cards / form. Close is for people who will not fill a form.

### Drop from the page (facts can survive in FAQ)

- Extra hero link “Register your fleet”.
- Four fleet benefit cards (Loads, empty returns, Payments, TMS). Those points already sit in the fleet card bullets and TranZfort terms.
- Ownership feature card grid.
- Standalone money section with a numbered waterfall.
- Standalone growth section.
- Standalone trust section.
- Duplicate Join / Explore buttons in the close band.
- FAQ items that only restate a card bullet (used-truck, fuel/tolls, idle/repairs, more-than-one-truck, “what is checked” as its own question).
- Any new sticky bar, calculator, testimonial, logo strip, or third product card.

---

## 5. Target page map

Four bands plus FAQ. Form sits second, not sixth.

```
[ Hero ]
  H1 + one lead sentence
  [ I already own trucks ]  [ Explore truck ownership ]
  both → #partner-form with path set

[ Two cards ]   ids: #fleet-partner  #ownership-partner
  Fleet card          Ownership card
  1 sentence          1 sentence
  3 bullets           3 bullets (incl. Proposed + capital)
  4 step labels       4 step labels + money in one line
  [ Join as a fleet partner ]   [ Start my trucking enquiry ]
  both → #partner-form

[ Form ]   id: #partner-form
  Same conditional fields as v1
  Submit is the primary button on the page after the hero

[ Questions ]
  8 collapsed items, two small headings

[ Prefer to talk first? ]
  WhatsApp · Partner email · Open TranZfort
  Text: Network, TMS, Contact
```

Optional: if the two cards feel thin without “what happens next”, add **one** compact step row under the cards (fleet 01-04 on the left, ownership 01-04 on the right). Not a second pair of card grids.

### 5.1 Hero

Keep badge `ZAFTYS Partner`.

Keep H1 close to today: `Partner with ZAFTYS. Run loads, or own the truck we help operate.`

Lead, one sentence: `Put trucks you already run on TranZfort, or enquire about an operating partnership around a truck you own.`

Buttons:

| Button | Action |
|--------|--------|
| I already own trucks | `#partner-form`, path `fleet` |
| Explore truck ownership | `#partner-form`, path `first-truck` |

Do not add a third in-hero control. Do not put the ₹10-15 lakh sentence in the hero.

### 5.2 Fleet card (`#fleet-partner`)

Who: already operates trucks.

Three bullets, no more:

- Freight on lanes you run. Search is free. Broker fee on booked loads.
- Verification before a ZAFTYS-contracted trip. Network trucks stay labeled as partner capacity.
- GST billing and TMS on trips ZAFTYS contracts.

Steps as a single line or four short labels: Register → Verify → Onboard → Take loads.

CTA: `Join as a fleet partner` → `#partner-form`, path `fleet`.

### 5.3 Ownership card (`#ownership-partner`)

Who: buying a first truck, or placing a truck into an operating partnership.

Three bullets, no more:

- You own the truck. ZAFTYS helps with freight, driver, dispatch, and reporting.
- Any vehicle loan is with a lender. We help you explore financing.
- First trucks are often explored around ₹10-15 lakh in starting capital.

Steps as labels: Apply → Assess → Select / finance → Sign, then operate.

Money as one line, not a section: freight in, approved expenses and EMI out, remainder shared as the agreement says. No ratio.

CTA: `Start my trucking enquiry` → `#partner-form`, path `first-truck`.

### 5.4 Form (`#partner-form`)

Already built. Do not redesign the field set in this pass.

Keep:

- Radios: fleet / first-truck / expand, then TranZfort vs ownership on expand.
- Fleet default so Network “Become a Partner” still matches the first screen.
- Company required on fleet (and TranZfort expand). Optional on first-truck.
- Indian mobile. Honeypot `website`. Inline errors. Processing state. Path-specific success copy.
- No identity documents.

Move the form up so it follows the two cards. That is the layout change. The component stays.

### 5.5 Close

H2: `Prefer to talk first?`

One line: WhatsApp or email the desk. TranZfort stays as the live marketplace for people who already have a truck.

Controls: WhatsApp (partner prefill), Partner Inquiry mailto, Open TranZfort. Then text links to Network, TMS, Contact.

Do not repeat Join / Explore here. The form is already above.

---

## 6. FAQ cut

One accordion. Two small headings. Eight items. Answers stay as short as they are today.

**TranZfort and network loads (3)**

| Keep | Why |
|------|-----|
| Can I join TranZfort without a truck? | Routes the no-truck visitor to the ownership enquiry. |
| What does it cost to find loads? | Live commercial term: free search, broker fee, TMS/billing on ZAFTYS trips. Fold “what is checked” into this or the third answer. |
| How do I get loads on TranZfort? | Matching after verification. Broker fee. Labeled network. Do not lead with “not guaranteed.” |

Drop as its own question: “What is checked before I take a ZAFTYS trip?” Put one clause in the cost or guarantee answer.

**Truck ownership partnership (5)**

| Keep | Why |
|------|-----|
| Can I enquire before I own a truck? | Sets enquiry vs operations. |
| Is ₹10-15 lakh enough to start? | Holds the full indicative caveat so the card can stay short. Fold used-truck into this answer. |
| Who owns the truck, and who takes the loan? | Merge the two current questions. Partner owns. Partner is the borrower. ZAFTYS does not take the loan by managing the truck. |
| How is profit calculated, and how does ZAFTYS earn? | Merge. Freight minus approved expenses, EMI, reserves; share as agreed; no published ratio. TranZfort = broker fee. Ownership = only what the agreement says. Fold fuel / tolls / driver / repairs / idle into this answer: operating costs follow the agreement; ZAFTYS does not pay them by default. |
| Can I add another truck later? | Growth and exit without an earnings-guarantee FAQ. |

Drop as standalone items: used vehicle, ZAFTYS earn (alone), fuel/tolls, idle/repairs, more than one truck, exit/sell.

---

## 7. CTA rule

| Place | What appears | Goes to |
|-------|----------------|---------|
| Hero | Two buttons, equal weight, fleet first | Form, path set |
| Each card | One button | Form, same path as the card |
| Form | One submit | `POST /api/partner.php` |
| Close | WhatsApp, mailto, TranZfort | External / mail, not another in-page path choice |

Visual: the accent (orange) button is only the fleet hero CTA, the fleet card CTA, and Submit. Ownership uses outline. Close uses WhatsApp green plus outline. Do not put four accent buttons in a row.

Do not add a sticky CTA bar. It would fight the existing WhatsApp FAB and hide submit on mobile.

---

## 8. How to build this pass

Layout and copy only. No new endpoint. No new URL.

1. Collapse `Partner.tsx` to hero, two cards, form, FAQ, close.
2. Cut `partner-page-copy.ts` to match the short cards and the eight FAQs. Leave form option lists and success strings.
3. Point hero buttons at `#partner-form`. Keep `#fleet-partner` and `#ownership-partner` on the cards. Hash `useEffect` can still set the form path.
4. Close band: talk-first only.
5. Do not change `partner.php` unless a copy-only subject tweak is needed (it is not).
6. Do not change canonical, sitemap loc, nav, or other pages.
7. Lint the touched files. Check `/partner` at desktop and ~390px. Confirm the form is reachable without scrolling through an essay. Confirm Network “Become a Partner” still opens fleet-default.

`trackEvent` stays `cta_partner` with `placement` `partner-hero` | `partner-card` and `intent` `fleet` | `ownership`. Drop `partner-fleet-section`, `partner-ownership-section`, and `partner-close` path clicks when those buttons go away. Keep `form_partner_start` / `success` / `error`. Never send name, phone, or capital band.

---

## 9. What must not break

**URL and discovery**

- `https://zaftys.com/partner` returns the partner page.
- Canonical is still `/partner`.
- Sitemap loc stays.
- No new indexable URL.
- Breadcrumb still ends at Become a Partner → `/partner`.

**Inbound journeys**

- Company nav and footer “Become a Partner”.
- Contact “Become a partner”.
- Network hub and network leaf CTAs that use `paths.partner`.
- Hero mailto still opens a partner email that mentions both paths.
- WhatsApp still uses the existing helper and partner prefill.
- TranZfort still uses `externalLinks.tranzfort`.

**Form and mail**

- A payload shaped like today’s form (`company`, `contact`, `phone`, `fleet`) still sends mail.
- Path-aware payloads still send path-specific subjects and only path-relevant fields.
- Honeypot and rate limit behavior stay.
- SMTP failure is visible to the user.
- Secrets stay in the PHP secret helper.

**Claims**

- Broker fee and free search remain visible on the fleet path (hero/card, not only FAQ).
- Network capacity stays labeled as partner capacity.
- Do not publish a profit split. Do not put “no guaranteed loads or earnings” in the title, description, or hero.
- Ownership operating support can be named on the card (freight, driver, dispatch, reporting) without a Proposed badge until the desk asks otherwise.

**Accessibility and layout**

- Every input has a label. Errors are text, not color alone.
- Keyboard users can reach both hero CTAs, FAQ, and submit.
- No horizontal scroll at mobile width.
- Form is not buried under collapsed-only content. Cards are short enough that the form is in reach after one decision.

---

## 10. Copy rules

- Short sentences. Name the commercial term once (broker fee, verification, labeled network, subject to lender approval).
- ₹10-15 lakh appears as a short card line, with the full indicative wording in FAQ. Not in the H1. Not in the meta description as a promise.
- Do not use an ownership-only H1. Fleet is what the rest of the site points at.
- No em dash in visible strings.
- Services ZAFTYS cannot confirm as live stay labeled proposed, in one sentence, not five cards.

---

## 11. Open points

These do not block the tighten pass.

| Topic | Until answered, ship this |
|-------|---------------------------|
| Which ownership services are live? | One Proposed sentence on the ownership card. Do not promote them into the hero or meta description. |
| Is a profit split approved? | Omit the ratio. FAQ says the agreement sets the share. |
| Who reads ownership leads? | Same `mail_partner` inbox, path in the subject. |

---

## 12. Acceptance for the tighten pass

- `/partner` still loads in the existing header and footer.
- Above the form: hero + two cards only. No benefit grid, no money waterfall, no trust grid, no growth visual.
- Fleet is still the default radio. Hero “I already own trucks” and the fleet card both select fleet and scroll to the form.
- Ownership hero/card select first-truck and scroll to the form.
- Expand still asks TranZfort vs operating partnership.
- FAQ has at most eight items. Broker fee, partner owns the truck, and how profit is shared under the agreement stay on the page.
- Close band has no Join / Explore pair. WhatsApp, mailto, and TranZfort remain.
- Canonical, sitemap loc, and nav hrefs are still `/partner`.
- Form still posts to `/api/partner.php`. No new analytics vendor. No new route.
