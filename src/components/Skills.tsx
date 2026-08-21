import { useLocale } from '../i18n/useLocale';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Skills() {
  const { content } = useLocale();
  const { skills, ui } = content;
  return (
    <Section id="skills" eyebrow={ui.sections.skills.eyebrow} title={ui.sections.skills.title}>
      <ul className="grid list-none gap-4 sm:grid-cols-2">
        {skills.map((group, index) => (
          <li key={group.group} className="h-full">
            <Reveal delayMs={index * 50}>
              <div className="card h-full p-5">
                <h3 className="text-sm font-semibold text-white">{group.group}</h3>
                <ul className="mt-3 flex list-none flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
