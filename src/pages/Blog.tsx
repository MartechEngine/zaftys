import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import heroResources from "@/assets/hero-resources.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { blogPageSchema, breadcrumbSchema } from "@/lib/schema";
import {
  type BlogCategory,
  type BlogPost,
  blogCategoryLabels,
  formatPostDate,
  listPosts,
  pickFeaturedPost,
} from "@/lib/blog-data";
import { useToast } from "@/hooks/use-toast";
import { subscribeNewsletter } from "@/lib/newsletter";
import { SUBSCRIBERS_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BlogFilter = "all" | "deep-research" | BlogCategory;

const categoryFilters: Array<{ key: BlogFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "deep-research", label: "Deep research" },
  { key: "operations", label: "Operations" },
  { key: "industries", label: "Industries" },
  { key: "technology", label: "Technology" },
];

function isDeepResearch(post: BlogPost): boolean {
  return post.template === "deep-research";
}

const Blog = () => {
  const posts = useMemo(() => listPosts(), []);
  const [filter, setFilter] = useState<BlogFilter>("all");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    if (filter === "deep-research") return posts.filter(isDeepResearch);
    return posts.filter((p) => p.category === filter);
  }, [filter, posts]);
  const featured = useMemo(() => pickFeaturedPost(filtered), [filtered]);
  const rest = useMemo(
    () => (featured ? filtered.filter((post) => post.slug !== featured.slug) : filtered),
    [filtered, featured],
  );

  const handleNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const result = await subscribeNewsletter(email, "blog");
      if (result.success) {
        toast({ title: "Subscribed", description: "You have been added to our newsletter list." });
        setEmail("");
      } else {
        throw new Error(result.error || "Subscription failed");
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not subscribe you right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.blog.title}
        description={pageSeo.blog.description}
        canonical="/blog"
        schema={[
          blogPageSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHero
        badge={pageHeroCopy.blog.badge}
        title={pageHeroCopy.blog.h1}
        description={pageHeroCopy.blog.lead}
        imageSrc={heroResources}
        imageAlt={pageHeroAlts.resources}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <a href="#posts">
            <Button size="lg" variant="on-dark">
              Browse posts
            </Button>
          </a>
            <WhatsAppButton label="Ask on WhatsApp" />
        </CTAGroup>
      </PageHero>

      <section id="posts" className="section-padding bg-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categoryFilters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
                  filter === key
                    ? key === "deep-research"
                      ? "bg-navy text-white ring-2 ring-cyan/60 ring-offset-2"
                      : "bg-primary text-white"
                    : key === "deep-research"
                      ? "bg-[hsl(190_80%_92%)] text-navy border border-cyan/40 hover:bg-[hsl(190_80%_88%)]"
                      : "bg-muted text-navy hover:bg-muted/80",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {featured ? (
            <Link
              to={`/blog/${featured.slug}`}
              className={cn(
                "block mb-12 group border overflow-hidden transition-colors",
                isDeepResearch(featured)
                  ? "border-cyan/40 hover:border-cyan/70 bg-[#F4F9FB]"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {featured.heroImage ? (
                  <ResponsiveImage
                    src={featured.heroImage}
                    alt={`${featured.title} | ZAFTYS Blog`}
                    aspectRatio="16/10"
                    objectFit="cover"
                    className="h-full min-h-[220px]"
                  />
                ) : (
                  <div className="bg-muted min-h-[220px]" />
                )}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                    {isDeepResearch(featured) ? (
                      <Badge className="bg-navy text-cyan uppercase tracking-wide text-[10px] hover:bg-navy">
                        Deep research
                      </Badge>
                    ) : null}
                    <Badge variant="outline" className="uppercase tracking-wide text-[10px]">
                      Featured · {blogCategoryLabels[featured.category]}
                    </Badge>
                    <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
                    {isDeepResearch(featured) ? (
                      <span className="text-xs text-[#0B7F8A] font-semibold">{featured.sections.length} chapters</span>
                    ) : null}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{featured.summary}</p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">
                    Read more <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-center text-muted-foreground mb-12">
              {filter === "deep-research" ? "No deep research posts yet." : "No posts in this category yet."}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Card
                key={post.slug}
                className={cn(
                  "shadow-sm hover:shadow-md transition-shadow h-full bg-white",
                  isDeepResearch(post) ? "border border-cyan/35" : "border-none",
                )}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {post.heroImage ? (
                    <div className="relative">
                      <ResponsiveImage
                        src={post.heroImage}
                        alt={`${post.title} | ZAFTYS Blog`}
                        aspectRatio="16/10"
                        objectFit="cover"
                        className="rounded-t-xl"
                      />
                      {isDeepResearch(post) ? (
                        <span className="absolute left-3 top-3 rounded bg-navy px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-cyan shadow-sm">
                          Deep research
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
                      {isDeepResearch(post) && !post.heroImage ? (
                        <Badge className="bg-navy text-cyan uppercase tracking-wide text-[10px] hover:bg-navy">
                          Deep research
                        </Badge>
                      ) : null}
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                        {blogCategoryLabels[post.category]}
                      </Badge>
                      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    </div>
                    <h3 className="font-heading font-bold text-navy mb-2 leading-snug">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-4">{post.summary}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary font-semibold text-sm"
                    >
                      Read more <ArrowRight className="ml-2" size={14} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container mx-auto container-padding max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-3">Stay updated</h2>
          <p className="text-muted-foreground mb-6">
            Occasional operational notes and company updates. No spam.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-2">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Button type="submit" variant="accent" className="h-12 px-8 shrink-0" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mb-8">
            Unsubscribe anytime at {SUBSCRIBERS_EMAIL}.
          </p>
          <WhatsAppButton label="Talk to our team" />
          <p className="mt-8 text-sm text-muted-foreground">
            Explore{" "}
            <Link to="/reports" className="text-primary hover:underline">market reports</Link>
            {", "}
            <Link to="/services" className="text-primary hover:underline">services</Link>
            {", "}
            <Link to="/zaftys-tms" className="text-primary hover:underline">ZAFTYS TMS</Link>
            {", "}
            <Link to="/tranzfort-network" className="text-primary hover:underline">TranZfort</Link>
            {", "}
            <Link to="/industries" className="text-primary hover:underline">industries</Link>
            {", or "}
            <Link to="/contact" className="text-primary hover:underline">contact ZAFTYS Logistics</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
