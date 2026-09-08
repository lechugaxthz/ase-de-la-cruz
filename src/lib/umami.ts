export function initUmami(): void {
  const websiteId = import.meta.env.UMAMI_WEBSITE_ID;
  const scriptUrl = import.meta.env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

  if (!websiteId) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = scriptUrl;
  script.dataset.websiteId = websiteId;
  script.async = true;
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, eventData?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
}
