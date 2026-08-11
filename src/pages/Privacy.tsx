import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LegalDocument from "@/components/legal/LegalDocument";
import { pageSeo } from "@/lib/page-seo";
import { LEGAL_UPDATED, LEGAL_VERSION } from "@/lib/legal/terms-sections";
import { privacyIntro, privacySections } from "@/lib/legal/privacy-sections";

const Privacy = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#cookies") return;
    const el = document.getElementById("cookies");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <LegalDocument
      title="Privacy Policy"
      seoTitle={pageSeo.privacy.title}
      seoDescription={pageSeo.privacy.description}
      canonical="/privacy"
      version={LEGAL_VERSION}
      lastUpdated={LEGAL_UPDATED}
      intro={privacyIntro}
      sections={privacySections}
      activePath="/privacy"
    />
  );
};

export default Privacy;
