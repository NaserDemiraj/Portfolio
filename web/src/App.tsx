import { useReveal } from './hooks/useReveal';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Nav } from './sections/Nav';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';

function Divider() {
  return <div className="container divider" aria-hidden="true" />;
}

export default function App() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Divider />
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
