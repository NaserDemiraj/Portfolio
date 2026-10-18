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
    title: 'AI Receptionist — AI Employee SaaS',
    tag: 'multi-tenant SaaS · 2026',
    summary: 'My own multi-tenant SaaS that gives any small business a 24/7 AI employee on its website. Tested with MAMAJ Furniture as the demo business.',
    highlights: [
      'Recommends products from a live catalog, captures leads and books appointments',
      'Answers in English, Albanian or German, detected per message, and hands off to a human agent',
      'Every business is isolated by org-scoped tenancy; each also gets a generated public website',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase Postgres', 'Prisma', 'Groq tool use'],
    link: { href: 'https://github.com/NaserDemiraj/AiReceptionist', label: 'View code', kind: 'code' },
    frameLabel: 'ai-receptionist · mamaj demo',
    image: {
      src: '/projects/ai-receptionist-widget.webp',
      alt: 'The chat widget on the MAMAJ Furniture demo store: asked for a grey corner sofa under €900, Sara recommends the Oslo Corner Sofa with product cards',
      width: 1400,
      height: 700,
    },
    hoverImage: {
      src: '/projects/ai-receptionist-inbox.webp',
      alt: 'The business dashboard inbox showing the same conversation, handled by the AI with a searchProducts tool call',
      width: 1400,
      height: 700,
    },
  },
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
    title: 'MAMAJ — Furniture Website',
    tag: 'live client website · built with a friend',
    summary: 'The website for MAMAJ, a workshop making handmade, made-to-order furniture, in Albanian.',
    highlights: [
      'Collections browsable by room: living room, bedroom, kitchen and dining',
      'Newest designs, the workshop story and a contact page',
      'Designed and built together with a friend; live on Vercel',
    ],
    stack: ['React', 'Vite', 'React Router', 'CSS'],
    link: { href: 'https://mobileria-mamaj.vercel.app/', label: 'Live site', kind: 'demo' },
    image: {
      src: '/projects/mamaj-furniture.webp',
      alt: 'MAMAJ furniture website hero: "Mjeshtëri në çdo detaj. Elegancë në çdo ambient." over a wooden interior',
      width: 1600,
      height: 800,
    },
  },
  {
    title: 'HumanFlow — AI Writing Platform',
    tag: 'AI SaaS · 2026',
    summary: 'A full writing workspace: humanize, detect, check and rewrite text, with accounts, quotas and a public API.',
    highlights: [
      '14 rewrite modes streamed token by token, chained up to 6 deep, reviewed in a word-level diff',
      'Rewrites inside your original DOCX without breaking styles, tables or images; OCR for scans',
      'Plans and quotas, document history, exports, and a developer API with per-key rate limits',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'Neon Postgres', 'Groq'],
    link: { href: 'https://github.com/NaserDemiraj/AiHumanizer', label: 'View code', kind: 'code' },
    frameLabel: 'humanflow · local build',
    image: {
      src: '/projects/humanflow.webp',
      alt: 'HumanFlow landing page: "Write naturally. Publish confidently." beside an editor preview with human and AI scores',
      width: 1600,
      height: 800,
    },
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
    title: 'Contact Cleaner',
    summary: 'Finds the duplicate contacts Excel misses, privately in the browser: files are never uploaded. Free, with a paid Pro edition.',
    stack: 'JavaScript · SheetJS · strict CSP',
    link: { href: 'https://naserdemiraj.github.io/contact-cleaner/', label: 'Live tool', kind: 'demo' },
  },
  {
    title: 'Shopware 6 QA Automation',
    summary: 'A manual test plan, a performance bug report and Playwright tests covering add-to-cart and a full guest checkout.',
    stack: 'Playwright · TypeScript · QA',
    link: { href: 'https://github.com/NaserDemiraj/autoTest', label: 'View code', kind: 'code' },
  },
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
