import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { heroMailSubjects } from "@/lib/hero-ctas";
import NotFound from "@/pages/NotFound";
import { getIndustryBySlug, getRelatedIndustries } from "@/lib/industries-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { paths, industryPath } from "@/lib/site-paths";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  if (!industry) {
    return <NotFound />;
  }

  const related = getRelatedIndustries(industry);

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Industries", path: paths.industries },
      { name: industry.title, path: industryPath(industry.slug) },
    ]),
    faqPageSchema(industry.faqs),
  ];

  const quoteBody = industry.whatsappPrefill
    ? `Hi ZAFTYS,\n\n${industry.whatsappPrefill}\n\n`
    : `Hi ZAFTYS,\n\nI'd like a quote for ${industry.title} logistics.\n\nCorridor:\nLoad type:\nVolume:\n\n`;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={industry.seoTitle}
        description={industry.seoDescription}
        canonical={industryPath(industry.slug)}
        schema={schema}
      />

      <PageHero
        badge={industry.title}
        title={industry.seoH1}
        description={industry.description}
        imageSrc={industry.image}
        imageAlt={`${industry.title} freight by ZAFTYS`}
        className="min-h-[380px] pt-28 pb-14 md:min-h-[420px]"
        prepend={
          <Link
            to={paths.industries}
            className="relative z-10 mb-5 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> All industries
          </Link>
        }
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Get a Quote"
            subject={heroMailSubjects.industryQuote(industry.title)}
            body={quoteBody}
          />
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              Transportation
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {/* Compact body: main + sticky aside */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:py-12">
          <div className="min-w-0 space-y-6">
            {/* Products — dense chip/list hybrid */}
            <section className="border border-border bg-white p-5 md:p-6">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-navy md:text-xl">
                  Products we haul
                </h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  {industry.products.length} types
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {industry.products.map((product) => (
                  <div
                    key={product.name}
                    className="flex gap-3 rounded-lg bg-surface px-3 py-2.5"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy">{product.name}</p>
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                        {product.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Realities + method — two tight columns */}
            <section className="grid gap-4 md:grid-cols-2">
              <div className="border border-border bg-white p-5 md:p-6">
                <h2 className="mb-3 font-heading text-lg font-bold text-navy">
                  What goes wrong
                </h2>
                <ul className="space-y-2.5">
                  {industry.challenges.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-snug text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border bg-white p-5 md:p-6">
                <h2 className="mb-3 font-heading text-lg font-bold text-navy">
                  How we run it
                </h2>
                <ol className="space-y-2.5">
                  {industry.howZaftysHelps.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-snug text-muted-foreground"
                    >
                      <span className="shrink-0 font-heading text-xs font-bold text-primary">
                        {i + 1}.
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Corridors + equipment — compact split with image strip */}
            <section className="overflow-hidden border border-border bg-white">
              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="relative min-h-[120px] md:min-h-full">
                  <img
                    src={industry.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-navy/35" />
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-2 md:p-6">
                  <div>
                    <h2 className="mb-2.5 font-heading text-base font-bold text-navy">
                      Corridors
                    </h2>
                    <ul className="space-y-2">
                      {industry.corridors.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-snug text-muted-foreground before:mr-1.5 before:text-accent before:content-['·']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-2.5 font-heading text-base font-bold text-navy">
                      Equipment
                    </h2>
                    <ul className="space-y-2">
                      {industry.equipment.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-snug text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <Link
                        to={
                          industry.slug === "container-transport"
                            ? paths.logistics.container
                            : paths.logistics.industrial
                        }
                        className="font-semibold text-primary hover:underline"
                      >
                        {industry.slug === "container-transport"
                          ? "Container transportation"
                          : "Industrial freight"}
                      </Link>
                      <Link to={paths.fleet} className="font-semibold text-primary hover:underline">
                        Fleet
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ compact */}
            <section className="border border-border bg-white p-5 md:p-6">
              <h2 className="mb-3 font-heading text-lg font-bold text-navy">FAQ</h2>
              <div className="divide-y divide-border">
                {industry.faqs.map((faq) => (
                  <details key={faq.question} className="group py-2.5 first:pt-0 last:pb-0">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-3">
                        {faq.question}
                        <span className="shrink-0 text-primary group-open:hidden">+</span>
                        <span className="hidden shrink-0 text-primary group-open:inline">−</span>
                      </span>
                    </summary>
                    <p className="mt-1.5 pr-6 text-sm leading-snug text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
              {industry.blogLinks && industry.blogLinks.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs">
                  {industry.blogLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="font-semibold text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          {/* Aside — sticky quote + features */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-navy p-5 text-white">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {industry.highlight}
              </p>
              <p className="mb-4 text-sm leading-snug text-gray-200">
                Product, origin, destination, trips/week — same desk as Transportation.
              </p>
              <div className="flex flex-col gap-2">
                <WhatsAppButton label="WhatsApp quote" message={industry.whatsappPrefill} />
                <HeroEmailButton
                  label="Email the desk"
                  subject={heroMailSubjects.industryQuote(industry.title)}
                  body={quoteBody}
                />
              </div>
            </div>

            <div className="border border-border bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                At a glance
              </p>
              <ul className="space-y-2">
                {industry.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-navy">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Also see
              </p>
              <ul className="space-y-2">
                {related.slice(0, 3).map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={industryPath(item.slug)}
                      className="group flex items-center justify-between gap-2 text-sm font-medium text-navy hover:text-primary"
                    >
                      <span>{item.title}</span>
                      <ArrowRight
                        size={14}
                        className="shrink-0 opacity-40 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={paths.industries}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    All industries
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Slim footer CTA */}
      <section className="border-t border-border bg-white px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-lg font-bold text-navy">
              Quote {industry.title}
            </p>
            <p className="text-sm text-muted-foreground">
              Corridor + product + volume. We reply with class and capacity.
            </p>
          </div>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" message={industry.whatsappPrefill} />
            <Link to={paths.fleet}>
              <Button variant="outline">Fleet</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
