import type { CSSProperties } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import ScrollStack, { ScrollStackItem } from '../components/reactbits/ScrollStack/ScrollStack';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';
import { SectionHeader } from '../components/SectionHeader';
import { featured, sideProjects, type FeaturedProject } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MOTION_OK } from '../motion/gsap';

const SPOTLIGHT_VARS = {
  '--spotlight-card-surface': 'var(--surface)',
  '--spotlight-card-border': 'var(--line-2)',
  '--spotlight-card-shadow': 'none',
} as CSSProperties;

function ProjectMedia({ project }: { project: FeaturedProject }) {
  if (!project.image) {
    // No screenshot yet: an intentional "scene" instead of a grey box.
    return (
      <div className="work__media work__media--scene" aria-hidden="true">
        <div className="scene__floor" />
        <div className="scene__cube">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="scene__label">{project.stack.join(' · ')}</div>
      </div>
    );
  }
  return (
    <div className="work__media">
      <img src={project.image.src} alt={project.image.alt} loading="lazy" width={1600} height={800} />
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
          aside="A paid client build, an AI credibility-scoring platform and a Unity game, plus the side projects behind them."
        />

        {stacked ? (
          <ScrollStack
            className="work__stack"
            useWindowScroll
            smoothScroll={false}
            stackPosition="14%"
            itemDistance={120}
            itemStackDistance={28}
            itemScale={0.04}
            baseScale={0.88}
            dimAmount={0.35}
            holdDistance={120}
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
