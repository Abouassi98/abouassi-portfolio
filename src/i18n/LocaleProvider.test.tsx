import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocaleProvider } from './LocaleProvider';
import { STORAGE_KEY, isLocale, resolveInitialLocale } from './locales';
import { useLocale } from './useLocale';

function Probe() {
  const { locale, dir, content, toggleLocale, setLocale } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="dir">{dir}</span>
      <span data-testid="name">{content.profile.name}</span>
      <button type="button" onClick={toggleLocale}>toggle</button>
      <button type="button" onClick={() => { setLocale('ar'); }}>go arabic</button>
    </div>
  );
}

function renderProbe(initialLocale?: 'en' | 'ar') {
  return render(
    <LocaleProvider initialLocale={initialLocale}>
      <Probe />
    </LocaleProvider>,
  );
}

describe('isLocale', () => {
  it.each(['en', 'ar'])('accepts %s', (value) => { expect(isLocale(value)).toBe(true); });
  it.each([['fr'], [''], [null], [undefined], [42], [{}]])('rejects %s', (value) => {
    expect(isLocale(value)).toBe(false);
  });

});

describe('LocaleProvider', () => {
  it('serves the content for the active locale', () => {
    renderProbe('ar');
    expect(screen.getByTestId('name')).toHaveTextContent('محمد أبوعاصي');
  });

  it('toggles between the two locales and back', async () => {
    const user = userEvent.setup();
    renderProbe('en');
    expect(screen.getByTestId('locale')).toHaveTextContent('en');

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('ar');

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('applies dir and lang to the document element', async () => {
    const user = userEvent.setup();
    renderProbe('en');
    expect(document.documentElement).toHaveAttribute('dir', 'ltr');
    expect(document.documentElement).toHaveAttribute('lang', 'en');

    await user.click(screen.getByRole('button', { name: 'go arabic' }));
    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    expect(document.documentElement).toHaveAttribute('lang', 'ar');
  });

  it('persists the choice', async () => {
    const user = userEvent.setup();
    renderProbe('en');
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('ar');
  });

  it('restores a persisted choice on the next visit', () => {
    window.localStorage.setItem(STORAGE_KEY, 'ar');
    expect(resolveInitialLocale()).toBe('ar');
  });

  it('ignores a persisted value that is not a locale', () => {
    window.localStorage.setItem(STORAGE_KEY, 'klingon');
    expect(resolveInitialLocale()).toBe('en');
  });

  it('falls back to the browser preference when nothing is stored', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('ar-SA');
    expect(resolveInitialLocale()).toBe('ar');
    vi.restoreAllMocks();
  });

  it('survives storage throwing, as Safari does in private browsing', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    expect(() => resolveInitialLocale()).not.toThrow();
    expect(resolveInitialLocale()).toBe('en');
    getItem.mockRestore();
  });
});

describe('useLocale', () => {
  it('throws outside a provider rather than silently serving English', () => {
    // React logs the thrown error; silence it so the run stays readable.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(vi.fn());
    expect(() => render(<Probe />)).toThrow(/must be used inside a <LocaleProvider>/);
    consoleError.mockRestore();
  });
});
