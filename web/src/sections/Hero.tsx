import { ChatWindow } from '../components/ChatWindow';
import { GitHubIcon } from '../components/Icons';
import { profile } from '../data/profile';

export function Hero() {
  return (
    <section id="top" className="section hero">
      <div className="container hero__grid">
        <div>
          <div className="hero__meta">
            <span className="pill">
              <span className="pill__dot" />
              available for work
            </span>
            <span className="hero__role">// {profile.role}</span>
          </div>
          <h1 className="hero__name">
            Naser
            <br />
            Demiraj
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">
              view work →
            </a>
            <a href={profile.github} target="_blank" rel="noopener" className="btn btn--ghost">
              <GitHubIcon />
              {profile.githubLabel}
            </a>
          </div>
        </div>
        <ChatWindow />
      </div>
    </section>
  );
}
