import { useLocale } from '../i18n/useLocale';
import { Reveal } from './Reveal';

export function Footer() {
  const { content } = useLocale();
  const { profile, ui, education, languages } = content;
  return (
    <footer className="border-t border-line/70 py-14">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{ui.sections.contact.eyebrow}</p>
          <h2 className="h2 mt-2">{ui.sections.contact.title}</h2>
          <p className="lede mt-4 max-w-2xl">{ui.contactBlurb}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              {profile.email}
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
          <div className="mt-10 space-y-1 text-xs text-muted">
            <p>{education}</p>
            <p>{languages}</p>
            <p className="pt-3">
              © {new Date().getFullYear()} {profile.name} · {ui.builtWith}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
