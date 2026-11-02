export const profile = {
  name: 'Naser Demiraj',
  role: 'full-stack software engineer',
  location: 'Prishtina, Kosovo',
  email: 'naserdemiraj16@gmail.com',
  phone: '+383 49 121 548',
  phoneHref: 'tel:+38349121548',
  whatsapp: 'https://wa.me/38349121548',
  github: 'https://github.com/NaserDemiraj',
  githubLabel: 'github.com/NaserDemiraj',
  linkedin: 'https://www.linkedin.com/in/naser-demiraj-662a61418/',
  linkedinLabel: 'linkedin.com/in/naser-demiraj',
  // the ?v= changes whenever the CV does, so browsers never show a cached old copy
  cv: '/Naser_Demiraj_CV.pdf?v=2026-11-03',
  intro:
    'I build full-stack web, mobile, game and IoT systems — from AI SaaS platforms and commerce backends to 3D, motion-rich websites for brands and local businesses. Computer Science graduate of AAB University, GPA 9.9.',
  about: {
    lead: 'I build complete products, end to end: two AI SaaS platforms, a paid e-commerce store for a client, an AI fact-checker for my thesis and five live websites for brands and local businesses.',
    body: "My work spans web, mobile, games, AI and IoT. I care about what people actually feel: a page that stays fast on a cheap phone, motion that helps instead of distracting, and pages in the languages the client chooses. I'm comfortable running a project myself, from the first call with a client to launch.",
  },
  stats: [
    { value: 9.9, decimals: 1, suffix: '', label: 'GPA / 10' },
    { value: 15, decimals: 0, suffix: '+', label: 'projects built' },
    { value: 10, decimals: 0, suffix: '', label: 'languages' },
  ],
  education: {
    degree: 'BSc Computer Science — Professional Programming',
    school: 'AAB University · Prishtina, Kosovo',
    years: '2023 — 2026',
    gpa: 'Graduated · GPA 9.9 / 10',
    note: 'Recognized for academic excellence and offered early job opportunities. Languages: Albanian (native), English (C1).',
  },
} as const;
