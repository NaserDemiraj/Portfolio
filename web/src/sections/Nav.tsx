import { profile } from '../data/profile';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#work', label: 'work' },
  { href: '#contact', label: 'contact' },
];

export function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="Back to top">
          <span className="logo-mark">ND</span>
          <span className="nav__domain">naser.dev</span>
        </a>
        <div className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noopener" className="nav__li" aria-label="LinkedIn">
            in
          </a>
        </div>
        <a href={profile.cv} download className="btn btn--ghost btn--sm">
          resume ↓
        </a>
      </div>
    </nav>
  );
}
