import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

// Kosovo keeps Central European Time.
const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Belgrade',
  hour: '2-digit',
  minute: '2-digit',
});

function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <time dateTime={now.toISOString()}>{clock.format(now)}</time>;
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="footer__local">
          <span className="footer__pulse" aria-hidden="true" />
          {profile.location} · <LocalTime />
        </span>
        {/* No element has id="top", so Lenis (and the browser) treat #top as the page top. */}
        <a href="#top" className="footer__top">
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
