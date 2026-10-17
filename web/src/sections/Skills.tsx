import type { CSSProperties, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain01Icon,
  ChipIcon,
  CodeIcon,
  ComputerTerminal01Icon,
  GameController01Icon,
  SmartPhone01Icon,
} from '@hugeicons/core-free-icons';
import MagicBento, { type MagicBentoItem } from '../components/reactbits/MagicBento/MagicBento';
import { SectionHeader } from '../components/SectionHeader';
import { skillGroups } from '../data/skills';
import { useMediaQuery } from '../hooks/useMediaQuery';

const icon = (glyph: typeof CodeIcon) => <HugeiconsIcon icon={glyph} size={16} strokeWidth={1.8} />;

// A tiny terminal for the hero card: the web stack as command output.
function WebTerminal() {
  const lines: [string, ReactNode][] = [
    ['$', <span className="bt__cmd">naser stack --web</span>],
    ['›', 'react · next.js · typescript · tailwind'],
    ['›', 'node.js · .net · php'],
    ['›', 'neon postgres · sql'],
    ['✓', <span className="bt__ok">built: ai-receptionist, humanflow, eg-electronics</span>],
  ];
  return (
    <div className="bt">
      {lines.map(([prefix, text], i) => (
        <div key={i} className="bt__line" style={{ animationDelay: `${0.25 + i * 0.18}s` }}>
          <span className="bt__prefix">{prefix}</span>
          {text}
        </div>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="bento-chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const items: MagicBentoItem[] = [
  {
    id: 'web',
    icon: icon(CodeIcon),
    label: 'full-stack web',
    title: 'Web, front to back',
    description: 'Storefronts, booking apps and AI platforms — UI, API and database.',
    visual: <WebTerminal />,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 'ai',
    icon: icon(AiBrain01Icon),
    label: 'ai',
    title: 'AI integrations',
    description: 'An AI receptionist SaaS, the HumanFlow writing platform, and the Groq assistant on this page.',
  },
  {
    id: 'games',
    icon: icon(GameController01Icon),
    label: 'games',
    title: 'Unity + C#',
    description: 'A 3D survival game with custom logic, UI and timed objectives.',
  },
  {
    id: 'mobile',
    icon: icon(SmartPhone01Icon),
    label: 'mobile',
    title: 'Kotlin & Swift',
    description: 'Kotlin for Android and Swift for iOS, in Android Studio and Xcode.',
  },
  {
    id: 'iot',
    icon: icon(ChipIcon),
    label: 'iot',
    title: 'Embedded & IoT',
    description: 'MicroPython drone control with balancing algorithms and a web UI.',
  },
  {
    id: 'languages',
    label: '10 languages',
    title: 'Languages',
    visual: <Chips items={skillGroups[0].items} />,
    colSpan: 2,
  },
  {
    id: 'tools',
    icon: icon(ComputerTerminal01Icon),
    label: 'foundations & tools',
    title: 'Databases, APIs & networks',
    description: 'Database design, API integration and networking.',
    visual: <Chips items={skillGroups[2].items} />,
    colSpan: 2,
  },
];

// Re-tint MagicBento's neutral dark theme to the site's green-black surfaces.
const BENTO_THEME = {
  '--mb-surface': 'linear-gradient(180deg, #111915 0%, #0c120f 100%)',
  '--mb-edge': 'rgba(116, 224, 163, 0.09)',
  '--mb-highlight': 'rgba(255, 255, 255, 0.04)',
  '--mb-well': 'rgba(116, 224, 163, 0.03)',
  '--mb-well-edge': 'rgba(116, 224, 163, 0.1)',
  '--mb-ink': '#f2f6f4',
  '--mb-muted': '#8a978f',
  '--mb-faint': '#5a6b63',
  '--mb-line': 'rgba(116, 224, 163, 0.12)',
} as CSSProperties;

export function Skills() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 640px)');

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          index="02"
          label="skills"
          title="What I build with"
          aside="Ten languages and the frameworks around them, across web, mobile, games and hardware."
        />
        <div className="reveal">
          <MagicBento
            className="bento"
            items={items}
            columns={4}
            rowHeight={compact ? 140 : 210}
            gap={14}
            radius={16}
            glowColor="#74e0a3"
            textAutoHide={false}
            enableBorderGlow
            enableSpotlight
            spotlightRadius={320}
            enableStars={!reduce}
            particleCount={14}
            enableTilt={false}
            clickEffect
            style={BENTO_THEME}
          />
        </div>
      </div>
    </section>
  );
}
