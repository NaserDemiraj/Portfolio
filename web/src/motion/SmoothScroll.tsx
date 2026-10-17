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

  // Lenis prevents the default anchor jump, which also skips the browser's focus move.
  // Move focus to the target ourselves so keyboard and screen-reader users land there too.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true }} />
      <ScrollTriggerSync />
      {children}
    </>
  );
}
