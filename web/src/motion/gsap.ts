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

export { gsap, ScrollTrigger, SplitText, useGSAP };
