import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register once; every module imports gsap from here so plugins are always available.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
// Wide screens with motion: rows of cards slide sideways (see components/Sideways).
export const SIDEWAYS = `(min-width: 1024px) and ${MOTION_OK}`;
// Cards pin and stack (ScrollStack) from tablet width up.
export const STACKED = `(min-width: 861px) and ${MOTION_OK}`;

export { gsap, ScrollTrigger, SplitText, useGSAP };
