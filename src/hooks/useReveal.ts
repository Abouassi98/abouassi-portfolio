import { useEffect, useRef, useState } from 'react';

/** True when the user has asked the OS to reduce motion. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * How long to wait for the observer before revealing anyway. Long enough that
 * a normal scroll-into-view still animates, short enough that nobody stares at
 * a blank panel.
 */
const FALLBACK_REVEAL_MS = 1200;

/**
 * Reveals a block once it scrolls into view. One observer per node, disconnected
 * as soon as it fires.
 *
 * Two independent escape hatches, because the failure mode of this hook is
 * invisible content:
 *
 *  1. No `IntersectionObserver`, or reduced motion — reveal immediately.
 *  2. The observer exists but never fires — reveal on a timer anyway. This is
 *     not hypothetical: a background tab gets no intersection callbacks at all,
 *     so a crawler that runs JavaScript on a hidden page would otherwise index
 *     an empty document.
 *
 * A progressive enhancement that hides content when it fails is not an
 * enhancement.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(el);

    const fallback = window.setTimeout(() => {
      setShown(true);
      observer.disconnect();
    }, FALLBACK_REVEAL_MS);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, shown };
}
