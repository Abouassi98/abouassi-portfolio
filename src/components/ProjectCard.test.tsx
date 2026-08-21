import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ar } from '../content/ar';
import { en } from '../content/en';
import { expectNoAxeViolations } from '../test/axe';
import { screen, within } from '@testing-library/react';
import { renderWithLocale } from '../test/render';
import { ProjectCard } from './ProjectCard';

const project = en.projects[0];

describe('ProjectCard', () => {
  it('renders the summary outside the disclosure, so it is readable while collapsed', () => {
    renderWithLocale(<ProjectCard project={project} />);
    expect(screen.getByText(project.summary)).toBeVisible();
  });

  it('starts collapsed and reports it', () => {
    renderWithLocale(<ProjectCard project={project} />);
    expect(screen.getByRole('button', { name: project.name })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('honours defaultOpen', () => {
    renderWithLocale(<ProjectCard project={project} defaultOpen />);
    expect(screen.getByRole('button', { name: project.name })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('expands and collapses on click', async () => {
    const user = userEvent.setup();
    renderWithLocale(<ProjectCard project={project} />);
    const toggle = screen.getByRole('button', { name: project.name });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(project.points[0]!)).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('is operable from the keyboard alone', async () => {
    const user = userEvent.setup();
    renderWithLocale(<ProjectCard project={project} />);
    const toggle = screen.getByRole('button', { name: project.name });

    toggle.focus();
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  // The reason the panel uses `hidden` instead of a zero-height wrapper: with
  // the height trick every link in a collapsed panel stays in the tab order,
  // so a keyboard user tabs into content that is not on screen.
  it('takes collapsed content out of the accessibility tree and the tab order', async () => {
    const user = userEvent.setup();
    renderWithLocale(<ProjectCard project={project} />);

    // Role queries honour `hidden`; getByText does not. Both are asserted, because
    // "not in the accessibility tree" and "not visible" are different claims.
    expect(screen.queryByRole('link', { name: /Google Play/ })).not.toBeInTheDocument();
    expect(screen.getByText(project.points[0]!)).not.toBeVisible();

    await user.click(screen.getByRole('button', { name: project.name }));
    expect(screen.getByRole('link', { name: /Google Play/ })).toBeVisible();
  });

  it('labels the expanded panel with the button that controls it', async () => {
    const user = userEvent.setup();
    const { container } = renderWithLocale(<ProjectCard project={project} />);
    const toggle = screen.getByRole('button', { name: project.name });

    await user.click(toggle);
    const panel = screen.getByRole('region', { name: project.name });
    expect(toggle).toHaveAttribute('aria-controls', panel.id);
    await expectNoAxeViolations(container);
  });

  it('puts the project name in a heading, not only in the button', () => {
    renderWithLocale(<ProjectCard project={project} />);
    const heading = screen.getByRole('heading', { level: 3, name: project.name });
    expect(within(heading).getByRole('button')).toBeInTheDocument();
  });

  it('renders the Arabic copy of the same project', () => {
    const arabicProject = ar.projects.find((candidate) => candidate.id === project.id)!;
    renderWithLocale(<ProjectCard project={arabicProject} defaultOpen />, { locale: 'ar' });
    expect(screen.getByRole('heading', { level: 3, name: arabicProject.name })).toBeInTheDocument();
    expect(screen.getByText(arabicProject.points[0]!)).toBeVisible();
  });
});

describe('MetricTile bidi isolation', () => {
  it('isolates the numeric value so RTL cannot reorder it', async () => {
    const { MetricTile } = await import('./MetricTile');
    const metric = ar.metrics.find((candidate) => candidate.value.includes('→'))!;
    const { container } = renderWithLocale(<MetricTile metric={metric} />, { locale: 'ar' });
    const isolated = container.querySelector('bdi');
    expect(isolated).toHaveAttribute('dir', 'ltr');
    expect(isolated).toHaveTextContent(metric.value);
  });
});
