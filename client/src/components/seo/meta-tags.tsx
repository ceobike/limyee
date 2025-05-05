import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCanonicalUrl } from '@/lib/url-utils';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: string;
  noindex?: boolean;
}

/**
 * SEO Meta Tags component for optimizing page metadata
 */
export function MetaTags({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false
}: MetaTagsProps) {
  const router = useRouter();
  const canonicalUrl = getCanonicalUrl(router.asPath);
  const defaultOgImage = '/images/og-image.jpg'; // Default Open Graph image
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
    </Head>
  );
}
