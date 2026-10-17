import { profile } from '../data/profile';

export function Education() {
  const e = profile.education;
  return (
    <section id="education" className="section">
      <div className="container reveal">
        <div className="secrow">
          <div className="eyebrow">// 04 education</div>
          <div className="secrow__body">
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
      </div>
    </section>
  );
}
