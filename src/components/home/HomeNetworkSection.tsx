import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyTranZfortScreensCarousel } from "@/components/LazyTranZfortScreensCarousel";
import { CTAGroup } from "@/components/CTAGroup";
import { homeCopy } from "@/lib/home-copy";
import { externalLinks } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { paths } from "@/lib/site-paths";

export function HomeNetworkSection() {
  const { network } = homeCopy;

  return (
    <section id="network" aria-labelledby="network-heading">
      <div className="section-padding bg-white pb-8">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              {network.eyebrow}
            </p>
            <h2 id="network-heading" className="text-4xl font-heading font-bold mb-4 text-navy">
              {network.h2}
            </h2>
            <p className="text-lg text-muted-foreground">{network.lead}</p>
          </div>
        </div>
      </div>

      <div className="section-padding bg-navy text-white" aria-labelledby="network-tranzfort-heading">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold mb-4 uppercase tracking-widest">
                {network.tranzfort.badge}
              </div>
              <h3
                id="network-tranzfort-heading"
                className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight"
              >
                {network.tranzfort.h3}
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">{network.tranzfort.lead}</p>
              <CTAGroup className="justify-start">
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
            <div className="lg:w-1/2 w-full">
              <LazyTranZfortScreensCarousel surface="navy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
