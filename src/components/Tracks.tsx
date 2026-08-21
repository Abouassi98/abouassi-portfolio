import { useCallback, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { TrackId } from '../content/types';
import { useLocale } from '../i18n/useLocale';
import { Section } from './Section';

/**
 * The WAI-ARIA tabs pattern, with one deliberate detail: arrow keys follow the
 * *visual* order, so in RTL ArrowLeft moves forward. Mapping ArrowRight to
 * "next" unconditionally is the single most common way a tablist breaks for
 * Arabic users, and it is invisible to anyone testing only in English.
 */
export function Tracks() {
  const { content, dir } = useLocale();
  const { tracks, ui } = content;
  const baseId = useId();
  const [selectedId, setSelectedId] = useState<TrackId>(() => tracks[0].id);
  const tabRefs = useRef(new Map<TrackId, HTMLButtonElement>());

  const selectedIndex = tracks.findIndex((track) => track.id === selectedId);
  // findIndex cannot prove a hit, and an out-of-range index is `undefined` under
  // noUncheckedIndexedAccess — so fall back to the first track explicitly.
  const current = tracks[selectedIndex] ?? tracks[0];

  const focusTab = useCallback((id: TrackId) => {
    setSelectedId(id);
    tabRefs.current.get(id)?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
      const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      const last = tracks.length - 1;

      let nextIndex: number | undefined;
      if (event.key === forward) nextIndex = selectedIndex === last ? 0 : selectedIndex + 1;
      else if (event.key === backward) nextIndex = selectedIndex === 0 ? last : selectedIndex - 1;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = last;

      if (nextIndex === undefined) return;
      event.preventDefault();
      const nextTrack = tracks[nextIndex];
      if (nextTrack !== undefined) focusTab(nextTrack.id);
    },
    [dir, focusTab, selectedIndex, tracks],
  );

  return (
    <Section id="tracks" eyebrow={ui.sections.tracks.eyebrow} title={ui.sections.tracks.title}>
      <div role="tablist" aria-label={ui.sections.tracks.title} className="flex flex-wrap gap-2">
        {tracks.map((track) => {
          const selected = track.id === selectedId;
          return (
            <button
              key={track.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${track.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${track.id}`}
              // Roving tabindex: one stop for the whole tablist, then arrows.
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                if (node === null) tabRefs.current.delete(track.id);
                else tabRefs.current.set(track.id, node);
              }}
              onClick={() => { setSelectedId(track.id); }}
              onKeyDown={onKeyDown}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? 'border-accent/60 bg-accent/15 text-white'
                  : 'border-line text-muted hover:border-accent/40 hover:text-slate-200'
              }`}
            >
              {track.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        // Focusable so keyboard users can reach the panel content after the tab.
        tabIndex={0}
        className="card mt-5 p-6"
      >
        <p className="text-[15px] text-slate-300">{current.line}</p>
        <ul className="mt-5 space-y-3">
          {current.points.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex list-none flex-wrap gap-1.5">
          {current.stack.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
