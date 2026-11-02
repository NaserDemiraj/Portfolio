export type Service = {
  label: string;
  title: string;
  summary: string;
  points: string[];
  /** Work on this page that shows it. */
  examples: string;
};

export const services: Service[] = [
  {
    label: 'websites',
    title: 'Websites that sell',
    summary: 'A fast, bilingual site with motion that suits your brand, and that you can edit yourself.',
    points: [
      '3D, WebGL and scroll scenes where they help, calm everywhere else',
      'Your own CMS for products, photos and prices',
      'WhatsApp booking and orders, share cards, hosting set up',
    ],
    examples: 'Golden Eagle · Rina Couture · Bella Casa',
  },
  {
    label: 'web apps',
    title: 'Web apps & SaaS',
    summary: 'Accounts, dashboards and the database behind them, from the first idea to a product people use.',
    points: [
      'React or Next.js with a Node API and Postgres',
      'Logins, roles, plans and admin dashboards',
      'Tested and deployed, with a public API when you need one',
    ],
    examples: 'HumanFlow · EG Electronics',
  },
  {
    label: 'ai',
    title: 'AI assistants',
    summary: 'A 24/7 assistant on your site that answers customers, recommends products and captures leads.',
    points: [
      'Answers in Albanian, English or German',
      'Works from your own catalogue and policies',
      'Hands the conversation to a person when it should',
    ],
    examples: 'AI Receptionist',
  },
];

export const steps = [
  { title: 'Call', text: 'We agree on what the site or app must do, and for whom.' },
  { title: 'Design', text: 'You see a first version early, on a private preview link.' },
  { title: 'Build', text: 'It grows on that link, so you follow every step.' },
  { title: 'Launch', text: 'Domain, hosting and a handover so you can run it.' },
];
