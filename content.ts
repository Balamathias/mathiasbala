// Every string on the page lives here. Components read from this file and never
// hardcode copy. Change the words here; the layout follows.

export const site = {
  title: "Mathias Bala — Backend Engineer",
  description:
    "Backend engineer. Python, Django, AI infrastructure. Available for remote contract work from WAT / UTC+1.",
  url: "https://mathiasbala.com",
  wordmark: "mathias.bala",
  skipLink: "Skip to content",
};

/** A heading with one phrase set in the serif italic accent face. */
export type Accented = { pre: string; accent: string; post?: string };

export const contact = {
  email: "mathias@mathiasbala.com",
  github: "https://github.com/balamathias",
  linkedin: "https://linkedin.com/in/matiecodes",
  cv: "/Mathias_Bala_Backend_Engineer.pdf",
};

/**
 * Working window in West Africa Time (UTC+1, no daylight saving), 24h clock.
 * Drives the live time-zone overlap strip in the hero. Adjust to your real
 * hours — the overlap text is computed from these two numbers.
 */
export const workHours = { start: 9, end: 19, zone: "WAT", utcOffset: 1 };

export const nav = [
  { id: "work", label: "Work" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const status = {
  available: "Available",
  zoneFallback: "WAT · UTC+1",
};

export const hero = {
  name: "Mathias Bala",
  nameLines: ["Mathias", "Bala"],
  summary:
    "Backend engineer. Python, Django, AI infrastructure. I build systems that run in production.",
  badge: "Available for remote contract work",
  credential: "Mercor Professional",
  role: "Backend engineer — Python, Django, AI infrastructure. Next.js and React Native when the product needs it.",
  headline: { pre: "I build systems that ", accent: "run in production." } as Accented,
  availability:
    "Available for remote contract work. WAT / UTC+1, overlapping European and US Eastern hours.",
  primary: { label: "Email me", href: `mailto:${contact.email}` },
  secondary: { label: "Download CV", href: contact.cv },
  links: [
    { label: "GitHub", href: contact.github, icon: "github" as const },
    { label: "LinkedIn", href: contact.linkedin, icon: "linkedin" as const },
  ],
};

export const overlap = {
  label: "Time-zone overlap",
  mine: "My hours",
  yours: "Your 9–5",
  sameZone: "We share a time zone — full overlap.",
  // Rendered as: `${hours}h overlap with your working day`
  overlapSuffix: "overlap with your working day",
  noOverlap: "Little natural overlap — async-first, with scheduled calls.",
  yourTime: "your time",
};

/**
 * The hero "trace" card. An illustrative span waterfall of one Karamelion
 * request: the API answers fast and hands AI work to the async path. Bar
 * positions are percentages of the card width, not real measurements — the
 * card says so.
 */
export const trace = {
  title: "trace",
  route: "POST /api/v1/ask",
  disclaimer: "illustrative",
  axis: ["0", "request", "async →"],
  spans: [
    { name: "http.request", start: 0, width: 22, kind: "sync" },
    { name: "auth.verify", start: 2, width: 4, kind: "sync" },
    { name: "postgres.query", start: 6, width: 8, kind: "sync" },
    { name: "celery.enqueue", start: 14, width: 4, kind: "sync" },
    { name: "← 202 Accepted", start: 22, width: 0, kind: "mark" },
    { name: "worker.retrieve", start: 24, width: 74, kind: "async" },
    { name: "embed + search", start: 28, width: 18, kind: "async" },
    { name: "ai.router → model", start: 46, width: 40, kind: "async" },
    { name: "citation.ground", start: 86, width: 12, kind: "async" },
  ] as { name: string; start: number; width: number; kind: "sync" | "async" | "mark" }[],
  footer: [
    { key: "sync", text: "request path" },
    { key: "async", text: "off the request thread" },
  ],
};

export const metrics = {
  label: "Impact",
  items: [
    { value: 200, suffix: "+", label: "users on a live product", source: "Karamelion" },
    { value: 820, suffix: "+", label: "students onboarded", source: "NDVS" },
    { value: 6400, suffix: "+", label: "votes in one election", source: "LSS ABU" },
    { value: 300, suffix: "%", label: "rise in participation", source: "LSS ABU" },
  ],
};

export type Project = {
  name: string;
  description: string;
  role?: string;
  scale?: string;
  status: string;
  flagship?: boolean;
  points: string[];
  tags: string[];
  links: { label: string; href: string }[];
};

export const projectsLabel = "Selected work";

export const projectsSection = {
  index: "01",
  label: projectsLabel,
  heading: { pre: "Shipped, live, and ", accent: "used." } as Accented,
  specLabels: { role: "Role", scale: "Scale", status: "Status", stack: "Stack" },
  flagship: "Flagship",
};

export const projects: Project[] = [
  {
    name: "Karamelion",
    description: "AI document intelligence platform for Nigerian law students.",
    role: "Founder, lead backend",
    scale: "200+ users, paying subscribers",
    status: "Live",
    flagship: true,
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
    links: [{ label: "karamelion.com", href: "https://karamelion.com" }],
  },
  {
    name: "NDVS",
    description:
      "National identity infrastructure for Nigerian law students, under LAWSAN.",
    role: "Sole engineer",
    scale: "820+ students",
    status: "Live",
    points: [
      "Sole engineer. 820+ students onboarded to date",
      "Multi-step onboarding, automated identification number generation, transactional email, payment-gated registration",
      "Role-based access control across national, zonal, state, and campus tiers",
      "Owned deployment, migrations, monitoring, and incident response for a system used by a national student body",
    ],
    tags: ["Python", "Django REST Framework", "PostgreSQL", "RBAC"],
    links: [{ label: "id.lawsan.org", href: "https://id.lawsan.org" }],
  },
  {
    name: "Green Livestock Africa",
    description:
      "Livestock services platform for smallholder farmers across Africa.",
    role: "Sole engineer",
    scale: "Marketplace, store, bookings",
    status: "Live",
    points: [
      "Sole engineer. Next.js client on a Django and DRF backend",
      "Livestock marketplace with per-animal provenance: documented genetics and linked health records",
      "Herd health cards generating species-specific vaccination and treatment schedules for goats, sheep, cattle, and poultry",
      "Farm store, hatchery orders, insemination bookings, and training cohort enrolment served from one REST API",
    ],
    tags: ["Next.js", "TypeScript", "Python", "Django", "DRF", "PostgreSQL"],
    links: [
      { label: "greenlivestockafrica.com", href: "https://greenlivestockafrica.com" },
    ],
  },
  {
    name: "LSS ABU Voting System",
    description: "Election platform for a university student body.",
    scale: "6,400+ votes, one cycle",
    status: "Live",
    points: [
      "6,400+ votes recorded in a single election cycle",
      "300% increase in student participation",
      "Authentication, vote integrity controls, live result tabulation",
    ],
    tags: ["Python", "Django", "PostgreSQL"],
    links: [
      { label: "awards.lawsocietyabu.org", href: "https://awards.lawsocietyabu.org" },
    ],
  },
];

/** Compact cards below the case studies: more shipped products, by discipline. */
export type MoreWork = {
  name: string;
  kind: string;
  description: string;
  points: string[];
  tags: string[];
  link: { label: string; href: string };
};

export const moreWork = {
  heading: "More shipped work",
  sub: "Full-stack platforms, a mobile app, and frontend builds.",
  live: "Live",
  items: [
    {
      name: "HighStrat AI",
      kind: "Full stack",
      description:
        "Capital resolution platform that finds spend leakage in enterprise procurement.",
      points: [
        "Reconciles contracts, IT asset inventory, and ERP ledger data to surface overruns and zombie assets",
        "Read-only ingestion of CSV, PDF, and XLSX sources, with AI analysis and human verification of findings",
        "Django backend with a Next.js client",
      ],
      tags: ["Django", "Next.js", "TypeScript", "AI"],
      link: { label: "highstrat.ai", href: "https://highstrat.ai" },
    },
    {
      name: "Jollifier",
      kind: "Full stack",
      description:
        "AI-powered document generation for project teams, built for Jollify IT.",
      points: [
        "Turns ideas into professional project charters, business cases, and more",
        "75+ templates organised across 6 project phases",
        "Credit-based pricing instead of subscriptions; Django backend with a Next.js client",
      ],
      tags: ["Django", "Next.js", "TypeScript", "LLMs"],
      link: { label: "app.jollifyit.com", href: "https://app.jollifyit.com" },
    },
    {
      name: "isubscribe",
      kind: "Mobile",
      description:
        "Nigerian VTU platform for airtime, data, and utility bill payments.",
      points: [
        "Cross-platform mobile app built with React Native",
        "One-stop flows for airtime, data, and utility bills",
      ],
      tags: ["React Native", "TypeScript", "Mobile"],
      link: { label: "isubscribe.ng", href: "https://isubscribe.ng" },
    },
    {
      name: "SafeSurg Robotics",
      kind: "Frontend",
      description:
        "Website for a medical robotics research lab working on surgery, rehabilitation, and earlier diagnosis across Africa.",
      points: [
        "Research areas, active projects, publications, and collaboration and outreach pages",
        "Built on Next.js",
      ],
      tags: ["Next.js", "TypeScript", "Frontend"],
      link: { label: "safesurgrobotics.com", href: "https://safesurgrobotics.com" },
    },
  ] as MoreWork[],
};

export type ArchNodeKey =
  | "client"
  | "api"
  | "db"
  | "workers"
  | "redis"
  | "router"
  | "models"
  | "retrieval";

export const architecture = {
  index: "02",
  label: "Architecture",
  heading: { pre: "Long-running work stays ", accent: "off the request thread." } as Accented,
  caption:
    "Karamelion request path. Long-running AI work stays off the request thread.",
  legend: [
    { key: "sync" as const, text: "Request path" },
    { key: "async" as const, text: "Async path" },
  ],
  showAll: "Show both",
  hint: "Hover or focus a component to inspect it.",
  idle: "Select a component",
  alt: "Karamelion request path. A web or mobile client calls a Django and DRF API, which reads and writes PostgreSQL. The API hands long-running work to Celery workers, which use Redis as broker and cache. Workers call an AI routing layer that fans out to OpenAI and Gemini, and run the retrieval pipeline: parse, chunk, embed, vector search, citation grounding.",
  nodes: {
    client: "Web / mobile client",
    api: "Django + DRF API",
    db: "PostgreSQL",
    workers: "Celery workers",
    redis: "Redis (broker + cache)",
    router: "AI routing layer",
    models: "OpenAI / Gemini",
    retrieval: "Retrieval",
  } as Record<ArchNodeKey, string>,
  retrievalChain: "parse → chunk → embed → vector search → citation grounding",
  notes: {
    client:
      "A web client, a React Native mobile client, and admin tooling — all on one versioned REST API.",
    api: "Django + DRF. Authenticates, validates, persists, enqueues. Never blocks on a model call.",
    db: "Source of truth for users, subscriptions, documents, and citations.",
    workers: "Long-running AI work runs here, off the request thread.",
    redis: "Celery broker and cache.",
    router:
      "Routes across providers by task and cost. Validates structured output, retries, and falls back.",
    models:
      "OpenAI and Gemini, including a multimodal model for handwritten note ingestion.",
    retrieval:
      "Parsing, chunking, embedding, and citation-linked retrieval grounded against source documents.",
  } as Record<ArchNodeKey, string>,
};

export const experience = {
  index: "03",
  label: "Experience",
  heading: { pre: "Where I've ", accent: "built." } as Accented,
  current: "Current",
  roles: [
    {
      role: "Founder and Lead Backend Engineer",
      org: "Karamelion",
      dates: "2025 — present",
      current: true,
    },
    {
      role: "Deputy Director and Lead Engineer",
      org: "LAWSAN National Identity Commission",
      dates: "2025 — present",
      current: true,
    },
    {
      role: "Mercor Professional",
      org: "Mercor",
      dates: "present",
      current: true,
    },
    {
      role: "Senior Full Stack Developer",
      org: "Benmore Technologies (Chicago, remote)",
      dates: "Sep 2025 — Apr 2026",
      current: false,
    },
    {
      role: "Chief Technology Officer",
      org: "Dayilo Technologies",
      dates: "2022 — 2023",
      current: false,
    },
  ],
};

export const stack = {
  index: "04",
  label: "Stack",
  heading: { pre: "Tools, by ", accent: "layer." } as Accented,
  layers: [
    { name: "Interface & mobile", items: ["Next.js", "React", "React Native", "TypeScript"] },
    { name: "Application", items: ["Python", "Django", "DRF", "FastAPI"] },
    { name: "Async & messaging", items: ["Celery", "Redis", "RabbitMQ"] },
    { name: "Data", items: ["PostgreSQL"] },
    { name: "Infrastructure", items: ["Docker", "AWS", "Nginx"] },
  ],
};

export const footer = {
  index: "05",
  label: "Contact",
  heading: { pre: "Have a system that needs to ", accent: "stay up?" } as Accented,
  lede: "Available for remote contract work. WAT / UTC+1, overlapping European and US Eastern hours.",
  copy: "Copy email",
  copied: "Email copied to clipboard",
  links: [
    { label: "github.com/balamathias", href: contact.github },
    { label: "linkedin.com/in/matiecodes", href: contact.linkedin },
    { label: "Download CV", href: contact.cv },
  ],
  location: "Nigeria · WAT / UTC+1",
  localTime: "Local time",
  build: "Static export · last built",
};

export const palette = {
  trigger: "Search",
  placeholder: "Jump to a section, copy email, open a link…",
  empty: "No matches.",
  groups: { navigate: "Navigate", actions: "Actions", products: "Live products" },
  copyEmail: "Copy email address",
  sendEmail: "Send an email",
  cv: "Download CV",
  github: "Open GitHub",
  linkedin: "Open LinkedIn",
  hints: { move: "navigate", select: "select", close: "close" },
};

export const notFoundPage = {
  code: "404",
  status: "HTTP/1.1 404 Not Found",
  headers: ["content-type: text/html", "x-served-by: mathiasbala.com", "cache-control: no-store"],
  heading: "That page doesn't exist.",
  body: "The site is a single page, so there is not much to get lost in. Everything lives at the root.",
  link: { label: "Back to the start", href: "/" },
};

export const person = {
  name: "Mathias Bala",
  jobTitle: "Backend Engineer",
  email: contact.email,
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: [
    "Python",
    "Django",
    "Django REST Framework",
    "Celery",
    "PostgreSQL",
    "Redis",
    "AI infrastructure",
    "Backend engineering",
    "Next.js",
    "React Native",
  ],
  addressCountry: "NG",
};
