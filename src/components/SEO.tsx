/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  tool?: any;
}

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  tool = null,
}: SEOProps) {
  const siteTitle = "CodeInStock";
  const fullTitle = title
    ? `${title} | ${siteTitle}`
    : `${siteTitle} - Free JavaScript Utilities & Code Snippets`;
  const siteUrl = "https://codeinstock.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage =
    "https://pbs.twimg.com/profile_images/1969666936922652674/DSzSGeuL_400x400.jpg";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      <meta name="author" content="CodeInStock" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="CodeInStock" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CodeinStock" />
      <meta name="twitter:creator" content="@CodeinStock" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#f59e0b" />

      {/* Tool-specific structured data */}
      {tool && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            softwareVersion: "1.0",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "CodeInStock",
              url: "https://codeinstock.com",
            },
          })}
        </script>
      )}
    </Helmet>
  );
}
