import { useLocale } from '../i18n/useLocale';
import { LocaleSwitch } from './LocaleSwitch';

export function Nav() {
  const { content } = useLocale();
  const { nav } = content.ui;
  const items = [
    { href: '#work', label: nav.work },
    { href: '#tracks', label: nav.tracks },
    { href: '#experience', label: nav.experience },
    { href: '#skills', label: nav.skills },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur">
      <nav aria-label={content.profile.name} className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="font-mono text-sm text-white">
          {/* Isolated: in RTL the trailing full stop is a neutral character and
              migrates to the left, rendering the monogram as ".MA". */}
          <bdi dir="ltr" aria-hidden="true">
            MA<span className="text-accent">.</span>
          </bdi>
          <span className="sr-only">{content.profile.name}</span>
        </a>
        <div className="flex items-center gap-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-sm text-muted transition-colors hover:text-white sm:block"
            >
              {item.label}
            </a>
          ))}
          <LocaleSwitch />
          <a
            href={`mailto:${content.profile.email}`}
            className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/20"
          >
            {nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
