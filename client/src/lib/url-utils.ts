/**
 * URL utilities for SEO-friendly URLs
 */

/**
 * Convert a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

/**
 * Generate a product URL from product data
 * @param product The product object
 * @returns SEO-friendly product URL
 */
export function getProductUrl(product: { id: number | string; name: string }): string {
  return `/products/${slugify(product.name)}`;
}

/**
 * Extract product ID from a product URL slug
 * @param slug The product URL slug
 * @returns The product ID
 */
export function getProductIdFromSlug(slug: string): string {
  // In a pure slug implementation, we would need to query the database
  // For now, we'll just return the slug itself
  return slug;
}

/**
 * Generate a solution URL from solution data
 * @param solution The solution object
 * @returns SEO-friendly solution URL
 */
export function getSolutionUrl(solution: { id: number | string; title: string }): string {
  return `/solutions/${slugify(solution.title)}`;
}

/**
 * Extract solution ID from a solution URL slug
 * @param slug The solution URL slug
 * @returns The solution ID
 */
export function getSolutionIdFromSlug(slug: string): string {
  // In a pure slug implementation, we would need to query the database
  // For now, we'll just return the slug itself
  return slug;
}

/**
 * Generate a news URL from news data
 * @param newsItem The news object
 * @returns SEO-friendly news URL
 */
export function getNewsUrl(newsItem: { id: number | string; title: string }): string {
  return `/news/${slugify(newsItem.title)}`;
}

/**
 * Extract news ID from a news URL slug
 * @param slug The news URL slug
 * @returns The news ID
 */
export function getNewsIdFromSlug(slug: string): string {
  // In a pure slug implementation, we would need to query the database
  // For now, we'll just return the slug itself
  return slug;
}

/**
 * Generate a download URL from download data
 * @param download The download object
 * @returns SEO-friendly download URL
 */
export function getDownloadUrl(download: { id: number | string; title: string }): string {
  return `/downloads/${slugify(download.title)}`;
}

/**
 * Extract download ID from a download URL slug
 * @param slug The download URL slug
 * @returns The download ID
 */
export function getDownloadIdFromSlug(slug: string): string {
  // In a pure slug implementation, we would need to query the database
  // For now, we'll just return the slug itself
  return slug;
}

/**
 * Generate a canonical URL for the current page
 * @param path The current path
 * @returns The canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.limyee.com';
  return `${baseUrl}${path}`;
}

/**
 * Generate structured data for a product
 * @param product The product object
 * @returns Structured data JSON-LD
 */
export function getProductStructuredData(product: any): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.imageUrl,
    sku: product.model,
    brand: {
      '@type': 'Brand',
      name: 'Limyee'
    }
  };
  
  return JSON.stringify(structuredData);
}

/**
 * Generate structured data for an article (news)
 * @param article The article object
 * @returns Structured data JSON-LD
 */
export function getArticleStructuredData(article: any): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.imageUrl,
    datePublished: article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Limyee'
    }
  };
  
  return JSON.stringify(structuredData);
}
