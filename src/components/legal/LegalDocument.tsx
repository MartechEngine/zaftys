import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { companyAddress } from "@/lib/constants";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalNavItem = { label: string; path: string };

const defaultNav: LegalNavItem[] = [
  { label: "Terms", path: "/terms" },
  { label: "Privacy", path: "/privacy" },
  { label: "Cookies", path: "/cookies" },
  { label: "Legal notice", path: "/legal-notice" },
];

type LegalDocumentProps = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  version?: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  activePath: string;
};

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return <p>{block.text}</p>;
  }
  if (block.type === "h3") {
    return <h3 className="text-navy font-bold mt-6 mb-3 text-lg">{block.text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc pl-6 mb-4 space-y-2">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="list-decimal pl-6 mb-4 space-y-2">
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default function LegalDocument({
  title,
  seoTitle,
  seoDescription,
  canonical,
  version = "1.1",
  lastUpdated,
  intro,
  sections,
  activePath,
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-background font-sans pt-32 pb-20">
      <SEO title={seoTitle} description={seoDescription} canonical={canonical} />
      <div className="container mx-auto container-padding max-w-4xl">
        <nav aria-label="Legal documents" className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-8 border-b border-border pb-4">
          {defaultNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                activePath === item.path
                  ? "font-semibold text-navy"
                  : "text-muted-foreground hover:text-navy transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h1 className="text-4xl font-heading font-bold mb-3 text-navy">{title}</h1>
        <p className="text-sm text-muted-foreground mb-2">
          Last Updated: {lastUpdated} · Document version {version}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          ZAFTYS Logistics · {companyAddress.line1}, {companyAddress.line2}, {companyAddress.line3}
        </p>

        {intro ? <p className="text-muted-foreground mb-8 leading-relaxed">{intro}</p> : null}

        <div className="prose prose-lg max-w-none text-muted-foreground">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-navy font-bold mt-10 mb-4 text-xl font-heading">{section.title}</h2>
              {section.blocks.map((block, i) => (
                <Block key={`${section.id}-${i}`} block={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
