import { Helmet } from 'react-helmet-async';
import type { SEOData } from '@/types';

interface SEOHeadProps extends SEOData {
  /** Additional meta tags or link elements to include in the head. */
  children?: React.ReactNode;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard,
  structuredData,
  children,
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {children}
    </Helmet>
  );
}

export default SEOHead;

