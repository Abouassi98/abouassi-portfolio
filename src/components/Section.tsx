import { useId, type ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
}

/**
 * A landmark region with its heading wired to it, so a screen-reader user
 * moving between regions hears which one they landed in.
 */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  const headingId = useId();
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 border-t border-line/70 py-16 sm:py-20"
    >
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="h2 mt-2">
            {title}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
