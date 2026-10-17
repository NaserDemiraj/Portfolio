import { ProjectLinkButton } from '../components/ProjectLinkButton';
import { featured, sideProjects, type FeaturedProject } from '../data/projects';

function ProjectMedia({ project }: { project: FeaturedProject }) {
  if (!project.image) {
    return <div className="work__media work__media--placeholder">[ 3D game screenshot ]</div>;
  }
  return (
    <div className="work__media">
      <img src={project.image.src} alt={project.image.alt} loading="lazy" width={1600} height={800} />
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="secrow secrow--title reveal">
          <div className="eyebrow">// 03 work</div>
          <h2 className="section-title">Selected work</h2>
        </div>

        <div className="work__list">
          {featured.map((p, i) => (
            <article key={p.title} className={`work__card reveal${i % 2 ? ' work__card--flip' : ''}`}>
              <div className="work__text">
                <div className="work__tag">{p.tag}</div>
                <h3 className="work__title">{p.title}</h3>
                {p.link && <ProjectLinkButton link={p.link} />}
                <p className="work__summary">{p.summary}</p>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s} className="tag tag--accent">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <ProjectMedia project={p} />
            </article>
          ))}
        </div>

        <div className="more reveal">
          <div className="eyebrow eyebrow--muted">// more projects</div>
          <div className="more__grid">
            {sideProjects.map((p) => (
              <article key={p.title} className="more__card">
                <h3 className="more__title">{p.title}</h3>
                {p.link && <ProjectLinkButton link={p.link} />}
                <p className="more__summary">{p.summary}</p>
                <div className="more__stack">{p.stack}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
