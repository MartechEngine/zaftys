import LegalDocument from "@/components/legal/LegalDocument";
import { pageSeo } from "@/lib/page-seo";
import { LEGAL_UPDATED, LEGAL_VERSION } from "@/lib/legal/terms-sections";
import { cookieIntro, cookieSections } from "@/lib/legal/cookie-sections";

const Cookies = () => (
  <LegalDocument
    title="Cookie Policy"
    seoTitle={pageSeo.cookies.title}
    seoDescription={pageSeo.cookies.description}
    canonical="/cookies"
    version={LEGAL_VERSION}
    lastUpdated={LEGAL_UPDATED}
    intro={cookieIntro}
    sections={cookieSections}
    activePath="/cookies"
  />
);

export default Cookies;
