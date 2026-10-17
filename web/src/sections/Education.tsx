import { SectionHeader } from '../components/SectionHeader';
import { profile } from '../data/profile';

export function Education() {
  const e = profile.education;
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader index="04" label="education" />
        <div className="edu-card reveal">
          <div className="edu">
            <div>
              <h3 className="edu__degree">{e.degree}</h3>
              <div className="edu__school">{e.school}</div>
            </div>
            <div className="edu__meta">
              <div className="edu__years">{e.years}</div>
              <div className="edu__gpa">{e.gpa}</div>
            </div>
          </div>
          <p className="edu__note">{e.note}</p>
        </div>
      </div>
    </section>
  );
}
