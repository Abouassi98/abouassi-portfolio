import { useLocale } from '../i18n/useLocale';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

export function ProjectList() {
  const { content } = useLocale();
  const { projects, ui } = content;
  return (
    <Section id="work" eyebrow={ui.sections.work.eyebrow} title={ui.sections.work.title}>
      <ul className="list-none space-y-4">
        {projects.map((project, index) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              defaultOpen={index === 0}
              revealDelayMs={index * 60}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
