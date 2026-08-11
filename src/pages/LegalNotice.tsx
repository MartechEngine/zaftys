import LegalDocument from "@/components/legal/LegalDocument";
import { pageSeo } from "@/lib/page-seo";
import { LEGAL_UPDATED, LEGAL_VERSION } from "@/lib/legal/terms-sections";
import { noticeIntro, noticeSections } from "@/lib/legal/notice-sections";

const LegalNotice = () => (
  <LegalDocument
    title="Legal Notice"
    seoTitle={pageSeo.legalNotice.title}
    seoDescription={pageSeo.legalNotice.description}
    canonical="/legal-notice"
    version={LEGAL_VERSION}
    lastUpdated={LEGAL_UPDATED}
    intro={noticeIntro}
    sections={noticeSections}
    activePath="/legal-notice"
  />
);

export default LegalNotice;
