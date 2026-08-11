export const site = {
  title: "Mathias Bala — Backend Engineer",
  description:
    "Backend engineer. Python, Django, AI infrastructure. Available for remote contract work from WAT / UTC+1.",
  url: "https://mathiasbala.com",
};

export const hero = {
  name: "Mathias Bala",
  summary:
    "Backend engineer. Python, Django, AI infrastructure. I build systems that run in production.",
  availability:
    "Available for remote contract work. WAT / UTC+1, overlapping European and US Eastern hours.",
  links: [
    { label: "Email", href: "mailto:mathias@mathiasbala.com" },
    { label: "GitHub", href: "https://github.com/balamathias" },
    { label: "LinkedIn", href: "https://linkedin.com/in/matiecodes" },
    { label: "Download CV", href: "/Mathias_Bala_Backend_Engineer.pdf" },
  ],
};

export type Project = {
  name: string;
  description: string;
  points: string[];
  tags: string[];
  links: { label: string; href: string }[];
};

export const projectsLabel = "Selected work";

export const projects: Project[] = [
  {
    name: "Karamelion",
    description: "AI document intelligence platform for Nigerian law students.",
    points: [
      "200+ users on a live product with paying subscribers",
      "Full backend on Django and DRF serving a web client, a React Native mobile client, and admin tooling from one versioned REST API",
      "LLM orchestration layer routing across multiple providers by task and cost, with structured output validation, retry and fallback, and citation grounding against source documents",
      "Document ingestion and retrieval pipeline: parsing, chunking, embedding, citation-linked retrieval, handwritten note ingestion via a multimodal model",
    ],
    tags: [
      "Python",
      "Django",
      "DRF",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Docker",
      "AWS EC2",
      "OpenAI",
      "Gemini",
    ],
    links: [{ label: "Live product", href: "https://karamelion.com" }],
  },
  {
    name: "NDVS",
    description:
      "National identity infrastructure for Nigerian law students, under LAWSAN.",
    points: [
      "Sole engineer. 820+ students onboarded to date",
      "Multi-step onboarding, automated identification number generation, transactional email, payment-gated registration",
      "Role-based access control across national, zonal, state, and campus tiers",
      "Owned deployment, migrations, monitoring, and incident response for a system used by a national student body",
    ],
    tags: ["Python", "Django REST Framework", "PostgreSQL", "RBAC"],
    links: [{ label: "Live product", href: "https://id.lawsan.org" }],
  },
  {
    name: "Green Livestock Africa",
    description:
      "Livestock services platform for smallholder farmers across Africa.",
    points: [
      "Sole engineer. Next.js client on a Django and DRF backend",
      "Livestock marketplace with per-animal provenance: documented genetics and linked health records",
      "Herd health cards generating species-specific vaccination and treatment schedules for goats, sheep, cattle, and poultry",
      "Farm store, hatchery orders, insemination bookings, and training cohort enrolment served from one REST API",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Python",
      "Django",
      "DRF",
      "PostgreSQL",
    ],
    links: [
      { label: "Live product", href: "https://greenlivestockafrica.com" },
    ],
  },
  {
    name: "LSS ABU Voting System",
    description: "Election platform for a university student body.",
    points: [
      "6,400+ votes recorded in a single election cycle",
      "300% increase in student participation",
      "Authentication, vote integrity controls, live result tabulation",
    ],
    tags: ["Python", "Django", "PostgreSQL"],
    links: [{ label: "Live product", href: "https://awards.lawsocietyabu.org" }],
  },
];

export const architecture = {
  label: "Architecture",
  caption:
    "Karamelion request path. Long-running AI work stays off the request thread.",
  legend: [
    { key: "sync", text: "Request path" },
    { key: "async", text: "Async path" },
  ],
  scrollHint: "Scroll sideways to see the full path.",
  alt: "Karamelion request path. A web or mobile client calls a Django and DRF API, which reads and writes PostgreSQL. The API hands long-running work to Celery workers, which use Redis as broker and cache. Workers call an AI routing layer that fans out to OpenAI and Gemini, and run the retrieval pipeline: parse, chunk, embed, vector search, citation grounding.",
  nodes: {
    client: "Web / mobile client",
    api: "Django + DRF API",
    db: "PostgreSQL",
    workers: "Celery workers",
    redis: "Redis (broker + cache)",
    router: "AI routing layer",
    models: "OpenAI / Gemini",
    retrievalTitle: "Retrieval",
    retrievalChain: "parse → chunk → embed → vector search → citation grounding",
  },
};

export const experience = {
  label: "Experience",
  roles: [
    {
      role: "Senior Full Stack Developer",
      org: "Benmore Technologies (Chicago, remote)",
      dates: "Sep 2025 — Apr 2026",
    },
    {
      role: "Founder and Lead Backend Engineer",
      org: "Karamelion",
      dates: "2025 — present",
    },
    {
      role: "Deputy Director and Lead Engineer",
      org: "LAWSAN National Identity Commission",
      dates: "2025 — present",
    },
    {
      role: "Chief Technology Officer",
      org: "Dayilo Technologies",
      dates: "2022 — 2023",
    },
  ],
};

export const stack = {
  label: "Stack",
  items: [
    "Python",
    "Django",
    "DRF",
    "FastAPI",
    "Celery",
    "Redis",
    "RabbitMQ",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Nginx",
    "Next.js",
    "TypeScript",
  ],
};

export const footer = {
  links: [
    { label: "mathias@mathiasbala.com", href: "mailto:mathias@mathiasbala.com" },
    { label: "github.com/balamathias", href: "https://github.com/balamathias" },
    {
      label: "linkedin.com/in/matiecodes",
      href: "https://linkedin.com/in/matiecodes",
    },
  ],
  location: "Nigeria · WAT / UTC+1",
};

export const notFoundPage = {
  code: "404",
  heading: "That page doesn't exist.",
  body: "The site is a single page, so there is not much to get lost in. Everything lives at the root.",
  link: { label: "Back to the start", href: "/" },
};

export const person = {
  name: "Mathias Bala",
  jobTitle: "Backend Engineer",
  email: "mathias@mathiasbala.com",
  sameAs: [
    "https://github.com/balamathias",
    "https://linkedin.com/in/matiecodes",
  ],
  knowsAbout: [
    "Python",
    "Django",
    "Django REST Framework",
    "Celery",
    "PostgreSQL",
    "Redis",
    "AI infrastructure",
    "Backend engineering",
  ],
  addressCountry: "NG",
};
