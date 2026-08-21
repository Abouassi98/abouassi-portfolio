import { useLocale } from '../i18n/useLocale';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Experience() {
  const { content } = useLocale();
  const { experience, ui } = content;
  return (
    <Section
      id="experience"
      eyebrow={ui.sections.experience.eyebrow}
      title={ui.sections.experience.title}
    >
      {/* border-s / ps / -start keep the rail on the correct side in RTL. */}
      <ol className="relative list-none space-y-6 border-s border-line ps-6">
        {experience.map((role, index) => (
          <li key={`${role.org}-${role.period}`} className="relative">
            <Reveal delayMs={index * 50}>
              <span
                aria-hidden="true"
                className="absolute -start-[27px] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-ink"
              />
              <h3 className="font-semibold text-white">{role.org}</h3>
              {role.note !== undefined && <p className="text-xs text-muted">{role.note}</p>}
              <p className="mt-0.5 text-sm text-slate-300">{role.role}</p>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {role.period} · {role.where}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
