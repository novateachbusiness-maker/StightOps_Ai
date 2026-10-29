/**
 * SEO & Structured Data (JSON-LD) Utility Functions
 * Conforms to Schema.org standards without fabricated ratings or false review markup.
 */

import { SITE_CONFIG } from '../config/site.ts';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "alternateName": "SightOpsAi Machine Vision",
    "description": SITE_CONFIG.subheadline,
    "url": SITE_CONFIG.domain.startsWith("http") ? SITE_CONFIG.domain : "https://sightops.ai",
    "email": SITE_CONFIG.contactEmail,
    "telephone": SITE_CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${SITE_CONFIG.address.line1}, ${SITE_CONFIG.address.line2}`,
      "addressLocality": SITE_CONFIG.address.city,
      "addressRegion": SITE_CONFIG.address.state,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": "IN"
    },
    "sameAs": [
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.youtube,
      SITE_CONFIG.socials.github
    ],
    "knowsAbout": [
      "Industrial Vision Systems",
      "Automated Optical Inspection",
      "PCB Inspection",
      "Machine Vision Optics",
      "Defect Detection AI",
      "Optical Character Recognition (OCR)",
      "Telecentric Dimensional Metrology"
    ]
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseDomain = SITE_CONFIG.domain.startsWith("http") ? SITE_CONFIG.domain : "https://sightops.ai";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${baseDomain}${item.url}`
    }))
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  const baseDomain = SITE_CONFIG.domain.startsWith("http") ? SITE_CONFIG.domain : "https://sightops.ai";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "serviceType": service.category,
    "description": service.description,
    "url": service.url.startsWith("http") ? service.url : `${baseDomain}${service.url}`,
    "provider": {
      "@type": "Organization",
      "name": SITE_CONFIG.name
    },
    "areaServed": "Global B2B Manufacturing"
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  tags?: string[];
}) {
  const baseDomain = SITE_CONFIG.domain.startsWith("http") ? SITE_CONFIG.domain : "https://sightops.ai";
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "url": article.url.startsWith("http") ? article.url : `${baseDomain}${article.url}`,
    "author": {
      "@type": "Organization",
      "name": `${SITE_CONFIG.name} Engineering Team`
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name
    },
    "keywords": article.tags ? article.tags.join(", ") : undefined
  };
}
