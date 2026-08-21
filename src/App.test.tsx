import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { ar } from './content/ar';
import { en } from './content/en';
import { expectNoAxeViolations } from './test/axe';
import { screen, within } from '@testing-library/react';
import { renderWithLocale } from './test/render';
import { LOCALES } from './i18n/locales';

const contentByLocale = { en, ar } as const;

describe('App', () => {
  it('exposes the page landmarks', () => {
    renderWithLocale(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: en.profile.name })).toBeInTheDocument();
  });

  it('has exactly one h1', () => {
    renderWithLocale(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('gives every section heading a region that points at it', () => {
    const { container } = renderWithLocale(<App />);
    const sections = Array.from(container.querySelectorAll('section[aria-labelledby]'));
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const id = section.getAttribute('aria-labelledby');
      expect(id).toBeTruthy();
      expect(container.querySelector(`#${CSS.escape(id!)}`)).not.toBeNull();
    }
  });

  it('puts a skip link first in the tab order', async () => {
    const user = userEvent.setup();
    renderWithLocale(<App />);
    await user.tab();
    expect(screen.getByRole('link', { name: en.ui.skipToContent })).toHaveFocus();
  });

  it('switches the whole page to Arabic and flips direction', async () => {
    const user = userEvent.setup();
    renderWithLocale(<App />);
    expect(document.documentElement).toHaveAttribute('dir', 'ltr');

    await user.click(screen.getByRole('button', { name: en.ui.localeSwitchLabel }));

    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(ar.profile.name);
    expect(screen.getByRole('button', { name: ar.ui.localeSwitchLabel })).toBeInTheDocument();
  });

  it('marks the locale button with the language it switches to', () => {
    renderWithLocale(<App />);
    expect(screen.getByRole('button', { name: en.ui.localeSwitchLabel })).toHaveAttribute(
      'lang',
      'ar',
    );
  });

  it('names the employer on every borrowed-scale metric it renders', () => {
    renderWithLocale(<App />);
    for (const metric of en.metrics) {
      if (metric.attribution.kind !== 'context') continue;
      const tile = screen.getByText(metric.value).closest('li');
      expect(tile).not.toBeNull();
      expect(within(tile!).getByText(new RegExp(metric.attribution.employer))).toBeInTheDocument();
    }
  });

  it.each(LOCALES)('has no axe violations in %s', async (locale) => {
    const { container } = renderWithLocale(<App />, { locale });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      contentByLocale[locale].profile.name,
    );
    await expectNoAxeViolations(container);
  });
});
