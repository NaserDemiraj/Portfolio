import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './gsap';

// Keeps ScrollTrigger's positions in step with Lenis' animated scroll.
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

/**
 * Lenis smooth scroll driven by GSAP's ticker, so scroll and every tween share one
 * frame loop. Lenis honors prefers-reduced-motion on its own (lerp 1, instant jumps).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000); // GSAP time is in seconds
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true }} />
      <ScrollTriggerSync />
      {children}
    </>
  );
}
