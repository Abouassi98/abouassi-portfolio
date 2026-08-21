import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  readonly children: ReactNode;
  readonly delayMs?: number;
}

export function Reveal({ children, delayMs = 0 }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'motion-safe:translate-y-4 motion-safe:opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
