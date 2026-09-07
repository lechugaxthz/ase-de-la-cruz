export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(date: Date | string, locale = 'es-AR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function readingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    salud: 'Salud',
    vida: 'Vida y Ahorro',
    hogar: 'Hogar',
    vehicular: 'Automotores',
    empresas: 'Empresas',
    art: 'ART',
    consejos: 'Consejos',
    noticias: 'Noticias',
    guias: 'Guías',
  };
  return labels[category] || category;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    salud: 'favorite',
    vida: 'heart_pulse',
    hogar: 'home',
    vehicular: 'directions_car',
    empresas: 'business',
    art: 'shield',
    consejos: 'lightbulb',
    noticias: 'article',
    guias: 'menu_book',
  };
  return icons[category] || 'article';
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}