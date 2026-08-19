import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { whatsappUrl } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { paths } from "@/lib/site-paths";

export function HomeFinalCtaSection() {
  const { finalCta } = homeCopy;

  return (
    <section id="final-cta" aria-labelledby="final-cta-heading" className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="container mx-auto container-padding text-center relative z-10">
        <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
          {finalCta.h2}
        </h2>
        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">{finalCta.lead}</p>
        <CTAGroup>
          <HeroEmailButton
            label={homeQuoteEmail.label}
            subject={homeQuoteEmail.subject}
            body={homeQuoteEmail.bodyShort}
          />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_whatsapp", { placement: "footer-cta", intent: "quote" })}
          >
            <Button size="lg" variant="on-dark-outline">
              Chat on WhatsApp
            </Button>
          </a>
          <Link to={paths.technology.tms}>
            <Button size="lg" variant="on-dark-outline">
              Explore ZAFTYS TMS
            </Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  );
}
