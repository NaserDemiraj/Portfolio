import { useRef } from 'react';
import ScrollReveal from '../components/reactbits/ScrollReveal/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader';
import { profile } from '../data/profile';
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap';

export function About() {
  const root = useRef<HTMLElement>(null);

  // Count each stat up from zero the first time the row scrolls into view.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.stats__value').forEach((el) => {
          const { value, decimals, suffix } = el.dataset;
          const counter = { n: 0 };
          gsap.to(counter, {
            n: Number(value),
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = counter.n.toFixed(Number(decimals)) + suffix;
            },
          });
          el.textContent = (0).toFixed(Number(decimals)) + suffix;
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="section about">
      <div className="container">
        <SectionHeader index="01" label="about" />
        <div className="about__grid">
          <ScrollReveal
              containerClassName="about__statement"
              textClassName="about__statement-text"
              baseOpacity={0.14}
              enableBlur
              blurStrength={3}
              baseRotation={0}
              stagger={0.04}
              wordAnimationEnd="bottom 55%"
              rotationEnd="bottom 55%"
            >
              {profile.about.lead}
          </ScrollReveal>
          <p className="about__body reveal">{profile.about.body}</p>
          <div className="stats reveal">
              {profile.stats.map((s) => (
                <div key={s.label} className="stats__item">
                  <div
                    className="stats__value"
                    data-value={s.value}
                    data-decimals={s.decimals}
                    data-suffix={s.suffix}
                  >
                    {s.value.toFixed(s.decimals)}
                    {s.suffix}
                  </div>
                  <div className="stats__label">{s.label}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
