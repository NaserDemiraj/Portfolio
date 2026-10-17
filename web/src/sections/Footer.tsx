import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built in {profile.location}</span>
      </div>
    </footer>
  );
}
