import { useRef, useState, type ReactNode } from 'react';
import ClickSpark from '../components/reactbits/ClickSpark/ClickSpark';
import Magnet from '../components/reactbits/Magnet/Magnet';
import { GitHubIcon, LinkedInBadge, MailIcon, PhoneIcon } from '../components/Icons';
import { SectionHeader } from '../components/SectionHeader';
import { profile } from '../data/profile';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

function Magnetic({ children }: { children: ReactNode }) {
  // Touch taps would leave the button pulled toward the last touch point.
  const fine = useMediaQuery(FINE_POINTER);
  return (
    <Magnet padding={70} magnetStrength={5} maxOffset={14} disabled={!fine}>
      {children}
    </Magnet>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      {copied ? 'copied ✓' : 'copy'}
    </button>
  );
}

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const split = SplitText.create('.contact__title', { type: 'words,lines', mask: 'lines' });
        gsap.from(split.words, {
          yPercent: 115,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.contact__title', start: 'top 85%', once: true },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="contact">
      <ClickSpark sparkColor="#06140d" sparkSize={12} sparkRadius={26} sparkCount={9} duration={480}>
        <div className="container contact__inner">
          <SectionHeader index="05" label="contact" tone="ink" />
          <h2 className="contact__title">
            Let's build
            <br />
            something.
          </h2>
          <p className="contact__lead">
            Have a project in mind or just want to talk shop? Email is the fastest way to reach me.
          </p>
          <div className="contact__links">
            <div className="contact__email">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn btn--dark">
                  <MailIcon />
                  {profile.email}
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
            <Magnetic>
              <a href={profile.phoneHref} className="btn btn--outline-dark">
                <PhoneIcon />
                {profile.phone}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.github} target="_blank" rel="noopener" className="btn btn--outline-dark">
                <GitHubIcon />
                {profile.githubLabel}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.linkedin} target="_blank" rel="noopener" className="btn btn--outline-dark">
                <LinkedInBadge />
                {profile.linkedinLabel}
              </a>
            </Magnetic>
          </div>
        </div>
      </ClickSpark>
    </section>
  );
}
