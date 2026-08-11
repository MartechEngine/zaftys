import LegalDocument from "@/components/legal/LegalDocument";
import { pageSeo } from "@/lib/page-seo";
import { LEGAL_UPDATED, LEGAL_VERSION, termsIntro, termsSections } from "@/lib/legal/terms-sections";

const Terms = () => (
  <LegalDocument
    title="Terms of Use & Service"
    seoTitle={pageSeo.terms.title}
    seoDescription={pageSeo.terms.description}
    canonical="/terms"
    version={LEGAL_VERSION}
    lastUpdated={LEGAL_UPDATED}
    intro={termsIntro}
    sections={termsSections}
    activePath="/terms"
  />
);

export default Terms;
