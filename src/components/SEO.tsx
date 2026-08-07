import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  /** ISO date — blog article published */
  publishedTime?: string;
  /** ISO date — blog article modified */
  modifiedTime?: string;
}

const BASE_URL = "https://zaftys.com";
const SITE_TITLE = "ZAFTYS Logistics";
const DEFAULT_OG_IMAGE = "/og-image.png";

const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  schema,
  noindex = false,
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const fullTitle = title === SITE_TITLE ? title : `${title} | ${SITE_TITLE}`;
  const currentUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={currentUrl} />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={noindex ? BASE_URL : currentUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {(Array.isArray(schema) ? schema : schema ? [schema] : []).map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
