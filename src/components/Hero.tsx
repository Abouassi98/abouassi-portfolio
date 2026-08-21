import { useLocale } from '../i18n/useLocale';
import { MetricTile } from './MetricTile';
import { Reveal } from './Reveal';

export function Hero() {
  const { content } = useLocale();
  const { profile, metrics, ui } = content;

  return (
    <section id="top" aria-labelledby="hero-name" className="wrap pb-14 pt-16 sm:pt-24">
      <Reveal>
        <p className="eyebrow">
          {profile.location} · {profile.status}
        </p>
        <h1
          id="hero-name"
          className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
        >
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-slate-300 sm:text-xl">{profile.title}</p>
        <p className="lede mt-6 max-w-2xl text-base">{profile.blurb}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            {ui.heroCta}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-accent/50 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>

      <ul className="mt-14 grid list-none grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <li key={metric.claimId} className="h-full">
            <Reveal delayMs={index * 70}>
              <MetricTile metric={metric} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
