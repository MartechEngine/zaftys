# copy-v2-l.md

# ZAFTYS Website Copy V2

## SEO, Metadata & Legal

Version: 2.0

Purpose

Provide approved page titles, meta descriptions, Open Graph guidance, schema snippets, and legal page copy summaries for implementation in `SEO.tsx`, `index.html`, and legal routes.

Follow principles from `copy-v2-a.md` §SEO Philosophy: write for people first; no clickbait; no unverified superlatives.

**Site URL base:** https://zaftys.com  
**Portal:** https://app.zaftys.com  
**TranZfort:** https://tranzfort.com  
**WhatsApp:** +91-927-092-3581

---

# Global SEO Defaults

## Site title suffix

`| ZAFTYS Logistics`

## Default OG title

ZAFTYS Logistics  -  Industrial Transport & Operations

## Default OG description

Industrial freight across India. Company-operated fleet, ZAFTYS TSM visibility, and verified capacity through TranZfort  -  all transactions through ZAFTYS Logistics Pvt Ltd.

## Default keywords (use naturally in copy, not stuffed)

industrial logistics, heavy transport, bulk freight, fleet management, transport management software, cement logistics, steel haulage, mining transport, India corridors

---

# Per-Page Metadata

## Home (`/`)

**Title:** Industrial Logistics & Heavy Freight Transport | ZAFTYS Logistics

**Meta description:** Move industrial freight with company-operated transport, operational visibility through ZAFTYS TSM, and scalable capacity via TranZfort. Get a quote on WhatsApp.

**Canonical:** /

**Primary CTA (WhatsApp pre-fill):** Hi ZAFTYS, I'd like a quote for heavy load transport. From:  To:  Load type:

---

## Services (`/services`)

**Title:** Industrial Logistics Services  -  FTL, Contract & Heavy Haul | ZAFTYS

**Meta description:** FTL, mining logistics, contract fleet, project cargo, and overflow capacity on industrial corridors across India. Own fleet + TranZfort network + TSM visibility.

**Canonical:** /services

---

## Fleet (`/fleet`)

**Title:** Company Fleet & Transport Capacity | ZAFTYS Logistics

**Meta description:** Company-operated heavy-haul assets, disciplined maintenance, and surge capacity through the TranZfort network. Built for industrial corridors across India.

**Canonical:** /fleet

---

## Network / TranZfort (`/network`)

**Title:** TranZfort Network  -  Verified Capacity Through ZAFTYS

**Meta description:** Scale transport capacity without managing extra vendors. Verified partners, centralized coordination, and shipment visibility through ZAFTYS TSM. All transactions through ZAFTYS.

**Meta note:** Avoid "AI-powered marketplace" in SEO unless product marketing approves. Prefer "verified logistics network".

**Canonical:** /network

---

## Platform / Technology (`/technology`)

**Title:** ZAFTYS TSM  -  Transport & Fleet Management Platform

**Meta description:** Dispatch, GPS tracking, ePOD, fleet records, and client visibility  -  the platform ZAFTYS runs daily and offers to shippers and fleet operators.

**Nav label on site:** Platform (route stays `/technology`)

**Canonical:** /technology

---

## Industries (`/industries`)

**Title:** Industries We Serve  -  Cement, Steel, Mining & Bulk Freight

**Meta description:** Heavy-haul logistics for cement, steel, coal, chemicals, manufacturing, FMCG, retail distribution, and industrial supply chains across India.

**Canonical:** /industries

---

## Partner (`/partner`)

**Title:** Fleet Partner Program  -  Join TranZfort Through ZAFTYS

**Meta description:** Register your fleet for verified industrial loads, payments through ZAFTYS Logistics, and operational tools as you scale. Professional onboarding required.

**Avoid:** guaranteed loads, instant earnings

**Canonical:** /partner

---

## About (`/about`)

**Title:** About ZAFTYS  -  Industrial Logistics Experience & Registered Company

**Meta description:** Three generations of corridor experience. ZAFTYS Logistics Pvt Ltd combines own fleet, TranZfort network capacity, and ZAFTYS TSM for industrial shippers and transporters.

**Canonical:** /about

---

## Contact (`/contact`)

**Title:** Contact ZAFTYS  -  Freight Quotes & Logistics Consultation

**Meta description:** Speak with our logistics team in Pune. WhatsApp-first quotes for industrial freight, platform demos, and partnership enquiries. +91-927-092-3581.

**Canonical:** /contact

---

## Careers (`/careers`)

**Title:** Careers at ZAFTYS  -  Logistics, Operations & Technology

**Meta description:** Join ZAFTYS in operations, dispatch, fleet, and technology roles supporting industrial freight across India. Apply online or submit a general application.

**Avoid:** India's leading / #1 / world-class employer claims unless verified

**Canonical:** /careers

---

## Login (`/login`)

**Title:** Login  -  ZAFTYS TSM Client & Team Portal

**Meta description:** Access the ZAFTYS TSM client portal and team dashboard at app.zaftys.com for shipment visibility and fleet operations.

**Canonical:** /login

**Robots:** noindex, follow (optional  -  discuss with SEO)

---

## Privacy (`/privacy`)

**Title:** Privacy Policy | ZAFTYS Logistics

**Meta description:** How ZAFTYS Logistics collects, uses, and protects personal data from website forms, partner registration, careers applications, and platform services.

**Canonical:** /privacy

---

## Terms (`/terms`)

**Title:** Terms of Service | ZAFTYS Logistics

**Meta description:** Terms for using the ZAFTYS website, requesting logistics services, and accessing ZAFTYS TSM. Service contracts govern specific transport agreements.

**Canonical:** /terms

---

## 404 (`*`)

**Title:** Page Not Found | ZAFTYS Logistics

**Meta description:** This page does not exist. Return to Services, Network, or Contact for freight quotes and logistics support.

**Robots:** noindex

---

# Open Graph & Social

## OG image

Use `/og-image.svg` or dedicated 1200×630 asset when available.

## Twitter card

summary_large_image

## Consistent OG fields per page

og:title  -  match page title (without duplicate suffix if too long)

og:description  -  match meta description

og:url  -  full canonical URL

og:type  -  website (article for future blog/resources)

---

# Schema.org Snippets (JSON-LD guidance)

## Organization (Home  -  already partially implemented)

```json
{
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  "name": "ZAFTYS Logistics",
  "url": "https://zaftys.com",
  "description": "Industrial logistics  -  own fleet, TSM visibility, TranZfort verified capacity.",
  "telephone": "+91-927-092-3581",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "World Trade Center, Kharadi",
    "addressLocality": "Pune",
    "postalCode": "411014",
    "addressRegion": "MH",
    "addressCountry": "IN"
  }
}
```

## SoftwareApplication (Platform page  -  add when approved)

Name: ZAFTYS TSM

ApplicationCategory: BusinessApplication

OperatingSystem: Web

Offers: Contact for pricing  -  do not invent price in schema

## WebSite searchAction (optional future)

---

# Privacy Policy  -  Marketing Summary

**Page H1:** Privacy Policy

**Last updated line:** Last Updated: [Month Day, Year]  -  update on legal review (live site: November 29, 2025)

## Intro paragraph (V2)

At ZAFTYS Logistics Pvt Ltd ("ZAFTYS", "we", "our"), we respect your privacy and are committed to protecting personal data collected through our website, logistics services, partner onboarding, careers applications, newsletter signup, and ZAFTYS TSM / TranZfort-related services.

## Section outline

1. **Information we collect**  -  quote/contact forms, partner registration, careers applications, newsletter email, platform usage data where applicable, cookies and analytics

2. **How we use information**  -  provide logistics services, process enquiries, partner verification, employment applications, improve website and TSM, legal compliance

3. **TranZfort and mobile app data**  -  location and operational data only as needed for load matching and trip execution; reference TranZfort privacy terms when app is separate legal entity  -  legal review required

4. **Sharing**  -  service providers (hosting, email); verified partners only as needed for shipment execution under ZAFTYS coordination; legal authorities when required; **we do not sell personal data**

5. **Retention**  -  as long as needed for service, legal, and accounting obligations

6. **Security**  -  appropriate technical and organizational measures; no absolute guarantee

7. **Your rights**  -  access, correction, deletion requests under applicable Indian law  -  legal review for exact wording

8. **Contact**  -  contact@zaftys.com · World Trade Center, Kharadi, Pune 411014

## Cookie policy anchor (`/privacy#cookies`)

Brief note on essential cookies, analytics (if used), and preference cookies. Link from footer "Cookie Policy".

---

# Terms of Service  -  Marketing Summary

**Page H1:** Terms of Service

**Last updated line:** Last Updated: [Month Day, Year]

## Intro paragraph (V2)

Welcome to ZAFTYS Logistics. By accessing zaftys.com, submitting forms, or using our services, you agree to these Terms of Service. Specific transport services are governed by separate contracts between ZAFTYS and the client.

## Section outline

1. **Acceptance**  -  18+ capacity; disagree = do not use

2. **Services**  -  website is informational; binding rates and SLAs only in signed agreements

3. **TranZfort / partner use**  -  partners must comply with verification and operational standards

4. **TSM / platform**  -  acceptable use; no unauthorized access; IP belongs to ZAFTYS

5. **User conduct**  -  no unlawful use, false information, system interference

6. **Intellectual property**  -  ZAFTYS TSM™, TranZfort branding, site content protected

7. **Limitation of liability**  -  standard legal limits  -  legal review required

8. **Changes**  -  terms may update; continued use = acceptance

9. **Governing law**  -  India / Maharashtra  -  legal review required

10. **Contact**  -  legal@zaftys.com (or contact@zaftys.com if legal inbox not live)

---

# Robots & Sitemap Notes

Include in sitemap.xml: /, /services, /fleet, /network, /technology, /industries, /partner, /about, /contact, /careers, /privacy, /terms

Exclude or noindex: /login, 404, thank-you pages if added

Phase 2: /industries/:slug when detail pages launch

Defer: /resources until copy-v2-i is implemented

---

# Implementation Checklist

- [ ] Replace live meta descriptions that use unverified claims (Partner "guaranteed loads", Careers "leading company")
- [ ] Align Network SEO with copy-v2-e framing (verified capacity, not generic marketplace)
- [ ] Add TranZfort data processing cross-reference in Privacy when legal approves
- [ ] Update Privacy/Terms "Last Updated" dates on legal review
- [ ] Wire JSON-LD SoftwareApplication on Platform page after product marketing sign-off
- [ ] Keep WhatsApp number consistent: +91-927-092-3581 everywhere

---

# End of copy-v2-l.md
