import { useRef, type ReactNode } from 'react';
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap';

type Props = {
  index: string;
  label: string;
  title?: ReactNode;
  aside?: ReactNode;
  tone?: 'dark' | 'ink';
};

/**
 * Editorial section header: "01 — about" with a rule that draws across, then a large
 * title whose lines rise in. Shared by every section so the page has one rhythm.
 */
export function SectionHeader({ index, label, title, aside, tone = 'dark' }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        });
        tl.from('.sh__rule', { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }).from(
          '.sh__meta > *',
          { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.08 },
          0.1,
        );
        let split: SplitText | undefined;
        if (root.current?.querySelector('.sh__title')) {
          split = SplitText.create('.sh__title', { type: 'lines', mask: 'lines' });
          tl.from(split.lines, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.1 }, 0.25);
        }
        tl.from('.sh__aside', { autoAlpha: 0, y: 14, duration: 0.8 }, 0.5);
        return () => split?.revert();
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className={`sh sh--${tone}`}>
      <div className="sh__meta">
        <span className="sh__index">{index}</span>
        <span className="sh__label">{label}</span>
      </div>
      <div className="sh__rule" aria-hidden="true" />
      {(title || aside) && (
        <div className="sh__row">
          {title && <h2 className="sh__title">{title}</h2>}
          {aside && <div className="sh__aside">{aside}</div>}
        </div>
      )}
    </header>
  );
}
