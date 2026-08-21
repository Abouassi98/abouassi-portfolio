import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { LocaleProvider } from '../i18n/LocaleProvider';
import type { Locale } from '../i18n/locales';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  readonly locale?: Locale;
}

/**
 * Renders inside a `LocaleProvider` pinned to an explicit locale, so no test
 * depends on `navigator.language` or on what a previous test wrote to storage.
 */
export function renderWithLocale(ui: ReactElement, { locale = 'en', ...options }: Options = {}): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>,
    ...options,
  });
}
