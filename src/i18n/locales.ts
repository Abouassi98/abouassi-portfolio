import type { SiteContent } from '../content/types';
import { en } from '../content/en';
import { ar } from '../content/ar';

export const LOCALES = ['en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

/** Narrows an untrusted string (localStorage, query param) to a Locale. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

interface LocaleDefinition {
  readonly content: SiteContent;
  readonly dir: 'ltr' | 'rtl';
  /** BCP 47 tag for `<html lang>`. */
  readonly htmlLang: string;
}

export const localeRegistry: Readonly<Record<Locale, LocaleDefinition>> = {
  en: { content: en, dir: 'ltr', htmlLang: 'en' },
  ar: { content: ar, dir: 'rtl', htmlLang: 'ar' },
};

export const STORAGE_KEY = 'abouassi-portfolio.locale';

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * The locale to start on, in priority order: an explicit past choice, then the
 * browser's preference, then English.
 *
 * `localStorage` is read inside try/catch because Safari throws on access in
 * private browsing rather than returning null — an exception here would take
 * the whole app down before first paint.
 */
export function resolveInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage unavailable; fall through to the browser preference.
  }
  const preferred = typeof navigator === 'undefined' ? undefined : navigator.language;
  if (preferred?.toLowerCase().startsWith('ar')) return 'ar';
  return DEFAULT_LOCALE;
}
