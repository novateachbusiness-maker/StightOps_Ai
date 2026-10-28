import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site.ts';

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object | object[];
}

export function SeoHead({ title, description, canonicalPath, jsonLd }: SeoProps) {
  useEffect(() => {
    // Update Title
    const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Canonical URL
    const domain = SITE_CONFIG.domain.startsWith('http') ? SITE_CONFIG.domain : 'https://stightops.ai';
    const canonicalUrl = canonicalPath ? `${domain}${canonicalPath}` : domain;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Update Structured Data JSON-LD
    const scriptId = 'stightops-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, jsonLd]);

  return null;
}
