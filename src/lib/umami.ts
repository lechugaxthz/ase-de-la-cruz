declare global {
  interface Window {
    umami: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
  }
}

export function track(eventName: string, eventData?: Record<string, string | number | boolean>): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami(eventName, eventData);
  }
}

export function trackPageView(url?: string): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.trackView(url || window.location.pathname);
  }
}

export const ANALYTICS_EVENTS = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CTA_CLICK: 'cta_click',
  SERVICE_CARD_CLICK: 'service_card_click',
  SERVICE_FILTER: 'service_filter',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  BLOG_POST_READ: 'blog_post_read',
  BLOG_SHARE: 'blog_share',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
} as const;

export function trackContactFormSubmit(interest: string): void {
  track(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, { interest });
}

export function trackContactFormSuccess(interest: string): void {
  track(ANALYTICS_EVENTS.CONTACT_FORM_SUCCESS, { interest });
}

export function trackContactFormError(interest: string, error: string): void {
  track(ANALYTICS_EVENTS.CONTACT_FORM_ERROR, { interest, error });
}

export function trackCTAClick(ctaName: string, location: string): void {
  track(ANALYTICS_EVENTS.CTA_CLICK, { cta: ctaName, location });
}

export function trackServiceCardClick(serviceName: string, category: string): void {
  track(ANALYTICS_EVENTS.SERVICE_CARD_CLICK, { service: serviceName, category });
}

export function trackServiceFilter(category: string): void {
  track(ANALYTICS_EVENTS.SERVICE_FILTER, { category });
}

export function trackPhoneClick(phone: string): void {
  track(ANALYTICS_EVENTS.PHONE_CLICK, { phone });
}

export function trackEmailClick(email: string): void {
  track(ANALYTICS_EVENTS.EMAIL_CLICK, { email });
}

export function trackWhatsAppClick(phone: string): void {
  track(ANALYTICS_EVENTS.WHATSAPP_CLICK, { phone });
}

export function trackBlogPostRead(slug: string, category: string): void {
  track(ANALYTICS_EVENTS.BLOG_POST_READ, { slug, category });
}

export function trackBlogShare(platform: string, slug: string): void {
  track(ANALYTICS_EVENTS.BLOG_SHARE, { platform, slug });
}