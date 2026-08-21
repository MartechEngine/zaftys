import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyTranZfortScreensCarousel } from "@/components/LazyTranZfortScreensCarousel";
import { CTAGroup } from "@/components/CTAGroup";
import { MarketingEyebrow } from "@/components/marketing/MarketingChrome";
import { homeCopy } from "@/lib/home-copy";
import { externalLinks } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { paths } from "@/lib/site-paths";

export function HomeNetworkSection() {
  const { network } = homeCopy;

  return (
    <section id="network" aria-labelledby="network-heading">
      <div className="section-band bg-white">
        <div className="section-band-inner max-w-3xl text-center">
          <MarketingEyebrow>{network.eyebrow}</MarketingEyebrow>
          <h2 id="network-heading" className="font-heading text-3xl font-bold text-navy md:text-4xl">
            {network.h2}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{network.lead}</p>
        </div>
      </div>

      <div className="section-band-wide bg-navy text-white" aria-labelledby="network-tranzfort-heading">
        <div className="section-band-inner-wide">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="lg:w-1/2">
              <div className="mb-4 inline-block border border-accent/30 bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {network.tranzfort.badge}
              </div>
              <h3
                id="network-tranzfort-heading"
                className="font-heading text-2xl font-bold leading-tight md:text-3xl"
              >
                {network.tranzfort.h3}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">
                {network.tranzfort.lead}
              </p>
              <CTAGroup className="mt-6 justify-start">
                <Button asChild variant="accent">
                  <a
                    href={externalLinks.tranzfort}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_tranzfort", { placement: "home" })}
                  >
                    Open TranZfort
                  </a>
                </Button>
                <Link to={paths.network.hub}>
                  <Button variant="on-dark-outline">Explore Network</Button>
                </Link>
              </CTAGroup>
            </div>
            <div className="w-full lg:w-1/2">
              <LazyTranZfortScreensCarousel surface="navy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
