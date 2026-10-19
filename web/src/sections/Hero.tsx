import { lazy, useRef } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { Decor } from '../components/Decor';
import Magnet from '../components/reactbits/Magnet/Magnet';
import { GitHubIcon } from '../components/Icons';
import { profile } from '../data/profile';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../motion/gsap';
import { webglEffectsAllowed } from '../motion/webgl';

// WebGL shader background: loaded after first paint so it never blocks the headline.
const FaultyTerminal = lazy(() => import('../components/reactbits/FaultyTerminal/FaultyTerminal'));

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create('.hero__name', { type: 'chars,lines', mask: 'lines' });
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 })
          .from('.hero__meta > *', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.08 }, 0.15)
          .to(
            '.hero__role-text',
            { duration: 1.2, scrambleText: { text: `// ${profile.role}`, chars: '01<>/_', speed: 0.6 } },
            0.3,
          )
          .from('.hero__intro, .hero__actions', { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.1 }, 0.45)
          .from('.chat', { autoAlpha: 0, y: 40, scale: 0.97, duration: 1.1 }, 0.55)
          .from('.hero__cue', { autoAlpha: 0, duration: 0.6 }, 1.1);

        // Drift the terminal backdrop and fade the cue as the hero scrolls away.
        gsap.to('.hero__bg', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__cue', {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '15% top', scrub: true },
        });
        return () => split.revert();
      });
      // Fonts can shift line breaks after the split; re-measure once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="hero">
      <div className="hero__bg" aria-hidden="true">
        <Decor enabled={webglEffectsAllowed()}>
          <FaultyTerminal
            tint="#74e0a3"
            glyphs="characters"
            scale={1.6}
            digitSize={1.3}
            timeScale={0.35}
            brightness={0.65}
            glow={0.45}
            persistence={0.55}
            scanlineIntensity={0.25}
            curvature={0.08}
            vignette={0.4}
            mouseStrength={0.35}
            mouseGlow={0.7}
            clickEffect="glitch"
            dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
          />
        </Decor>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__meta">
            <span className="pill">
              <span className="pill__dot" />
              available for work
            </span>
            <span className="hero__role">
              <span className="hero__role-text">// {profile.role}</span>
            </span>
          </div>
          <h1 className="hero__name" aria-label={profile.name}>
            Naser
            <br />
            Demiraj
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <Magnet padding={60} magnetStrength={5} maxOffset={12} disabled={!finePointer}>
              <a href="#work" className="btn btn--primary">
                view work →
              </a>
            </Magnet>
            <a href={profile.github} target="_blank" rel="noopener" className="btn btn--ghost btn--glass">
              <GitHubIcon />
              {profile.githubLabel}
            </a>
          </div>
        </div>
        <ChatWindow />
      </div>

      <a href="#about" className="hero__cue" aria-label="Scroll to about">
        <span>scroll</span>
        <span className="hero__cue-line" />
      </a>
    </section>
  );
}
