import { siteConfig } from "@/config/site.config";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export function generateSEO(props: SEOProps = {}): SEOMetadata {
  const title = props.title ? `${props.title} | ${siteConfig.name}` : siteConfig.title;
  const description = props.description || siteConfig.description;
  const image = props.image || siteConfig.ogImage;
  const url = props.url || siteConfig.url;

  return {
    title,
    description,
    canonical: url,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  };
}

/**
 * Helper to generate proper HTML head tags for Astro
 * Use with <set:html> in layout
 */
export function generateSEOTags(seo: SEOMetadata): string {
  return `
    <meta name="description" content="${seo.description}">
    <link rel="canonical" href="${seo.canonical}">
    <meta property="og:title" content="${seo.ogTitle}">
    <meta property="og:description" content="${seo.ogDescription}">
    <meta property="og:image" content="${seo.ogImage}">
    <meta property="og:url" content="${seo.ogUrl}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="${seo.twitterCard}">
    <meta name="twitter:title" content="${seo.twitterTitle}">
    <meta name="twitter:description" content="${seo.twitterDescription}">
    <meta name="twitter:image" content="${seo.twitterImage}">
  `.trim();
}
