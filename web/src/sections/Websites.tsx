import { useEffect, useRef } from 'react';
import { ProjectLinkButton } from '../components/ProjectLinkButton';
import ScrollStack, { ScrollStackItem } from '../components/reactbits/ScrollStack/ScrollStack';
import { SectionHeader } from '../components/SectionHeader';
import { websites, type Website } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MOTION_OK, STACKED } from '../motion/gsap';

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

// Same card as Selected work: the story on the left, the live demo's clip on the right.
function SiteCard({ site, index }: { site: Website; index: number }) {
  return (
    <article className="work__card site">
      <div className="work__text">
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
      <div className="work__media">
        <a className="site__link" href={site.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
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
      </div>
    </article>
  );
}

export function Websites() {
  // Cards pin and stack from tablet width up; otherwise a plain list.
  const stacked = useMediaQuery(STACKED);

  return (
    <section id="websites" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          label="websites"
          title="Websites with motion"
          aside="Live demos of sites I designed and built for brands and local businesses, with 3D, WebGL and scroll-driven scenes. The business sites come with a CMS, so the owners update them themselves. The demos run on my own hosting; the businesses' actual websites are hosted separately."
        />

        {stacked ? (
          <ScrollStack
            className="work__stack"
            useWindowScroll
            smoothScroll={false}
            stackPosition="14%"
            itemDistance={70}
            itemStackDistance={26}
            itemScale={0.04}
            baseScale={0.88}
            dimAmount={0.35}
            holdDistance={40}
          >
            {websites.map((s, i) => (
              <ScrollStackItem key={s.title} itemClassName="work__stack-item">
                <SiteCard site={s} index={i} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="work__list">
            {websites.map((s, i) => (
              <div key={s.title} className="reveal">
                <SiteCard site={s} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
