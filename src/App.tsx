import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { ProjectList } from './components/ProjectList';
import { Skills } from './components/Skills';
import { Tracks } from './components/Tracks';
import { useLocale } from './i18n/useLocale';

export function App() {
  const { content } = useLocale();
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        {content.ui.skipToContent}
      </a>
      <Nav />
      <main>
        <Hero />
        <ProjectList />
        <Tracks />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
