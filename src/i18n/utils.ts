import en from './en.json';
import id from './id.json';

const translations = { en, id };

export type Locale = 'en' | 'id';

export function t(key: string, locale: Locale = 'en'): string {
    const dict = translations[locale] || translations.en;
    return (dict as Record<string, string>)[key] || key;
}

export function getLocaleFromUrl(url: URL): Locale {
    const [, locale] = url.pathname.split('/');
    if (locale === 'id') return 'id';
    return 'en';
}

export function getAlternateLocale(locale: Locale): Locale {
    return locale === 'en' ? 'id' : 'en';
}

export function localePath(path: string, locale: Locale): string {
    const cleanPath = path.replace(/^\/(en|id)/, '');
    return `/${locale}${cleanPath || '/'}`;
}
