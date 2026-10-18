import { useRef, type CSSProperties } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import ScrollStack, { ScrollStackItem } from '../components/reactbits/ScrollStack/ScrollStack';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';
import { SectionHeader } from '../components/SectionHeader';
import { featured, sideProjects, type FeaturedProject, type Shot } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../motion/gsap';

// Phones and tablets: no hover, so effects that desktop triggers on hover run on scroll instead.
const TOUCH = '(hover: none)';

const SPOTLIGHT_VARS = {
  '--spotlight-card-surface': 'var(--surface)',
  '--spotlight-card-border': 'var(--line-2)',
  '--spotlight-card-shadow': 'none',
} as CSSProperties;

function frameLabel(project: FeaturedProject) {
  return project.frameLabel ?? (project.link ? new URL(project.link.href).host : project.stack.join(' · '));
}

function ShotImg({ shot, className }: { shot: Shot; className: string }) {
  return (
    <img
      className={className}
      src={shot.src}
      alt={shot.alt}
      loading="lazy"
      width={shot.width}
      height={shot.height}
      style={shot.position ? { objectPosition: shot.position } : undefined}
    />
  );
}

// Screenshots sit inside a dark browser window on a soft glow, so bright sites don't
// fight the page. Slightly muted until the card is hovered.
function ProjectMedia({ project }: { project: FeaturedProject }) {
  return (
    <div className="work__media">
      <div className="frame">
        <div className="frame__bar" aria-hidden="true">
          <span className="frame__dots">
            <span />
            <span />
            <span />
          </span>
          <span className="frame__url">{frameLabel(project)}</span>
        </div>
        <div className="frame__view">
          <ShotImg shot={project.image} className="frame__shot" />
          {project.hoverImage && <ShotImg shot={project.hoverImage} className="frame__shot frame__shot--hover" />}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <article className="work__card">
      <div className="work__text">
        <div className="work__tag">
          <span className="work__index">
            {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
          </span>
          {project.tag}
        </div>
        <h3 className="work__title">{project.title}</h3>
        {project.link && <ProjectLinkButton link={project.link} />}
        <p className="work__summary">{project.summary}</p>
        <ul className="work__highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="tags">
          {project.stack.map((s) => (
            <li key={s} className="tag tag--accent">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <ProjectMedia project={project} />
    </article>
  );
}

export function Work() {
  const root = useRef<HTMLElement>(null);
  // Cards pin and stack on desktop; on small screens or with reduced motion they're a plain list.
  const stacked = useMediaQuery(`(min-width: 861px) and ${MOTION_OK}`);
  const touch = useMediaQuery(TOUCH);

  // Touch equivalent of the desktop deck + hover effects, scrubbed by scroll position:
  // cards rise in, the browser frame straightens and sharpens toward the centre, the shot
  // drifts inside its frame, and second shots crossfade in once a card passes the middle.
  useGSAP(
    () => {
      gsap.matchMedia().add(`${TOUCH} and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>('.work__list .work__card').forEach((card) => {
          const frame = card.querySelector('.frame');
          const shot = card.querySelector('.frame__shot');
          const second = card.querySelector('.frame__shot--hover');
          const scrub = { trigger: card, scrub: 0.6 };

          gsap.from(card, {
            y: 60,
            scale: 0.94,
            autoAlpha: 0.35,
            ease: 'none',
            scrollTrigger: { ...scrub, start: 'top bottom', end: 'top 60%' },
          });
          gsap.fromTo(
            frame,
            { rotate: -2.5, y: 24, filter: 'saturate(0.55) brightness(0.8)' },
            {
              rotate: 0,
              y: 0,
              filter: 'saturate(1) brightness(1)',
              ease: 'none',
              scrollTrigger: { ...scrub, trigger: frame, start: 'top bottom', end: 'center 55%' },
            },
          );
          gsap.fromTo(
            shot,
            { yPercent: -4, scale: 1.1 },
            { yPercent: 4, scale: 1.1, ease: 'none', scrollTrigger: { ...scrub, trigger: frame, start: 'top bottom', end: 'bottom top' } },
          );
          if (second) {
            ScrollTrigger.create({
              trigger: frame,
              start: 'center 50%',
              end: 'bottom top',
              onToggle: (self) => gsap.to(second, { opacity: self.isActive ? 1 : 0, duration: 0.7, overwrite: true }),
            });
          }
        });
      });
    },
    { scope: root, dependencies: [stacked] },
  );

  return (
    <section id="work" ref={root} className="section">
      <div className="container">
        <SectionHeader
          index="03"
          label="work"
          title="Selected work"
          aside="Two AI SaaS platforms, two client websites, an AI fact-checker and a Unity game, plus the side projects behind them."
        />

        {stacked ? (
          <ScrollStack
            className="work__stack"
            useWindowScroll
            smoothScroll={false}
            stackPosition="14%"
            itemDistance={70}
            itemStackDistance={26}
            itemScale={0.04}
            baseScale={0.88}
            dimAmount={0.35}
            holdDistance={40}
          >
            {featured.map((p, i) => (
              <ScrollStackItem key={p.title} itemClassName="work__stack-item">
                <ProjectCard project={p} index={i} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="work__list">
            {featured.map((p, i) => (
              <div key={p.title} className={touch ? undefined : 'reveal'}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}

        <div className="more reveal">
          <div className="more__label">// more projects</div>
          <div className="more__grid">
            {sideProjects.map((p) => (
              <SpotlightCard
                key={p.title}
                className="more__card"
                style={SPOTLIGHT_VARS}
                spotlightColor="rgba(116, 224, 163, 0.9)"
                intensity={0.12}
                spotlightSize={280}
                borderGlow={0.8}
                proximity={120}
                ambient={touch}
              >
                <h3 className="more__title">{p.title}</h3>
                {p.link && <ProjectLinkButton link={p.link} />}
                <p className="more__summary">{p.summary}</p>
                <div className="more__stack">{p.stack}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
