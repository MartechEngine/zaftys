import { ArrowRight, Route, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { homeOperatingModel } from "@/lib/constants";
import { paths } from "@/lib/site-paths";
import { cn } from "@/lib/utils";
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
      className="section-padding relative overflow-hidden bg-gradient-to-b from-navy/[0.03] via-white to-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.08), transparent 45%), radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.06), transparent 40%)",
        }}
      />

      <div className="container mx-auto container-padding relative">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">{operatingModel.eyebrow}</p>
          <h2 id="operating-model-heading" className="text-4xl md:text-5xl font-heading font-bold mb-5 text-navy leading-tight">
            {operatingModel.h2}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{operatingModel.lead}</p>
        </div>

        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          {operatingModel.flowLabel}
        </p>

        <div className="relative mb-10">
          <div
            className="hidden lg:block absolute top-[2.75rem] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-accent/40"
            aria-hidden
          />

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 list-none p-0 m-0">
            {homeOperatingModel.map((item, index) => {
              const Icon = pillarIcons[item.id];
              const isLast = index === homeOperatingModel.length - 1;

              return (
                <li key={item.id} className="relative flex">
                  <Link
                    to={item.link}
                    className={cn(
                      "group flex flex-col flex-1 rounded-2xl border border-border bg-white p-8 shadow-md",
                      "hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground text-sm font-heading font-bold shadow-sm ring-4 ring-white">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon size={24} />
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{item.description}</p>

                    <span className="inline-flex items-center text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>

                  {!isLast ? (
                    <div className="hidden md:flex lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" aria-hidden>
                      <ArrowRight size={20} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10 px-6 py-5 rounded-xl bg-muted/40 border border-border">
          <p className="text-sm text-muted-foreground mb-1">{operatingModel.supporting}</p>
          <p className="text-sm font-medium text-navy">{operatingModel.tagline}</p>
        </div>

        <CTAGroup className="justify-center">
          <HeroEmailButton
            label={homeQuoteEmail.label}
            subject={homeQuoteEmail.subject}
            body={homeQuoteEmail.body}
          />
          <Link to={paths.logistics.hub}>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              How we operate <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  );
}
