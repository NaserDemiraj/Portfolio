export type ProjectLink = { href: string; label: string; kind: 'demo' | 'code' };

export type FeaturedProject = {
  title: string;
  tag: string;
  summary: string;
  stack: string[];
  link?: ProjectLink;
  image?: { src: string; alt: string };
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
      'A production-ready full-stack store with product management, cart, authentication and order-processing workflows. Delivered directly for a paying client, optimized for desktop and mobile.',
    stack: ['React', 'TypeScript', 'Node.js', 'Neon Postgres'],
    link: { href: 'https://mvc-electronic.vercel.app/', label: 'Live demo', kind: 'demo' },
    image: { src: '/projects/eg-electronics.webp', alt: 'EG Electronics storefront home page' },
  },
  {
    title: 'Fake News Detection Platform',
    tag: 'AI platform',
    summary:
      'Full-stack platform with AI-powered credibility scoring and real-time interaction design — a .NET backend paired with a React + Tailwind frontend.',
    stack: ['C# / .NET', 'React', 'Tailwind', 'AI scoring'],
    link: {
      href: 'https://fake-news-detector-thesis-topic.vercel.app/landing.html',
      label: 'Live demo',
      kind: 'demo',
    },
    image: { src: '/projects/truthlens.webp', alt: 'TruthLens AI fake news detector landing page' },
  },
  {
    title: '3D Survival Game',
    tag: 'game · unity',
    summary:
      'A 3D survival game built in Unity with C# — custom game logic, UI and time-based objectives that ramp up the pressure the longer you survive.',
    stack: ['C#', 'Unity'],
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
