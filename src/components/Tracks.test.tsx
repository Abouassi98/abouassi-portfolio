import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { en } from '../content/en';
import { screen, within } from '@testing-library/react';
import { renderWithLocale } from '../test/render';
import { expectNoAxeViolations } from '../test/axe';
import { Tracks } from './Tracks';

const [mobile, web, backend] = en.tracks;

describe('Tracks', () => {
  it('exposes a tablist with one tab per track', () => {
    renderWithLocale(<Tracks />);
    const tabs = within(screen.getByRole('tablist')).getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual(en.tracks.map((track) => track.name));
  });

  it('selects the first track by default and shows its panel', () => {
    renderWithLocale(<Tracks />);
    expect(screen.getByRole('tab', { name: mobile.name })).toHaveAttribute('aria-selected', 'true');
    expect(within(screen.getByRole('tabpanel')).getByText(mobile.line)).toBeInTheDocument();
  });

  it('swaps the panel content when another tab is clicked', async () => {
    const user = userEvent.setup();
    renderWithLocale(<Tracks />);

    await user.click(screen.getByRole('tab', { name: backend!.name }));

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText(backend!.line)).toBeInTheDocument();
    expect(within(panel).queryByText(mobile.line)).not.toBeInTheDocument();
  });

  it('keeps exactly one tab in the tab order (roving tabindex)', async () => {
    const user = userEvent.setup();
    renderWithLocale(<Tracks />);
    const tabs = screen.getAllByRole('tab');

    expect(tabs.filter((tab) => tab.getAttribute('tabindex') === '0')).toHaveLength(1);

    await user.click(screen.getByRole('tab', { name: web!.name }));
    expect(screen.getByRole('tab', { name: web!.name })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: mobile.name })).toHaveAttribute('tabindex', '-1');
  });

  it('moves with arrow keys and wraps at both ends', async () => {
    const user = userEvent.setup();
    renderWithLocale(<Tracks />);
    screen.getByRole('tab', { name: mobile.name }).focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: web!.name })).toHaveFocus();

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: backend!.name })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: mobile.name })).toHaveFocus();
  });

  it('supports Home and End', async () => {
    const user = userEvent.setup();
    renderWithLocale(<Tracks />);
    screen.getByRole('tab', { name: mobile.name }).focus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: backend!.name })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: mobile.name })).toHaveFocus();
  });

  // The regression this file exists for. Arrow keys follow the visual order, so
  // in Arabic ArrowLeft moves forward. Hard-coding ArrowRight as "next" passes
  // every English test and is wrong for every Arabic user.
  it('reverses arrow direction in RTL', async () => {
    const user = userEvent.setup();
    const arTracks = renderWithLocale(<Tracks />, { locale: 'ar' }).container;
    const [arMobile, arWeb] = Array.from(arTracks.querySelectorAll('[role="tab"]'));

    (arMobile as HTMLElement).focus();
    await user.keyboard('{ArrowLeft}');
    expect(arWeb).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(arMobile).toHaveFocus();
  });

  it('wires each panel to its tab and has no axe violations', async () => {
    const { container } = renderWithLocale(<Tracks />);
    const panel = screen.getByRole('tabpanel');
    const selectedTab = screen.getByRole('tab', { selected: true });

    expect(panel).toHaveAttribute('aria-labelledby', selectedTab.id);
    expect(selectedTab).toHaveAttribute('aria-controls', panel.id);
    await expectNoAxeViolations(container);
  });
});
