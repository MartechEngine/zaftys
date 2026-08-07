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
import { blogPageSchema } from "@/lib/schema";
import {
  type BlogCategory,
  blogCategoryLabels,
  formatPostDate,
  listPosts,
} from "@/lib/blog-data";
import { useToast } from "@/hooks/use-toast";

const categoryFilters: Array<"all" | BlogCategory> = ["all", "operations", "industries", "technology"];

const Blog = () => {
  const posts = useMemo(() => listPosts(), []);
  const [filter, setFilter] = useState<"all" | BlogCategory>("all");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const handleNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
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
        schema={blogPageSchema}
      />

      <PageHero
        badge="Blog"
        title="Practical logistics knowledge from ZAFTYS Logistics operations"
        description="Guides on industrial FTL, plant windows, steel and cement freight, and what matters in a heavy-haul TMS — written for shippers and operators who plan real trips."
        imageSrc={heroResources}
        imageAlt={pageHeroAlts.resources}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <a href="#posts">
            <Button size="lg" variant="on-dark">
              Browse posts
            </Button>
          </a>
          <WhatsAppButton label="Ask on WhatsApp" tone="on-dark-outline" />
        </CTAGroup>
      </PageHero>

      <section id="posts" className="section-padding bg-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categoryFilters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                  filter === key
                    ? "bg-primary text-white"
                    : "bg-muted text-navy hover:bg-muted/80"
                }`}
              >
                {key === "all" ? "All" : blogCategoryLabels[key]}
              </button>
            ))}
          </div>

          {featured ? (
            <Link
              to={`/blog/${featured.slug}`}
              className="block mb-12 group rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {featured.heroImage ? (
                  <ResponsiveImage
                    src={featured.heroImage}
                    alt={`${featured.title} — ZAFTYS Blog`}
                    aspectRatio="16/10"
                    objectFit="cover"
                    className="h-full min-h-[220px]"
                  />
                ) : (
                  <div className="bg-muted min-h-[220px]" />
                )}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <Badge variant="outline" className="uppercase tracking-wide text-[10px]">
                      Featured · {blogCategoryLabels[featured.category]}
                    </Badge>
                    <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
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
            <p className="text-center text-muted-foreground mb-12">No posts in this category yet.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Card key={post.slug} className="border-none shadow-sm hover:shadow-md transition-shadow h-full bg-white">
                <CardContent className="p-0 flex flex-col h-full">
                  {post.heroImage ? (
                    <ResponsiveImage
                      src={post.heroImage}
                      alt={`${post.title} — ZAFTYS Blog`}
                      aspectRatio="16/10"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
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
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.summary}</p>
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

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-3">Stay updated</h2>
          <p className="text-muted-foreground mb-6">
            Occasional operational notes and company updates — no spam.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
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
          <WhatsAppButton label="Talk to our team" />
          <p className="mt-8 text-sm text-muted-foreground">
            Explore{" "}
            <Link to="/services" className="text-primary hover:underline">services</Link>
            {", "}
            <Link to="/technology" className="text-primary hover:underline">ZAFTYS TMS</Link>
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
