import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';
import { SectionHeader } from '../components/SectionHeader';
import { Sideways } from '../components/Sideways';
import { featured, sideProjects, type FeaturedProject, type Shot } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { gsap, MOTION_OK, ScrollTrigger, SIDEWAYS, useGSAP } from '../motion/gsap';

// Phones and tablets: no hover, so effects that desktop triggers on hover run on scroll instead.
const TOUCH = '(hover: none)';
// Narrow screens fold each card's highlights behind a Details toggle.
const NARROW = '(max-width: 860px)';
// How many side projects show before 'Show all'.
const MORE_SHOWN = 4;

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
      style={{ ...(shot.position ? { objectPosition: shot.position } : {}), ...(shot.aspect ? { aspectRatio: shot.aspect } : {}) }}
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

function Highlights({ items }: { items: string[] }) {
  const narrow = useMediaQuery(NARROW);
  const list = (
    <ul className="work__highlights">
      {items.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
  );
  if (!narrow) return list;
  return (
    <details className="work__details">
      <summary>details</summary>
      {list}
    </details>
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
        <Highlights items={project.highlights} />
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
  // Cards slide sideways on wide screens; on smaller screens or with reduced motion they're a plain list.
  const sideways = useMediaQuery(SIDEWAYS);
  const touch = useMediaQuery(TOUCH);
  const [allMore, setAllMore] = useState(false);
  const more = allMore ? sideProjects : sideProjects.slice(0, MORE_SHOWN);

  // The page grows when the rest of the side projects open; re-measure the scroll scenes below.
  useEffect(() => {
    if (allMore) ScrollTrigger.refresh();
  }, [allMore]);

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
    { scope: root, dependencies: [sideways] },
  );

  return (
    <section id="work" ref={root} className="section">
      <div className="container">
        <SectionHeader
          index="04"
          label="work"
          title="Selected work"
          aside="Two AI SaaS platforms, a paid client store, my thesis AI fact-checker and a Unity game, plus the side projects behind them."
        />
      </div>
      {sideways ? (
        <Sideways count={featured.length}>
          {featured.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </Sideways>
      ) : (
        <div className="container">
          <div className="work__list">
            {featured.map((p, i) => (
              <div key={p.title} className={touch ? undefined : 'reveal'}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <div className="more reveal">
          <div className="more__label">// more projects</div>
          <div className="more__grid">
            {more.map((p) => (
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
          {sideProjects.length > MORE_SHOWN && (
            <button type="button" className="btn btn--ghost btn--sm more__toggle" onClick={() => setAllMore((v) => !v)} aria-expanded={allMore}>
              {allMore ? 'show fewer' : `show all ${sideProjects.length}`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
