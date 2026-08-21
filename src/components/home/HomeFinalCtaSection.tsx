import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MarketingFinalCta } from "@/components/marketing/MarketingChrome";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { paths } from "@/lib/site-paths";

/** Navy final CTA: accent → WhatsApp → on-dark-outline @see cta-recipe */
export function HomeFinalCtaSection() {
  const { finalCta } = homeCopy;

  return (
    <MarketingFinalCta id="final-cta" aria-labelledby="final-cta-heading">
      <h2 id="final-cta-heading" className="font-heading text-3xl font-bold md:text-4xl">
        {finalCta.h2}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{finalCta.lead}</p>
      <CTAGroup className="mt-8">
        <HeroEmailButton
          label={homeQuoteEmail.label}
          subject={homeQuoteEmail.subject}
          body={homeQuoteEmail.bodyShort}
        />
        <WhatsAppButton label="Chat on WhatsApp" placement="footer-cta" intent="quote" />
        <Link to={paths.network.hub}>
          <Button size="lg" variant="on-dark-outline">
            Explore Network
          </Button>
        </Link>
        <Link to={paths.technology.tms}>
          <Button size="lg" variant="on-dark-outline">
            Explore ZAFTYS TMS
          </Button>
        </Link>
      </CTAGroup>
    </MarketingFinalCta>
  );
}
