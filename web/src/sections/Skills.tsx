import { useRef } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { skillGroups } from '../data/skills';
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap';

export function Skills() {
  const root = useRef<HTMLElement>(null);

  // Each group's tags cascade in as the group reaches the viewport.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.skills__group').forEach((group) => {
          gsap.from(group.querySelectorAll('.skills__title, .tag'), {
            autoAlpha: 0,
            y: 14,
            duration: 0.6,
            stagger: 0.035,
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="skills" ref={root} className="section">
      <div className="container">
        <SectionHeader
          index="02"
          label="skills"
          title="What I build with"
          aside="Ten languages and the frameworks around them, across web, mobile, games and hardware."
        />
        <div className="skills">
            {skillGroups.map((g) => (
              <div key={g.title} className="skills__group">
                <h3 className="skills__title">{g.title}</h3>
                <ul className="tags">
                  {g.items.map((item) => (
                    <li key={item} className="tag tag--hover">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
