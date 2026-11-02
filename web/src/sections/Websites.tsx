import { useEffect, useRef } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import { SectionHeader } from '../components/SectionHeader';
import { websites, type Website } from '../data/projects';
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap';

// Wide screens: the cards slide sideways while the section is pinned.
const SIDEWAYS = `(min-width: 1024px) and ${MOTION_OK}`;

// A clip plays only while its card is on screen, so the four videos never run at once.
// With reduced motion the poster frame stays.
function SiteClip({ site }: { site: Website }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !matchMedia(MOTION_OK).matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto';
          video.play().catch(() => {});
        } else video.pause();
      },
      { threshold: 0.45 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="site__clip"
      src={site.clip}
      poster={site.poster}
      muted
      loop
      playsInline
      preload="none"
      width={960}
      height={600}
      aria-label={site.alt}
    />
  );
}

function SiteCard({ site, index }: { site: Website; index: number }) {
  return (
    <article className="site">
      <a className="site__media" href={site.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
        <div className="frame">
          <div className="frame__bar">
            <span className="frame__dots">
              <span />
              <span />
              <span />
            </span>
            <span className="frame__url">{new URL(site.url).host}</span>
            <span className="frame__live">live demo</span>
          </div>
          <div className="frame__view">
            <SiteClip site={site} />
          </div>
        </div>
      </a>
      <div className="site__text">
        <div className="work__tag">
          <span className="work__index">
            {String(index + 1).padStart(2, '0')} / {String(websites.length).padStart(2, '0')}
          </span>
          {site.tag}
        </div>
        <h3 className="work__title">{site.title}</h3>
        <ProjectLinkButton link={{ href: site.url, label: 'Open live demo', kind: 'demo' }} />
        <p className="work__summary">{site.summary}</p>
        <ul className="work__highlights">
          {site.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="tags">
          {site.stack.map((s) => (
            <li key={s} className="tag tag--accent">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Websites() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  // Pin the row and move it sideways as the page scrolls; the bar and counter follow.
  useGSAP(
    () => {
      gsap.matchMedia().add(SIDEWAYS, () => {
        const row = track.current!;
        const distance = () => row.scrollWidth - window.innerWidth;
        gsap.to(row, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${distance() * 0.55}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
              const n = Math.min(websites.length, Math.floor(self.progress * websites.length) + 1);
              if (count.current) count.current.textContent = String(n).padStart(2, '0');
            },
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="websites" ref={root} className="section sites">
      <div className="container">
        <SectionHeader
          index="03"
          label="websites"
          title="Websites with motion"
          aside="Live demos of sites I designed and built for brands and local businesses, with 3D, WebGL and scroll-driven scenes in Albanian and English. The demos run on my own hosting; the businesses' actual websites are hosted separately."
        />
      </div>
      <div ref={pin} className="sites__pin">
        <div className="container sites__hud" aria-hidden="true">
          <span className="sites__count">
            <span ref={count}>01</span> / {String(websites.length).padStart(2, '0')}
          </span>
          <span className="sites__line">
            <span ref={bar} className="sites__bar" />
          </span>
          <span className="sites__hint">scroll →</span>
        </div>
        <div ref={track} className="sites__track">
          {websites.map((s, i) => (
            <SiteCard key={s.title} site={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
