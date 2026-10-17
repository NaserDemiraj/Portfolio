import { skillGroups } from '../data/skills';

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container reveal">
        <div className="secrow">
          <div className="eyebrow">// 02 skills</div>
          <div className="secrow__body skills">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="skills__title">{g.title}</h3>
                <ul className="tags">
                  {g.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
