export type ProjectLink = { href: string; label: string; kind: 'demo' | 'code' };

export type Shot = { src: string; alt: string; width: number; height: number; position?: string };

export type FeaturedProject = {
  title: string;
  tag: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: ProjectLink;
  /** Text in the browser frame's address bar; defaults to the link's host. */
  frameLabel?: string;
  image: Shot;
  /** Optional second shot that fades in on hover. */
  hoverImage?: Shot;
};

export type SideProject = {
  title: string;
  summary: string;
  stack: string;
  link?: ProjectLink;
};

export const featured: FeaturedProject[] = [
  {
    title: 'EG Electronics — E-Commerce Platform',
    tag: 'paid client project · 2025',
    summary:
      'A production-ready full-stack store, delivered directly for a paying client.',
    highlights: [
      'Product management, cart, auth and order-processing workflows',
      'Worked with the client directly on requirements and fixes',
      'Responsive across desktop and mobile',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Neon Postgres'],
    link: { href: 'https://mvc-electronic.vercel.app/', label: 'Live demo', kind: 'demo' },
    image: { src: '/projects/eg-electronics.webp', alt: 'EG Electronics storefront home page', width: 1600, height: 800 },
  },
  {
    title: 'Fake News Detection Platform',
    tag: 'AI platform',
    summary:
      'A full-stack platform that scores how credible a news article is.',
    highlights: [
      'AI-powered credibility scoring',
      'C# / .NET backend with a React + Tailwind frontend',
      'Real-time interaction design',
    ],
    stack: ['C# / .NET', 'React', 'Tailwind', 'AI scoring'],
    link: {
      href: 'https://fake-news-detector-thesis-topic.vercel.app/landing.html',
      label: 'Live demo',
      kind: 'demo',
    },
    image: {
      src: '/projects/truthlens.webp',
      alt: 'TruthLens AI fake news detector landing page',
      width: 1600,
      height: 800,
    },
  },
  {
    title: '3D Survival Game',
    tag: 'game · unity',
    summary:
      'A 3D survival game built in Unity with C#.',
    highlights: [
      'Custom game logic and UI',
      'Time-based objectives that ramp up the pressure the longer you survive',
    ],
    stack: ['C#', 'Unity'],
    link: { href: 'https://github.com/NaserDemiraj/3D-UnityGame', label: 'View code', kind: 'code' },
    frameLabel: 'survival.exe — level 1',
    image: {
      src: '/projects/survival-village.webp',
      alt: 'Third-person view from a rooftop over the island village, with the level, timer and item counter HUD',
      width: 1152,
      height: 740,
      position: '50% 70%',
    },
    hoverImage: {
      src: '/projects/survival-fort.webp',
      alt: 'The player overlooking the river, the forest and a walled fort from a hilltop',
      width: 1172,
      height: 738,
      position: '50% 70%',
    },
  },
];

export const sideProjects: SideProject[] = [
  {
    title: 'AI Chatbot — Gemini API',
    summary: "Real-time conversational chatbot integrating Google's Gemini API, exploring async programming.",
    stack: 'Python · HTML/CSS/JS · Gemini',
    link: { href: 'https://github.com/NaserDemiraj/Chatbot', label: 'View code', kind: 'code' },
  },
  {
    title: 'Psychologist Scheduler',
    summary: 'Booking web app with login and persistent storage for managing client appointments.',
    stack: 'React · Node · Next.js · NeonDB',
  },
  {
    title: 'Online Voting System',
    summary: 'Secure voting platform with session management, user validation and database logic.',
    stack: 'PHP · phpMyAdmin · JS',
  },
  {
    title: 'IoT Drone Control',
    summary: 'Drone control with balancing algorithms and a web interface driving the flight logic.',
    stack: 'Python · MicroPython · IoT',
    link: { href: 'https://github.com/NaserDemiraj/Drone', label: 'View code', kind: 'code' },
  },
];
