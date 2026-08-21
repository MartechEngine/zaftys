import { ArrowRight, Route, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { MarketingEyebrow, MarketingTile } from "@/components/marketing/MarketingChrome";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { homeOperatingModel } from "@/lib/constants";
import { paths } from "@/lib/site-paths";
import type { LucideIcon } from "lucide-react";

const pillarIcons: Record<(typeof homeOperatingModel)[number]["id"], LucideIcon> = {
  fleet: Truck,
  contract: Route,
  network: Users,
};

export function HomeOperatingModelSection() {
  const { operatingModel } = homeCopy;

  return (
    <section
      id="operating-model"
      aria-labelledby="operating-model-heading"
      className="section-band-wide bg-surface"
    >
      <div className="section-band-inner-wide">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <MarketingEyebrow>{operatingModel.eyebrow}</MarketingEyebrow>
          <h2
            id="operating-model-heading"
            className="font-heading text-3xl font-bold text-navy md:text-4xl md:leading-tight"
          >
            {operatingModel.h2}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {operatingModel.lead}
          </p>
        </div>

        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {operatingModel.flowLabel}
        </p>

        <ol className="mb-10 grid list-none grid-cols-1 gap-4 p-0 m-0 md:grid-cols-3">
          {homeOperatingModel.map((item) => {
            const Icon = pillarIcons[item.id];
            return (
              <li key={item.id} className="flex">
                <Link to={item.link} className="group flex flex-1 flex-col">
                  <MarketingTile className="h-full transition-colors group-hover:border-primary/40">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-heading text-xs font-bold tracking-[0.2em] text-accent">
                        {item.step}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center border border-border bg-white text-primary">
                        <Icon size={22} />
                      </div>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-navy group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </MarketingTile>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto mb-10 max-w-3xl border border-border bg-white px-6 py-5 text-center">
          <p className="mb-1 text-sm text-muted-foreground">{operatingModel.supporting}</p>
          <p className="text-sm font-medium text-navy">{operatingModel.tagline}</p>
        </div>

        <CTAGroup className="justify-center">
          <HeroEmailButton
            label={homeQuoteEmail.label}
            subject={homeQuoteEmail.subject}
            body={homeQuoteEmail.body}
          />
          <Link to={paths.logistics.hub}>
            <Button variant="outline-brand">
              How we operate <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  );
}
