import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Reveal } from '../components/Reveal';

/** Captures the observer instances React creates so a test can drive them. */
function stubIntersectionObserver() {
  const instances: { trigger: (isIntersecting: boolean) => void; disconnected: boolean }[] = [];
  class Stub implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: readonly number[] = [];
    private readonly record: (typeof instances)[number];
    constructor(private readonly callback: IntersectionObserverCallback) {
      this.record = {
        disconnected: false,
        trigger: (isIntersecting) => {
          this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
        },
      };
      instances.push(this.record);
    }
    observe(): void {
      /* The hook only needs the callback; nothing to record here. */
    }
    unobserve(): void {
      /* Unused: the hook disconnects rather than unobserving. */
    }
    disconnect(): void {
      this.record.disconnected = true;
    }
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  vi.stubGlobal('IntersectionObserver', Stub);
  return instances;
}

/** Reveal renders a single div around its children, so this is that div. */
function revealed() {
  return screen.getByText('payload');
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('useReveal', () => {
  it('reveals immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Reveal>payload</Reveal>);
    expect(revealed()).toHaveClass('opacity-100');
  });

  it('reveals when the element scrolls into view', () => {
    const observers = stubIntersectionObserver();
    render(<Reveal>payload</Reveal>);
    expect(revealed()).toHaveClass('motion-safe:opacity-0');

    act(() => {
      observers[0]?.trigger(true);
    });
    expect(revealed()).toHaveClass('opacity-100');
    expect(observers[0]?.disconnected).toBe(true);
  });

  // The bug this guards: a background tab receives no intersection callbacks,
  // so without the timer the content would never become visible at all.
  it('reveals anyway if the observer never fires', () => {
    vi.useFakeTimers();
    stubIntersectionObserver();
    render(<Reveal>payload</Reveal>);
    expect(revealed()).toHaveClass('motion-safe:opacity-0');

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(revealed()).toHaveClass('opacity-100');
  });

  it('clears the fallback timer on unmount', () => {
    vi.useFakeTimers();
    stubIntersectionObserver();
    const { unmount } = render(<Reveal>payload</Reveal>);
    unmount();
    // A pending timer calling setState after unmount would warn; none should run.
    expect(() => {
      act(() => {
        vi.advanceTimersByTime(5000);
      });
    }).not.toThrow();
  });
});
