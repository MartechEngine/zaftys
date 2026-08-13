import type { LegalSection } from "@/components/legal/LegalDocument";

export const cookieIntro =
  "This Cookie Policy explains how ZAFTYS may use cookies and similar technologies on https://zaftys.com/. Read it together with the Privacy Policy.";

export const cookieSections: LegalSection[] = [
  {
    id: "what",
    title: "1. What are cookies?",
    blocks: [
      {
        type: "p",
        text: "Cookies are small files or similar identifiers that may be stored on a device when a website is accessed. They may help websites function, remember preferences, maintain sessions, improve security, understand usage and measure performance.",
      },
    ],
  },
  {
    id: "types",
    title: "2. Types of cookies ZAFTYS may use",
    blocks: [
      {
        type: "h3",
        text: "Strictly necessary",
      },
      {
        type: "p",
        text: "Required for website operation, security, authentication, session management, form functionality, fraud prevention and basic technical function.",
      },
      {
        type: "h3",
        text: "Preference",
      },
      {
        type: "p",
        text: "May remember language, display preferences, region or other choices.",
      },
      {
        type: "h3",
        text: "Analytics",
      },
      {
        type: "p",
        text: "Where enabled, help understand visitors, pages viewed, traffic sources, campaigns, button clicks and form completions. ZAFTYS prefers self-hosted analytics (Matomo) so data stays on ZAFTYS hosting. Configuration should stay privacy-friendly where practical.",
      },
      {
        type: "h3",
        text: "Marketing or advertising",
      },
      {
        type: "p",
        text: "May be used in the future. Where consent is required, ZAFTYS will seek appropriate consent before activating them.",
      },
    ],
  },
  {
    id: "third-party",
    title: "3. Third-party cookies",
    blocks: [
      {
        type: "p",
        text: "Some functions may be provided by third parties (analytics, maps, video, communication, security or embedded content). Those providers may place their own cookies under their policies.",
      },
    ],
  },
  {
    id: "consent",
    title: "4. Consent and managing cookies",
    blocks: [
      {
        type: "p",
        text: "Where law requires consent for non-essential cookies, ZAFTYS will provide an appropriate mechanism to accept, reject or manage optional cookies. Strictly necessary cookies may continue where required for requested functionality.",
      },
      {
        type: "p",
        text: "You can also manage cookies in browser settings. Disabling certain cookies may affect site functionality. Browser controls do not necessarily cover every tracking technology.",
      },
    ],
  },
  {
    id: "retention",
    title: "5. Retention and changes",
    blocks: [
      {
        type: "p",
        text: "Cookies may be session (expire when the browser session ends) or persistent (remain for a defined period). Exact retention depends on the specific technology. ZAFTYS may review usage periodically and remove technologies that are no longer necessary.",
      },
      {
        type: "p",
        text: "This Cookie Policy may be updated when website functionality, analytics, marketing tools or legal requirements change. The latest version will be published on the website.",
      },
    ],
  },
];
