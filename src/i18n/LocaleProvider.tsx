import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LocaleContext, type LocaleContextValue } from './context';
import {
  STORAGE_KEY,
  localeRegistry,
  resolveInitialLocale,
  type Locale,
} from './locales';

interface LocaleProviderProps {
  readonly children: ReactNode;
  /** Tests pass a fixed locale instead of depending on storage or navigator. */
  readonly initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  // Resolved in the initialiser, not an effect, so the first render is already
  // in the right locale and there is no flash of the wrong direction.
  const [locale, setLocale] = useState<Locale>(() => initialLocale ?? resolveInitialLocale());

  useEffect(() => {
    const { dir, htmlLang } = localeRegistry[locale];
    const root = document.documentElement;
    root.setAttribute('dir', dir);
    root.setAttribute('lang', htmlLang);
  }, [locale]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Storage unavailable. The choice holds for this session either way.
    }
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'en' ? 'ar' : 'en'));
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const definition = localeRegistry[locale];
    return {
      locale,
      dir: definition.dir,
      content: definition.content,
      setLocale,
      toggleLocale,
    };
  }, [locale, toggleLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
