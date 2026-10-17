import { FilmGrain, VeilRegion } from './components/Ambient';
import { useReveal } from './hooks/useReveal';
import { SmoothScroll } from './motion/SmoothScroll';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Nav } from './sections/Nav';
import { Skills } from './sections/Skills';
import { StackStrip } from './sections/StackStrip';
import { Work } from './sections/Work';

function Page() {
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <StackStrip />
        <VeilRegion>
          <About />
          <Skills />
        </VeilRegion>
        <Work />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FilmGrain />
    </>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Page />
    </SmoothScroll>
  );
}
