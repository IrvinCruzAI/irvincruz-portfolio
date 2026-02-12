export function getFaviconUrl(domain: string): string {
  // Extract domain from URL if full URL is provided
  try {
    const url = new URL(domain.startsWith('http') ? domain : `https://${domain}`);
    return `https://www.google.com/s2/favicons?sz=64&domain=${url.hostname}`;
  } catch {
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  }
}

export function preloadFavicons(domains: string[]) {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getFaviconUrl(domain);
    link.as = 'image';
    document.head.appendChild(link);
  });
}