import { createContext } from 'react';
import type { SiteContent } from '../content/types';
import type { Locale } from './locales';

export interface LocaleContextValue {
  readonly locale: Locale;
  readonly dir: 'ltr' | 'rtl';
  readonly content: SiteContent;
  readonly setLocale: (locale: Locale) => void;
  /** Switches to the other locale. There are exactly two, so this is total. */
  readonly toggleLocale: () => void;
}

/**
 * Undefined rather than a default value: a component rendered outside the
 * provider is a bug, and `useLocale` throws rather than silently serving
 * English.
 */
export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
