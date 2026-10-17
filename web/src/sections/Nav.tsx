import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { profile } from '../data/profile';
import { ScrollTrigger } from '../motion/gsap';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#work', label: 'work' },
  { href: '#contact', label: 'contact' },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Hide while scrolling down past the hero, reveal on any upward scroll.
  useLenis(({ scroll, direction, progress }) => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    if (direction === 1 && scroll > 160) setHidden(true);
    else if (direction === -1) setHidden(false);
  });

  // Highlight the link for whichever section sits under the nav.
  useEffect(() => {
    const triggers = LINKS.map(({ href }) =>
      ScrollTrigger.create({
        trigger: href,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && setActive(href),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav className={`nav${hidden ? ' nav--hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="Back to top">
          <span className="logo-mark">ND</span>
          <span className="nav__domain">naser.dev</span>
        </a>
        <div className="nav__links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav__link${active === l.href ? ' nav__link--active' : ''}`}
              aria-current={active === l.href ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noopener" className="nav__li" aria-label="LinkedIn">
            in
          </a>
        </div>
        <a href={profile.cv} download className="btn btn--ghost btn--sm">
          resume ↓
        </a>
      </div>
      <div ref={progressRef} className="nav__progress" aria-hidden="true" />
    </nav>
  );
}
