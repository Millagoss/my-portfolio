export const profile = {
  name: "Million Gossaye Lema",
  roles: ["Full-Stack Developer", "Telegram Bot Developer", "UI/UX Designer"],
  email: "millagoss19@gmail.com",
  phone: "+251 923 624 645",
  location: "Addis Ababa, Ethiopia",
  linkedin: "https://linkedin.com/in/million-gossaye",
  github: "https://github.com/Millagoss",
  summary:
    "Versatile full-stack developer building scalable, high-performance applications — SaaS platforms, enterprise systems, and Telegram bots. Deep in the TypeScript ecosystem, from Next.js and React Native on the front to NestJS, Hono, and PostgreSQL on the back. Obsessive about clean architecture, CI/CD automation, and interfaces people actually enjoy using.",
};

export const stats = [
  { value: "3+", label: "years shipping production software" },
  { value: "5", label: "companies, from startups to enterprise" },
  { value: "60k", label: "members grown on one bot campaign" },
  { value: "8+", label: "platforms built or led end-to-end" },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    company: "AdilasTech",
    role: "Frontend Developer",
    period: "Jul 2026 — Present",
    location: "Remote",
    summary:
      "Enterprise IT solutions for supply chain, logistics, and business system integration.",
    highlights: [
      "Build and maintain responsive front-end interfaces for enterprise supply chain and logistics platforms.",
      "Develop UI for ConnectShip shipping, warehouse management, and cloud inventory solutions.",
      "Collaborate with cross-functional teams on client-facing dashboards and internal tooling.",
      "Translate complex business workflows into clean, accessible user experiences.",
    ],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    company: "Perago Systems",
    role: "Full-Stack Developer",
    period: "2025 — Jul 2026",
    location: "Addis Ababa",
    summary:
      "Enterprise procurement, done properly — from purchase request to audit log.",
    highlights: [
      "Develop and maintain an enterprise Procurement Management System covering purchase requests, approvals, vendor management, and inventory workflows.",
      "Built scalable APIs with Hono and TypeScript, optimized for performance and reliability.",
      "Implemented role-based access control, approval hierarchies, audit logs, and secure authentication.",
      "Contributing to an AI-powered procurement platform currently in development.",
    ],
    stack: ["Hono", "TypeScript", "Next.js", "React", "PostgreSQL"],
  },
  {
    company: "Muyalogy",
    role: "Full-Stack Developer",
    period: "2023 — Jul 2026",
    location: "Addis Ababa",
    summary:
      "Three platforms under one roof: online learning, SaaS talent development, and a reminder app.",
    highlights: [
      "Muyalogy.com — full-stack development of the online learning platform; built the scalable database and API layer.",
      "Built a Telegram community-management bot integrated with the site: moderates discussions, filters unwanted words, removes unauthorized users.",
      "Jiret.com — robust API and database queries with Drizzle ORM; designed a drag-and-drop page builder on Puck, extended far beyond stock capabilities.",
      "Contributed AI-assisted learning features and multi-tenant support.",
      "Ongize.com — built the complete modern, animated marketing site.",
    ],
    stack: ["Next.js", "Drizzle ORM", "Puck", "Telegraf", "Supabase"],
  },
  {
    company: "Family Insurance",
    role: "Front-End Developer",
    period: "2025 — Present",
    location: "Addis Ababa",
    summary:
      "Public website and admin dashboard for a full life & health insurance platform.",
    highlights: [
      "Designed database tables, normalized schemas, and built the RESTful API.",
      "Developed responsive interfaces for both the public site and the admin dashboard.",
      "Translated Figma designs into scalable, maintainable front-end components.",
      "Contributed UI/UX improvements for accessibility across the system.",
    ],
    stack: ["React", "REST APIs", "Figma", "Tailwind CSS"],
  },
  {
    company: "Royd Tech Solutions",
    role: "Software Developer",
    period: "2024",
    location: "Addis Ababa",
    summary:
      "Led the management portal for Eposea, a conference management platform.",
    highlights: [
      "Led development of the portal for events, speakers, sponsors, and delegates.",
      "Built event scheduling, speaker management, registration & tracking, and organizer analytics dashboards.",
      "Developed a content-driven blog platform with dynamic rendering, category filtering, and a custom CMS — improving SEO and engagement.",
    ],
    stack: ["Next.js", "Redux", "React Query", "Tailwind CSS", "Mantine"],
  },
  {
    company: "Blih Marketing",
    role: "Telegram Bot Developer",
    period: "2023 — 2024",
    location: "Addis Ababa",
    summary:
      "A referral bot that moved real numbers for multiple banks' channels.",
    highlights: [
      "Generated unique referral codes, tracked counts, and announced winners automatically every week.",
      "Implemented anti-fraud detection to catch fake referrals.",
      "Grew a bank's Telegram membership from 39,000 to 60,000 in one month — 40,000 new registered users in the same period.",
    ],
    stack: ["Telegraf", "MySQL", "JavaScript"],
  },
];

export interface Project {
  index: string;
  title: string;
  kind: string;
  description: string;
  impact: string;
  stack: string[];
  link: string;
}

export const projects: Project[] = [
  {
    index: "01",
    title: "Jiret",
    kind: "SaaS · Learning & Talent",
    description:
      "Multi-tenant learning and talent-development platform. Designed a drag-and-drop page builder on Puck, extending it well past standard capabilities, plus AI-assisted learning features.",
    impact: "Non-developers ship custom pages without touching code.",
    stack: ["Next.js", "Drizzle ORM", "Puck", "PostgreSQL"],
    link: "https://jiret.com",
  },
  {
    index: "02",
    title: "Bank Referral Bot",
    kind: "Telegram · Growth Engine",
    description:
      "Referral engine with unique invite codes, automated weekly winner announcements, and anti-fraud detection, deployed across multiple banks' channels.",
    impact: "39k → 60k members in one month; 40k new registrations.",
    stack: ["Telegraf", "MySQL", "JavaScript"],
    link: "https://github.com/Millagoss",
  },
  {
    index: "03",
    title: "Procurement Platform",
    kind: "Enterprise · Internal Tooling",
    description:
      "End-to-end procurement management: purchase requests, approval hierarchies, vendor management, inventory workflows, audit logs, and RBAC — now evolving into an AI-powered platform.",
    impact: "One system replacing scattered, manual approval chains.",
    stack: ["Hono", "TypeScript", "Next.js", "RBAC"],
    link: "https://peragosystems.com",
  },
  {
    index: "04",
    title: "Eposea",
    kind: "Platform · Conference Management",
    description:
      "Management portal for events, speakers, sponsors, and delegates — scheduling, registration tracking, and analytics dashboards for organizers.",
    impact: "Organizers run entire conferences from a single portal.",
    stack: ["Next.js", "Redux", "React Query", "Mantine"],
    link: "https://eposea.com",
  },
  {
    index: "05",
    title: "Muyalogy",
    kind: "EdTech · Learning Platform",
    description:
      "Online learning platform with a scalable database and API core, paired with a Telegram moderation bot that filters content and manages community access automatically.",
    impact: "Community moderation runs itself, 24/7.",
    stack: ["Next.js", "Supabase", "Telegraf"],
    link: "https://muyalogy.com",
  },
  {
    index: "06",
    title: "Family Insurance",
    kind: "FinTech · Insurance",
    description:
      "Public website and admin dashboard for a fully-fledged life and health insurance platform, built from normalized schemas up to Figma-faithful interfaces.",
    impact: "Policy management made legible for staff and customers.",
    stack: ["React", "REST API", "Figma", "Tailwind"],
    link: "https://familyinsurance.et",
  },
];

export const skillGroups = [
  {
    title: "Front-End",
    skills: [
      "Next.js", "React", "TanStack", "Redux", "React Query",
      "Tailwind CSS", "Mantine", "Chakra UI", "shadcn/ui",
      "SSR / CSR optimization", "Caching", "Responsive design",
    ],
  },
  {
    title: "Back-End & Databases",
    skills: [
      "Node.js", "NestJS", ".NET", "Hono", "Express",
      "PostgreSQL", "DynamoDB", "MySQL", "Prisma", "Drizzle ORM",
      "REST API design", "Auth & RBAC",
    ],
  },
  {
    title: "Telegram Bots",
    skills: [
      "Telegraf", "Webhooks", "Polling", "Event handling",
      "Rate limiting", "Spam prevention", "Session management",
    ],
  },
  {
    title: "Mobile",
    skills: [
      "React Native", "Expo", "Expo-specific hooks",
      "Theming", "Performance optimization",
    ],
  },
  {
    title: "Cloud & Tooling",
    skills: [
      "AWS S3", "AWS Lambda", "Vercel", "Azure", "Cloudflare",
      "Docker", "Firebase", "Supabase", "CI/CD", "GitHub", "GitLab", "Figma",
    ],
  },
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "SQL", "C# / .NET", "CSS"],
  },
];

export const certificates = [
  { issuer: "Meta", title: "React.js" },
  { issuer: "Meta", title: "Front-End Development" },
  { issuer: "Meta", title: "Version Control" },
  { issuer: "IBM", title: "Cloud Computing" },
];

export const education = {
  degree: "BSc, Computer Science",
  school: "Unity University",
  period: "2016 — 2021",
  location: "Addis Ababa, Ethiopia",
};

export const languages = ["English", "Amharic"];

export const marqueeItems = [
  "TypeScript", "Next.js", "React", "NestJS", "Hono", "PostgreSQL",
  "Drizzle", "Prisma", "React Native", "AWS", "Docker", "Supabase",
  "Telegraf", "TanStack", "Cloudflare", "Vercel",
];
