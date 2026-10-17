import { gsap, MOTION_OK, REDUCED_MOTION, ScrollTrigger, useGSAP } from '../motion/gsap';

// Fades `.reveal` elements up as they enter the viewport, batched so elements
// that arrive together cascade instead of popping in at once.
export function useReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.set('.reveal', { autoAlpha: 0, y: 26 });
      ScrollTrigger.batch('.reveal', {
        start: 'top 93%',
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, overwrite: true }),
      });
    });

    mm.add(REDUCED_MOTION, () => {
      gsap.set('.reveal', { autoAlpha: 1, y: 0 });
    });
  });
}
