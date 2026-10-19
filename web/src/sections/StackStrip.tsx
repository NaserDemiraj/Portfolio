import { LazyMount } from '../components/LazyMount';
import LogoLoop, { type LogoItem } from '../components/reactbits/LogoLoop/LogoLoop';
import { skillGroups } from '../data/skills';

const ITEMS = [...skillGroups[0].items, ...skillGroups[1].items];

const logos: LogoItem[] = ITEMS.map((name) => ({
  node: (
    <span className="strip__item">
      <span className="strip__dot" aria-hidden="true" />
      {name}
    </span>
  ),
  title: name,
}));

// A slow marquee of the core stack between the hero and the about section.
export function StackStrip() {
  return (
    <div className="strip">
      {/* Just below the hero: start it a little before it scrolls into view, not at load. */}
      <LazyMount minHeight={28} rootMargin="150px 0px">
        <LogoLoop
          logos={logos}
          speed={42}
          hoverSpeed={12}
          logoHeight={22}
          gap={44}
          fadeOut
          fadeOutColor="#0a0d0c"
          fadeOutWidth={0.16}
          scrollBoost={0.6}
          draggable={false}
          ariaLabel="Languages and frameworks Naser works with"
        />
      </LazyMount>
    </div>
  );
}
