/** Deep-researched Blog Template  -  research dossier surface (distinct from Basics). */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { BlogExhibitBlock, DeepResearchExhibitProvider } from "@/components/blog/BlogExhibits";
import {
  type BlogCta,
  type BlogMidCta,
  type BlogPost,
  type BlogSection,
  adjacentPosts,
  blogCategoryLabels,
  formatPostDate,
  relatedPosts,
  sectionAnchor,
} from "@/lib/blog-data";
import { cn } from "@/lib/utils";

type DeepResearchBlogLayoutProps = {
  post: BlogPost;
};

function PostCta({ cta, onDark = false, accent = false }: { cta: BlogCta; onDark?: boolean; accent?: boolean }) {
  if ("to" in cta) {
    return (
      <Link to={cta.to}>
        <Button size="lg" variant={onDark ? "on-dark" : accent ? "accent" : "default"}>
          {cta.label} <ArrowRight className="ml-2" size={16} />
        </Button>
      </Link>
    );
  }
  return <WhatsAppButton label={cta.label} />;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={index}>{part}</span>;
        const [, label, href] = match;
        if (href.startsWith("http")) {
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0B7F8A] hover:underline"
            >
              {label}
            </a>
          );
        }
        return (
          <Link key={index} to={href} className="font-semibold text-[#0B7F8A] hover:underline">
            {label}
          </Link>
        );
      })}
    </>
  );
}

function MidArticleCta({ band, fallback }: { band: BlogMidCta; fallback: BlogCta }) {
  const cta = band.cta ?? fallback;
  return (
    <div className="deep-mid-cta my-10 rounded-xl px-6 py-8 md:px-8">
      <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">{band.eyebrow}</p>
      <h2 className="mt-2 font-heading text-2xl font-bold normal-case tracking-normal text-navy">{band.title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/85">{band.body}</p>
      <div className="mt-6">
        <PostCta cta={cta} accent />
      </div>
    </div>
  );
}

function ProseBlock({
  paragraphs,
  bullets,
}: {
  paragraphs: readonly string[];
  bullets?: readonly string[];
}) {
  return (
    <div className="max-w-3xl">
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 24)}`} className="mb-4 leading-relaxed text-navy/90">
          <RichText text={paragraph} />
        </p>
      ))}
      {bullets ? (
        <ul className="mb-4 list-disc space-y-2 pl-5 text-navy/90">
          {bullets.map((bullet, index) => (
            <li key={`${index}-${bullet.slice(0, 24)}`} className="leading-relaxed">
              <RichText text={bullet} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function midCtasForSection(post: BlogPost, heading: string): BlogMidCta[] {
  return (post.midCtas ?? []).filter((band) => band.afterHeading === heading);
}

function SectionBody({ section, post }: { section: BlogSection; post: BlogPost }) {
  return (
    <>
      <ProseBlock paragraphs={section.paragraphs} bullets={section.bullets} />
      {section.exhibits?.map((exhibit, exhibitIndex) => (
        <BlogExhibitBlock key={`${section.heading}-${exhibit.kind}-${exhibitIndex}`} exhibit={exhibit} />
      ))}
      {section.subsections?.map((sub) => (
        <div key={sub.heading} id={sectionAnchor(sub.heading)} className="mt-10 scroll-mt-28 border-t border-navy/10 pt-8">
          <h3 className="mb-3 font-heading text-xl font-bold normal-case tracking-normal text-navy">{sub.heading}</h3>
          <ProseBlock paragraphs={sub.paragraphs} bullets={sub.bullets} />
          {sub.exhibits?.map((exhibit, exhibitIndex) => (
            <BlogExhibitBlock key={`${sub.heading}-${exhibit.kind}-${exhibitIndex}`} exhibit={exhibit} />
          ))}
        </div>
      ))}
      {midCtasForSection(post, section.heading).map((band) => (
        <MidArticleCta key={`${band.afterHeading}-${band.title}`} band={band} fallback={post.cta} />
      ))}
    </>
  );
}

type TocItem = { id: string; label: string; depth: 1 | 2; chapter?: number };

function buildToc(post: BlogPost): TocItem[] {
  const items: TocItem[] = [];
  post.sections.forEach((section, index) => {
    items.push({
      id: sectionAnchor(section.heading),
      label: section.heading,
      depth: 1,
      chapter: index + 1,
    });
    for (const sub of section.subsections ?? []) {
      items.push({ id: sectionAnchor(sub.heading), label: sub.heading, depth: 2 });
    }
  });
  items.push({ id: "faqs", label: "FAQs", depth: 1 });
  if (post.references && post.references.length > 0) {
    items.push({ id: "references", label: "References", depth: 1 });
  }
  return items;
}

function useActiveHash(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function DeepResearchBlogLayout({ post }: DeepResearchBlogLayoutProps) {
  const related = relatedPosts(post, post.template === "deep-research" ? 4 : 3);
  const { previous, next } = adjacentPosts(post);
  const toc = buildToc(post);
  const chapterCount = post.sections.length;
  const activeId = useActiveHash(toc.map((item) => item.id));

  return (
    <DeepResearchExhibitProvider>
      <div className="deep-research-blog">
        <header className="deep-masthead text-white">
          <div className="container mx-auto container-padding max-w-7xl pb-16 pt-10 md:pb-20 md:pt-12">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="line-clamp-1 text-white/90">{post.title}</li>
              </ol>
            </nav>

            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="rounded border border-cyan/50 bg-white/5 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-cyan">
                    Deep research
                  </span>
                  <span className="rounded border border-white/20 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-white/80">
                    {blogCategoryLabels[post.category]}
                  </span>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMinutes} min</span>
                  <span aria-hidden="true">·</span>
                  <span>{chapterCount} chapters</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.author}</span>
                </div>
                <h1 className="max-w-3xl text-3xl font-heading font-bold leading-tight normal-case tracking-normal text-white md:text-4xl lg:text-[2.75rem]">
                  {post.title}
                </h1>
                {post.subtitle ? (
                  <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-cyan">{post.subtitle}</p>
                ) : null}
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{post.summary}</p>
              </div>

              {post.heroImage ? (
                <div className="relative overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/30">
                  <ResponsiveImage
                    src={post.heroImage}
                    alt={post.heroAlt ?? `${post.title} | ZAFTYS Blog`}
                    aspectRatio="4/3"
                    objectFit="cover"
                    priority
                    className="rounded-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1C36]/50 to-transparent" />
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {post.kpis && post.kpis.length > 0 ? (
          <div className="container mx-auto container-padding relative z-10 max-w-7xl -mt-10 md:-mt-12">
            <div className="deep-kpi-band overflow-x-auto rounded-xl border border-navy/10 bg-white p-4 md:p-5">
              <div className="flex min-w-max gap-4 md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-3">
                {post.kpis.map((kpi) => (
                  <div key={kpi.label} className="w-40 shrink-0 md:w-auto">
                    <p className="deep-kpi-value inline-block pb-1 font-heading text-2xl font-bold normal-case tracking-normal text-navy">
                      {kpi.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-snug text-navy">{kpi.label}</p>
                    {kpi.detail ? (
                      <p className="mt-1 text-[11px] leading-snug text-navy/60 line-clamp-2">{kpi.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <article className="pb-16 pt-10 md:pb-24 md:pt-12">
          <div className="container mx-auto container-padding max-w-7xl">
            <div className="grid gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
              <aside className="hidden xl:block">
                <div className="sticky top-28 space-y-5">
                  <nav
                    aria-label="Chapters"
                    className="rounded-xl border border-navy/10 bg-white/90 p-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">Dossier chapters</p>
                    <ol className="mt-3 max-h-[46vh] space-y-1 overflow-y-auto pr-1">
                      {toc.map((item) => (
                        <li key={item.id} className={item.depth === 2 ? "pl-3" : ""}>
                          <a
                            href={`#${item.id}`}
                            className={cn(
                              "block rounded-md px-2 py-1.5 leading-snug transition-colors",
                              item.depth === 2 ? "text-[12px]" : "text-[13px]",
                              activeId === item.id
                                ? "bg-[var(--deep-cyan-soft)] font-semibold text-navy"
                                : "text-navy/75 hover:bg-navy/5 hover:text-navy",
                            )}
                          >
                            {item.chapter != null ? (
                              <span className="mr-1.5 font-heading text-[10px] font-bold text-[#0B7F8A]">
                                {String(item.chapter).padStart(2, "0")}
                              </span>
                            ) : null}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>

                  {post.references && post.references.length > 0 ? (
                    <div className="rounded-xl border border-navy/10 bg-white/80 p-4">
                      <p className="text-[10px] font-heading font-bold tracking-widest text-navy/50">Cited</p>
                      <ul className="mt-3 space-y-2 text-[11px] leading-snug text-navy/75">
                        {post.references.slice(0, 4).map((item) => (
                          <li key={item} className="line-clamp-2 border-l-2 border-cyan/60 pl-2">
                            {item.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#references"
                        className="mt-3 inline-block text-[12px] font-semibold text-[#0B7F8A] hover:underline"
                      >
                        Full reference list
                      </a>
                    </div>
                  ) : null}

                  {"to" in post.cta ? (
                    <div className="rounded-xl bg-navy p-4 text-white">
                      <p className="text-[10px] font-heading font-bold tracking-widest text-cyan">Next step</p>
                      <p className="mt-2 text-sm leading-snug text-white/85">{post.cta.label}</p>
                      <Link
                        to={post.cta.to}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-white hover:underline"
                      >
                        Continue <ArrowRight className="ml-1" size={14} />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </aside>

              <div>
                {post.takeaways && post.takeaways.length > 0 ? (
                  <aside className="mb-10 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
                    <div className="border-b border-navy/10 bg-navy px-5 py-3">
                      <p className="text-[10px] font-heading font-bold tracking-widest text-cyan">Key takeaways</p>
                    </div>
                    <ol className="grid gap-0 sm:grid-cols-2">
                      {post.takeaways.map((item, index) => (
                        <li
                          key={item}
                          className="flex gap-3 border-b border-navy/10 px-5 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                        >
                          <span className="font-heading text-sm font-bold text-[#0B7F8A]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-relaxed text-navy/90">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </aside>
                ) : null}

                <nav
                  aria-label="On this page"
                  className="mb-10 rounded-xl border border-navy/10 bg-white p-4 xl:hidden"
                >
                  <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">Chapters</p>
                  <ol className="mt-3 columns-1 gap-x-6 sm:columns-2">
                    {toc.map((item) => (
                      <li key={item.id} className="mb-1.5 break-inside-avoid">
                        <a href={`#${item.id}`} className="text-sm text-[#0B7F8A] hover:underline">
                          {item.chapter != null ? `${String(item.chapter).padStart(2, "0")} ` : ""}
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="space-y-8">
                  {post.sections.map((section, sectionIndex) => (
                    <section
                      key={section.heading}
                      id={sectionAnchor(section.heading)}
                      className="deep-chapter-spine scroll-mt-28 rounded-r-xl rounded-l-sm border border-navy/10 border-l-0 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10"
                    >
                      <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">
                        Chapter {String(sectionIndex + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mb-5 font-heading text-2xl font-bold normal-case tracking-normal text-navy md:text-[1.75rem]">
                        {section.heading}
                      </h2>
                      <SectionBody section={section} post={post} />
                    </section>
                  ))}
                </div>

                <div
                  id="faqs"
                  className="deep-chapter-spine mt-8 scroll-mt-28 rounded-r-xl rounded-l-sm border border-navy/10 border-l-0 bg-white px-5 py-8 shadow-sm md:px-8"
                >
                  <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">Appendix</p>
                  <h2 className="mb-6 font-heading text-xl font-bold normal-case tracking-normal text-navy">
                    Frequently asked questions
                  </h2>
                  <div className="max-w-3xl space-y-3">
                    {post.faqs.map((faq) => (
                      <div key={faq.question} className="border-b border-navy/10 pb-4 last:border-b-0">
                        <h3 className="mb-2 font-heading text-sm font-bold normal-case tracking-normal text-navy">
                          {faq.question}
                        </h3>
                        <p className="text-sm leading-relaxed text-navy/85">
                          <RichText text={faq.answer} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {post.references && post.references.length > 0 ? (
                  <div
                    id="references"
                    className="mt-8 scroll-mt-28 rounded-xl border border-dashed border-navy/25 bg-[#dfe7f0]/60 px-5 py-8 md:px-8"
                  >
                    <p className="text-[10px] font-heading font-bold tracking-widest text-[#0B7F8A]">Sources</p>
                    <h2 className="mb-3 font-heading text-xl font-bold normal-case tracking-normal text-navy">
                      References and data sources
                    </h2>
                    <p className="mb-5 max-w-3xl text-sm leading-relaxed text-navy/70">
                      Public sources below are for orientation. They are not ZAFTYS audited financials. Read the
                      originals before a number goes into a board pack.
                    </p>
                    <ol className="max-w-3xl space-y-2 font-mono text-[12px] leading-relaxed text-navy/85">
                      {post.references.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="shrink-0 text-[#0B7F8A]">[{index + 1}]</span>
                          <span>
                            <RichText text={item} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {related.length > 0 ? (
                  <div className="mt-10">
                    <h2 className="mb-5 font-heading text-xl font-bold normal-case tracking-normal text-navy">
                      Related reading
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {related.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/blog/${item.slug}`}
                          className="overflow-hidden rounded-lg border border-navy/10 bg-white transition-colors hover:border-cyan/50"
                        >
                          {item.heroImage ? (
                            <ResponsiveImage
                              src={item.heroImage}
                              alt=""
                              aspectRatio="16/9"
                              objectFit="cover"
                              className="rounded-none"
                            />
                          ) : null}
                          <span className="block p-4">
                            <span className="text-[10px] uppercase tracking-wide text-[#0B7F8A]">
                              {blogCategoryLabels[item.category]}
                            </span>
                            <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal">
                              {item.title}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {previous || next ? (
                  <nav aria-label="Adjacent posts" className="mt-10 grid gap-4 sm:grid-cols-2">
                    {previous ? (
                      <Link
                        to={`/blog/${previous.slug}`}
                        className="group flex gap-4 rounded-xl border border-navy/10 bg-white p-4 transition-colors hover:border-cyan/50"
                      >
                        <ArrowLeft className="mt-1 shrink-0 text-navy/40 group-hover:text-[#0B7F8A]" size={20} />
                        <span>
                          <span className="text-[10px] font-heading font-bold tracking-widest text-navy/45">
                            Previous
                          </span>
                          <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal group-hover:text-[#0B7F8A]">
                            {previous.title}
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                    {next ? (
                      <Link
                        to={`/blog/${next.slug}`}
                        className="group flex gap-4 rounded-xl border border-navy/10 bg-white p-4 text-right transition-colors hover:border-cyan/50 sm:ml-auto sm:flex-row-reverse"
                      >
                        <ArrowRight className="mt-1 shrink-0 text-navy/40 group-hover:text-[#0B7F8A]" size={20} />
                        <span>
                          <span className="text-[10px] font-heading font-bold tracking-widest text-navy/45">Next</span>
                          <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-navy normal-case tracking-normal group-hover:text-[#0B7F8A]">
                            {next.title}
                          </span>
                        </span>
                      </Link>
                    ) : null}
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        </article>

        <section className="section-padding bg-navy text-white">
          <div className="container mx-auto container-padding max-w-3xl text-center">
            <p className="mb-3 text-[10px] font-heading font-bold tracking-widest text-cyan">Deep research next step</p>
            <h2 className="mb-4 font-heading text-3xl font-bold normal-case tracking-normal">Need trucks first?</h2>
            <p className="mb-8 text-gray-300">
              Most readers need corridor capacity, not a new login. Share your gateway, inland plant, container mix, and
              weekly volume on the contact form. We place trailers as your transport partner. Need software or a load
              board afterward? Use the links below.
            </p>
            <CTAGroup>
              <PostCta cta={post.cta} onDark />
              <Link to="/zaftys-tms">
                <Button size="lg" variant="on-dark-outline">
                  Explore ZAFTYS TMS
                </Button>
              </Link>
              <Link to="/tranzfort-network">
                <Button size="lg" variant="on-dark-outline">
                  Explore TranZfort
                </Button>
              </Link>
            </CTAGroup>
            <p className="mt-6 text-sm text-white/55">
              Or return to the{" "}
              <Link to="/blog" className="font-semibold text-cyan hover:underline">
                blog index
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </DeepResearchExhibitProvider>
  );
}
