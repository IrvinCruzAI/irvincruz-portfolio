import { Config } from '../types';

export function generateStructuredData(config: Config) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": config.personal.name,
    "description": config.personal.bio,
    "jobTitle": config.personal.tagline,
    "email": config.personal.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": config.personal.location
    },
    "sameAs": config.socialLinks.map(link => link.url),
    "worksFor": config.businesses.map(business => ({
      "@type": "Organization",
      "name": business.name,
      "url": business.url
    })),
    "image": config.personal.photo,
    "url": typeof window !== 'undefined' ? window.location.origin : ''
  };
}

export function updateMetaTags(config: Config) {
  if (typeof document === 'undefined') return;
  
  // Update title
  document.title = config.seo.title;
  
  // Update meta tags
  const metaTags = [
    { name: 'description', content: config.seo.description },
    { name: 'keywords', content: config.seo.keywords.join(', ') },
    { property: 'og:title', content: config.seo.title },
    { property: 'og:description', content: config.seo.description },
    { property: 'og:image', content: config.seo.ogImage },
    { property: 'og:type', content: 'profile' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.seo.title },
    { name: 'twitter:description', content: config.seo.description },
    { name: 'twitter:image', content: config.seo.ogImage }
  ];
  
  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  });
}