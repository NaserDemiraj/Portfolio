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

function Divider() {
  return <div className="container divider" aria-hidden="true" />;
}

function Page() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackStrip />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Work />
        <Divider />
        <Education />
        <Contact />
      </main>
      <Footer />
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
