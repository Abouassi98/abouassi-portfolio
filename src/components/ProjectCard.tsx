import { useId, useState } from 'react';
import type { Project } from '../content/types';
import { useLocale } from '../i18n/useLocale';
import { Reveal } from './Reveal';

interface ProjectCardProps {
  readonly project: Project;
  readonly defaultOpen?: boolean;
  readonly revealDelayMs?: number;
}

/**
 * A disclosure, following the WAI-ARIA accordion pattern.
 *
 * The panel uses `hidden` rather than a zero-height wrapper. The height trick
 * animates nicely and leaves every link inside the collapsed panel in the tab
 * order and in the accessibility tree — a keyboard user tabs into content they
 * cannot see. Correctness won; see README § Trade-offs.
 */
export function ProjectCard({ project, defaultOpen = false, revealDelayMs = 0 }: ProjectCardProps) {
  const { content } = useLocale();
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;

  return (
    <Reveal delayMs={revealDelayMs}>
      <article className="card overflow-hidden">
        <div className="p-6">
          <p className="eyebrow">{project.domain}</p>
          <h3 className="mt-1.5 text-lg font-semibold text-white">
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => { setOpen((wasOpen) => !wasOpen); }}
              className="flex w-full items-start justify-between gap-4 text-start"
            >
              <span>{project.name}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                className={`mt-1.5 shrink-0 text-muted transition-transform duration-300 ${
                  open ? 'rotate-45' : ''
                }`}
              >
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {project.role} · {project.period}
          </p>
          <p className="lede mt-3 max-w-2xl">{project.summary}</p>
        </div>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!open}
          className="border-t border-line/70 px-6 pb-6 pt-5 motion-safe:animate-fade-in"
        >
          <ul className="space-y-3">
            {project.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex list-none flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
          {project.links !== undefined && (
            <div className="mt-4 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {link.label}
                  <span className="sr-only"> — {content.ui.externalLinkContext(project.name)}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    width="12"
                    height="12"
                    className="ms-1 inline-block align-baseline"
                  >
                    <path
                      d="M5 11 11 5M6 5h5v5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
