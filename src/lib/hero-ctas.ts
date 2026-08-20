/** Mailto subjects and body templates for hero inquiry CTAs → info@zaftys.com */

export const heroMailSubjects = {
  demo: "ZAFTYS TMS demo request",
  quote: "Freight quote request",
  fleet: "Fleet availability inquiry",
  network: "TranZfort capacity inquiry",
  industryHub: "Industry logistics inquiry",
  industryQuote: (vertical: string) => `${vertical} logistics quote`,
  about: "Partnership inquiry",
  contact: "General inquiry",
  partner: "TranZfort partner inquiry",
  careers: "Careers inquiry",
  resources: "Logistics question",
} as const;

export const heroMailBodies = {
  demo:
    "Hi ZAFTYS,\n\nI'd like to request a demo of ZAFTYS TMS.\n\nCompany:\nRole:\nBest time to connect:\n\n",
  quote:
    "Hi ZAFTYS,\n\nI'd like a freight quote.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n",
  fleet:
    "Hi ZAFTYS,\n\nI'd like to check fleet availability.\n\nRoute / corridor:\nLoad type:\nDates:\n\n",
  network:
    "Hi ZAFTYS,\n\nI need additional transport capacity through TranZfort.\n\nShipment details:\nTimeline:\n\n",
  industryHub:
    "Hi ZAFTYS,\n\nI'd like to discuss logistics for our industry vertical.\n\nIndustry:\nCorridor / volume:\n\n",
  about:
    "Hi ZAFTYS,\n\nI'd like to explore working together.\n\nCompany:\nWhat we ship:\n\n",
  partner:
    "Hi ZAFTYS,\n\nI have a question about joining TranZfort as a transport partner.\n\nCompany:\nFleet size:\nCorridors:\n\n",
  careers:
    "Hi ZAFTYS,\n\nI have a question about careers at ZAFTYS.\n\n",
  resources:
    "Hi ZAFTYS,\n\nI have a logistics question for your team.\n\n",
} as const;

/**
 * Hero CTA pattern per page:
 * - Primary = main conversion (inquire → mailto, or on-page action)
 * - Secondary = explore deeper (internal link, anchor, or external product)
 */
export const heroCtaGuide = {
  technology: { primary: "Request a Demo → email", secondary: "Login to Portal → app" },
  services: { primary: "Get a Freight Quote → email", secondary: "Match Truck & Material → anchor" },
  fleet: { primary: "Check Fleet Availability → email", secondary: "Explore Services → /services" },
  network: { primary: "Request Additional Capacity → email", secondary: "Become a Partner → /partner" },
  industries: { primary: "Discuss Your Industry Needs → email", secondary: "Transportation → /logistics" },
  industryDetail: { primary: "Get a Quote → email", secondary: "Talk to Our Team → /contact" },
  about: { primary: "Work With ZAFTYS → email", secondary: "Transportation → /logistics" },
  contact: { primary: "Email Our Team → email", secondary: "Send a Message → form" },
  partner: { primary: "Register Your Fleet → form", secondary: "Partner Inquiry → email" },
  careers: { primary: "View Open Positions → anchor", secondary: "Email HR Team → email" },
  resources: { primary: "Browse Articles → anchor", secondary: "Ask a Question → email" },
} as const;
