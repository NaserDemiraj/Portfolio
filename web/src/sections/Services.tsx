import { useRef } from 'react';
import { MailIcon, WhatsAppIcon } from '../components/Icons';
import { SectionHeader } from '../components/SectionHeader';
import { profile } from '../data/profile';
import { services, steps } from '../data/services';
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap';

export function Services() {
  const root = useRef<HTMLElement>(null);

  // The process line draws across as the steps come into view.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from('.steps__line', {
          scaleX: 0,
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="services" ref={root} className="section">
      <div className="container">
        <SectionHeader
          index="05"
          label="services"
          title="What I can build for you"
          aside="For businesses in Kosovo, Albania and beyond, in Albanian or English, from the first call to launch."
        />

        <div className="svc">
          {services.map((s, i) => (
            <article key={s.title} className="svc__card reveal">
              <div className="svc__label">
                <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </div>
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__summary">{s.summary}</p>
              <ul className="work__highlights">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="svc__examples">
                <span>see</span> {s.examples}
              </p>
            </article>
          ))}
        </div>

        <div className="steps reveal">
          <div className="steps__line" aria-hidden="true" />
          <ol className="steps__list">
            {steps.map((s, i) => (
              <li key={s.title} className="steps__item">
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p className="steps__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="steps__cta">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent('A new project')}`} className="btn btn--primary">
              <MailIcon />
              Start a project
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noopener" className="btn btn--ghost">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
