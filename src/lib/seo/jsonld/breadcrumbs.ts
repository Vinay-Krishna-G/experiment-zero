import { SITE_SETTINGS } from "@/content";
const SITE_URL = SITE_SETTINGS.siteUrl;

export function buildBreadcrumbSchema(items: { name: string; item?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.item ? { "item": `${SITE_URL}${item.item}` } : {}),
    })),
  };
}
