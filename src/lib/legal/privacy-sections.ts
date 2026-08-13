import type { LegalSection } from "@/components/legal/LegalDocument";

export const privacyIntro =
  "This Privacy Policy explains how ZAFTYS Logistics may collect, use, disclose, retain and protect personal data in connection with zaftys.com, logistics and capacity-facilitation services, Transporter and Fleet Partner interactions, Trip management and related technology. It is intended to operate consistently with applicable Indian data-protection law, including the Digital Personal Data Protection Act, 2023 and applicable rules as they apply.";

export const privacySections: LegalSection[] = [
  {
    id: "collect",
    title: "1. What personal data we may collect",
    blocks: [
      {
        type: "ul",
        items: [
          "Identity and contact — name, business name, designation, phone, email, address, KYC where required.",
          "Business — company name, GST information, fleet details, routes, vehicle categories, transportation requirements.",
          "Vehicle and driver — registration, RC, fitness, permit, insurance, PUC, driver name, licence, Trip-related details.",
          "Trip — origin, destination, cargo information, loading/unloading, status, GPS/location where applicable.",
          "Communications — email, WhatsApp, support conversations, call notes or recordings where lawful.",
          "Technical — IP, browser, device, logs, cookies and similar technologies.",
          "Payment — invoice, payment status, transaction references, bank/payment details where required for settlement.",
        ],
      },
    ],
  },
  {
    id: "how-collect",
    title: "2. How we collect personal data",
    blocks: [
      {
        type: "p",
        text: "We may collect data directly from you; through website forms; when you request services, submit requirements, approve a Vehicle or onboard; from Documents submitted for matching; through authorised partners, apps, GPS/tracking; through business communications; and from publicly available or lawfully obtained sources where appropriate.",
      },
    ],
  },
  {
    id: "purposes",
    title: "3. Purposes of processing",
    blocks: [
      {
        type: "p",
        text: "Purposes include providing services; arranging capacity; communicating with Transporters and Fleet Partners; verifying vehicle/business information; coordinating Trips; payments and invoicing; fraud prevention; incident investigation; dispute resolution; support; improving services; cybersecurity; legal compliance; protecting rights; service communications; and marketing where permitted by law. Where consent is required, we obtain it appropriately; otherwise we may rely on other lawful bases recognised by applicable law.",
      },
    ],
  },
  {
    id: "sharing-marketplace",
    title: "4. Transporter and Fleet Partner sharing",
    blocks: [
      {
        type: "p",
        text: "Matching capacity requires sharing. When a Vehicle is proposed, ZAFTYS may share registration, Vehicle details, Fleet Partner/operator information, driver name and contact, relevant compliance information and Trip details with the Transporter. ZAFTYS may share relevant Transporter, origin, destination, cargo and Trip information with a Fleet Partner where necessary to perform the Trip. Sharing is limited to what is reasonably necessary.",
      },
    ],
  },
  {
    id: "drivers-gps",
    title: "5. Drivers, owners, location and communications",
    blocks: [
      {
        type: "p",
        text: "Driver and vehicle-owner data may be processed for verification, loading/unloading, dispatch, communication, tracking, payment, security, claims and legal compliance. GPS/tracking (where enabled) may include location, route, timestamps and trip status for operations, ETA, security, investigation and dispute resolution. Business communications (including WhatsApp and calls) may be processed or recorded where legally permitted, with required notice or permission.",
      },
    ],
  },
  {
    id: "third-parties",
    title: "6. Sharing with third parties",
    blocks: [
      {
        type: "ul",
        items: [
          "Transporters — Vehicle approval, Trip coordination, delivery.",
          "Fleet Partners and carriers — Trip performance.",
          "Drivers — pickup, delivery and execution.",
          "Service providers — hosting, cloud, communications, maps/GPS, payments, analytics, authentication, security, storage, support.",
          "Professional advisers — lawyers, accountants, insurers, consultants where reasonably necessary.",
          "Authorities — where required or permitted by law.",
          "Business transactions — merger, financing, acquisition or similar, subject to applicable law.",
        ],
      },
      {
        type: "p",
        text: "ZAFTYS does not operate as a commercial data broker and does not sell personal data as a standalone business.",
      },
    ],
  },
  {
    id: "security-retention",
    title: "7. Security and retention",
    blocks: [
      {
        type: "p",
        text: "ZAFTYS maintains reasonable technical and organisational safeguards (access controls, authentication, encryption where appropriate, logging, backups, vendor controls and operational security). No system is completely secure.",
      },
      {
        type: "p",
        text: "Data may be retained as reasonably necessary for services, relationships, contracts, accounting, tax, claims, disputes, fraud prevention, security and regulatory requirements. When no longer required and no legal obligation remains, data may be deleted, anonymised or securely disposed of.",
      },
    ],
  },
  {
    id: "rights",
    title: "8. Data principal rights and consent",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable law, individuals may request information about processing, correction, erasure where legally applicable, withdrawal of consent where processing is consent-based, and raise a grievance. Send requests to legal@zaftys.com or info@zaftys.com with enough detail to identify you. We may verify identity before responding.",
      },
      {
        type: "p",
        text: "Withdrawal of consent does not invalidate prior lawful processing, stop legally required processing, or prevent processing on another lawful ground. Withdrawal may affect our ability to provide services that need that information.",
      },
    ],
  },
  {
    id: "other",
    title: "9. Accuracy, children, international processing, breaches",
    blocks: [
      {
        type: "p",
        text: "Provide accurate information and notify relevant changes. Services are primarily for adults and businesses; we do not knowingly provide commercial transportation services directly to children without required safeguards. Technology providers may process information outside India subject to applicable Indian law. On a personal-data breach, we will investigate, contain, assess, take corrective action, notify where legally required, and improve safeguards.",
      },
      {
        type: "p",
        text: "If you provide another person’s data (driver, employee, owner, consignee), you must have authority or another lawful basis to do so.",
      },
    ],
  },
  {
    id: "marketing",
    title: "10. Marketing",
    blocks: [
      {
        type: "p",
        text: "Promotional communications may be sent where permitted by law, with an opt-out where required. Website newsletter signup is stored on ZAFTYS hosting. Unsubscribe by emailing subscribers@zaftys.com with subject Unsubscribe. Service and transaction messages may continue as needed to provide services, complete Trips, process payment, maintain security or comply with law.",
      },
    ],
  },
  {
    id: "cookies",
    title: "11. Cookies",
    blocks: [
      {
        type: "p",
        text: "Cookie practices are described in the separate Cookie Policy (see legal navigation or /cookies). Essential cookies may be required for site function. Where enabled, website analytics run on self-hosted Matomo (or an equivalent self-hosted tool) on ZAFTYS infrastructure rather than Google Analytics. Optional analytics or marketing cookies (if used) will follow applicable consent requirements.",
      },
    ],
  },
  {
    id: "changes-contact",
    title: "12. Changes and privacy contact",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy when services, technology, law or practices change. The latest version is published on zaftys.com with a revised Last Updated date.",
      },
      {
        type: "p",
        text: "Privacy grievance / data requests: legal@zaftys.com or info@zaftys.com, subject \"Privacy Grievance / Data Request\". ZAFTYS Logistics, Old Town, Badnera, Amravati, 444701, Maharashtra, India.",
      },
    ],
  },
];
