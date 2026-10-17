import { profile } from '../data/profile';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container reveal">
        <div className="secrow">
          <div className="eyebrow">// 01 about</div>
          <div className="secrow__body">
            <p className="about__lead">{profile.about.lead}</p>
            <p className="about__body">{profile.about.body}</p>
            <div className="stats">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="stats__value">
                    {s.value.toFixed(s.decimals)}
                    {s.suffix}
                  </div>
                  <div className="stats__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
