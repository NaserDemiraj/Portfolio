import type { CSSProperties } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import ScrollStack, { ScrollStackItem } from '../components/reactbits/ScrollStack/ScrollStack';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';
import { SectionHeader } from '../components/SectionHeader';
import { featured, sideProjects, type FeaturedProject, type FlowStep, type Shot } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MOTION_OK } from '../motion/gsap';

const SPOTLIGHT_VARS = {
  '--spotlight-card-surface': 'var(--surface)',
  '--spotlight-card-border': 'var(--line-2)',
  '--spotlight-card-shadow': 'none',
} as CSSProperties;

function frameLabel(project: FeaturedProject) {
  return project.frameLabel ?? (project.link ? new URL(project.link.href).host : project.stack.join(' · '));
}

// Architecture at a glance for projects without a public deployment to screenshot.
// Steps light up in sequence, like a request moving through the system.
function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flow" aria-label="How it works">
      {steps.map((step, i) => (
        <li key={step.title} className="flow__step" style={{ '--i': i, '--n': steps.length } as CSSProperties}>
          <span className="flow__index">{String(i + 1).padStart(2, '0')}</span>
          <div className="flow__body">
            <div className="flow__title">{step.title}</div>
            <ul className="flow__chips">
              {step.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
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
          {project.image ? (
            <>
              <ShotImg shot={project.image} className="frame__shot" />
              {project.hoverImage && <ShotImg shot={project.hoverImage} className="frame__shot frame__shot--hover" />}
            </>
          ) : (
            project.flow && <FlowDiagram steps={project.flow} />
          )}
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
  // Cards pin and stack on desktop; on small screens or with reduced motion they're a plain list.
  const stacked = useMediaQuery(`(min-width: 861px) and ${MOTION_OK}`);

  return (
    <section id="work" className="section">
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
              <div key={p.title} className="reveal">
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
