export const profile = {
  name: 'Naser Demiraj',
  role: 'full-stack software engineer',
  location: 'Prishtina, Kosovo',
  email: 'naserdemiraj16@gmail.com',
  phone: '+383 49 121 548',
  phoneHref: 'tel:+38349121548',
  github: 'https://github.com/NaserDemiraj',
  githubLabel: 'github.com/NaserDemiraj',
  linkedin: 'https://www.linkedin.com/in/naser-demiraj-662a61418/',
  linkedinLabel: 'linkedin.com/in/naser-demiraj',
  cv: '/Naser_Demiraj_CV.pdf',
  intro:
    'I build full-stack web, mobile, game and IoT systems — from serverless commerce platforms to AI tooling and embedded drone control. Computer Science graduate of AAB University, GPA 9.9.',
  about: {
    lead: "Ambitious and adaptable, I'm deeply passionate about full-stack development and mastering new technologies — delivering efficient, clean and highly usable solutions.",
    body: "My work spans web, mobile, game development, AI and IoT. I pair strong public-speaking and team-leadership skills with a drive to ship impactful, production-ready results, and I'm eager to contribute to open-source communities.",
  },
  stats: [
    { value: 9.9, decimals: 1, suffix: '', label: 'GPA / 10' },
    { value: 10, decimals: 0, suffix: '+', label: 'projects built' },
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
