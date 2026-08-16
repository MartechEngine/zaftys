import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { getPostBySlug, postModifiedAt } from "@/lib/blog-data";
import { blogPostingSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import NotFound from "@/pages/NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const image = post.heroImage ?? "/og-image.png";
  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.seoTitle, path: `/blog/${post.slug}` },
    ]),
    blogPostingSchema(post),
    faqPageSchema(post.faqs),
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={post.seoTitle}
        description={post.seoDescription}
        canonical={`/blog/${post.slug}`}
        image={image}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={postModifiedAt(post)}
        schema={schema}
      />
      <BlogPostLayout post={post} />
    </div>
  );
};

export default BlogPost;
