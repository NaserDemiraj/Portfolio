import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '../motion/gsap';

/**
 * A row of cards that pins and slides left as the page scrolls, with a counter and a
 * progress line. Callers render it only where it applies (see SIDEWAYS); elsewhere they
 * show a plain list.
 */
export function Sideways({ count, children }: { count: number; children: ReactNode }) {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const row = track.current!;
      const distance = () => row.scrollWidth - window.innerWidth;
      gsap.to(row, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          // the row moves faster than the page, so the pinned stretch stays short
          end: () => `+=${distance() * 0.55}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            const n = Math.min(count, Math.floor(self.progress * count) + 1);
            if (counter.current) counter.current.textContent = String(n).padStart(2, '0');
          },
        },
      });
    },
    { scope: pin },
  );

  return (
    <div ref={pin} className="side">
      <div className="container side__hud" aria-hidden="true">
        <span className="side__count">
          <span ref={counter}>01</span> / {String(count).padStart(2, '0')}
        </span>
        <span className="side__line">
          <span ref={bar} className="side__bar" />
        </span>
        <span>scroll →</span>
      </div>
      <div ref={track} className="side__track">
        {children}
      </div>
    </div>
  );
}
