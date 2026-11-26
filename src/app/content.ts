import { portfolioProjects } from "./portfolio";

// Semantic page content extracted from recognized recipe sections.
// Oveliqt-specific content (navigation, hero, services, industries) lives at the top.

export type OveliqNavItem = {
  label: string;
  href: string;
  showArrow?: boolean;
};

export const oveliqNavigation: OveliqNavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Ways to work together", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const oveliqHero = {
  microLabel: "Digital Products",
  studioTitle: "Software Studio",
  addressLines: [
    "WEB · SOFTWARE · AI",
    "DATA · AUTOMATION",
    "BUILT AROUND REAL PROBLEMS",
  ] as const,
  yearTag: "2026",
  services: ["Web", "Software", "AI", "Data"] as const,
  headline: ["WE BUILD", "SOFTWARE", "THAT MOVES"] as const,
  barcode: "Oveliqt Design  All work, all rights.",
  mediaSrc: "/assets/hero/crimson-vortex.webp",
  mediaAlt:
    "Crimson Vortex Installation — immersive red light spiral with a silhouette facing the glow",
  /** @deprecated kept for any residual references */
  capabilityLine: "WEB · SOFTWARE · AI · DATA · AUTOMATION",
  description:
    "Websites, custom platforms and practical AI for businesses ready to improve how they work.",
  ctaLabel: "START A PROJECT",
  ctaHref: "/contact#project-brief",
};

/** Shared "Start a project" destination (nav button + hero primary CTA). */
export const oveliqStartProject = {
  label: "Start a project",
  href: "/contact#project-brief",
} as const;

/**
 * Homepage editorial hero (white, Swiss editorial). Rendered by
 * `sections/editorial-hero-section.tsx`. The last headline line gets its
 * full stop from CSS so it can carry the signal-red accent.
 */
export const oveliqEditorialHero = {
  eyebrow: "Independent software & AI studio",
  headlineLines: ["We make", "complexity", "useful"] as const,
  description:
    "We design and engineer digital products, business systems and intelligent solutions that move ideas beyond possibility and into reality.",
  primaryCta: oveliqStartProject,
  secondaryCta: { label: "Explore our work", href: "/work" },
  /**
   * Photo slots in the right-hand composition. `building` is clipped to the
   * roofline silhouette; `sky` fills the panel behind it. Swap in your own
   * high-res greyscale photos (~1400px wide for `building`). An empty `src`
   * falls back to flat shapes.
   */
  frames: {
    building: { src: "/assets/hero/building.jpg" },
    sky: { src: "/assets/hero/sky.jpg" },
  },
  annotations: {
    code: "OVL — 001",
    established: "EST. 2026",
  },
  capabilities: [
    { index: "01", title: "Digital", text: "Websites and digital experiences.", href: "/services/web-development", icon: "screen" },
    { index: "02", title: "Systems", text: "Business platforms and software.", href: "/services/software-development", icon: "layers" },
    { index: "03", title: "Intelligence", text: "Applied AI and automation.", href: "/services/ai-machine-learning", icon: "chip" },
  ],
  statement: ["Design", "Engineering", "Intelligence"] as const,
} as const;

/**
 * Homepage hero, "system" direction (sections/system-hero-section.tsx).
 * The right-hand visual is a stylised mockup: card content is illustrative UI,
 * not client data or performance claims. Stack labels come from the service
 * `stack` lists below; keep them in sync if those change.
 */
export const oveliqSystemHero = {
  status: "Software & AI studio — taking new projects",
  headlineLines: ["We build", "intelligent", "software."] as const,
  /** Index of the headline line rendered with the brand gradient. */
  accentLine: 1,
  description:
    "Websites, business platforms and applied AI, designed and engineered end to end, from first idea to production.",
  primaryCta: oveliqStartProject,
  secondaryCta: { label: "Explore our work", href: "/work" },
  stackLabel: "Built with",
  stack: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "React Native", "LLM APIs"] as const,
  visual: {
    web: { tag: "Digital", url: "yourproduct.app", status: "Live" },
    systems: { tag: "Systems", title: "Operations", caption: "Orders · this week" },
    ai: {
      tag: "Intelligence",
      status: "Agent running",
      /** Prompt/response pairs cycled in the AI card. */
      exchanges: [
        {
          prompt: "Summarise this week's support tickets",
          reply: "3 themes found: billing, onboarding and delivery delays. Draft replies are ready for review.",
        },
        {
          prompt: "Which orders are at risk of running late?",
          reply: "12 orders flagged. Most are waiting on stock, so I've notified the suppliers.",
        },
        {
          prompt: "Draft the monthly report for the team",
          reply: "Report drafted with revenue, open issues and next steps. Sent to your inbox.",
        },
      ],
    },
    terminal: "deploy → production",
    build: "Build passing",
  },
  capabilities: [
    { index: "01", title: "Digital", text: "Websites and digital experiences.", href: "/services/web-development" },
    { index: "02", title: "Systems", text: "Business platforms and software.", href: "/services/software-development" },
    { index: "03", title: "Intelligence", text: "Applied AI and automation.", href: "/services/ai-machine-learning" },
  ],
} as const;

export type OveliqServiceVisual =
  | "web"
  | "software"
  | "mobile"
  | "ai"
  | "data"
  | "automation";

export type OveliqService = {
  id: string;
  number: string;
  title: string;
  shortLabel?: string;
  displayLines: readonly string[];
  description: string;
  capabilities: readonly string[];
  visual: OveliqServiceVisual;
  /** Editorial media for the services theater (light field). */
  mediaSrc: string;
  mediaAlt: string;
};

export const oveliqWhatWeDo = {
  number: "02",
  label: "WHAT WE DO",
  tagline: "From idea to software.",
  headlineLines: ["THE RIGHT TOOLS.", "REAL POSSIBILITIES."] as const,
  supporting:
    "We design and engineer digital products around real problems — from customer-facing experiences to intelligent systems and internal software.",
} as const;

export const oveliqServices: OveliqService[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    shortLabel: "Web",
    displayLines: ["WEB", "DEVELOPMENT"],
    description:
      "Digital experiences built to look great, perform well and turn ideas into useful online products.",
    capabilities: [
      "Corporate Websites",
      "Web Applications",
      "E-commerce",
      "Landing Pages",
      "Digital Experiences",
    ],
    visual: "web",
    mediaSrc: "/assets/services/web-development.jpg",
    mediaAlt:
      "Layered translucent interface panes with an Oveliqt web composition on a light editorial field",
  },
  {
    id: "software-development",
    number: "02",
    title: "Software Development",
    shortLabel: "Software",
    displayLines: ["SOFTWARE", "DEVELOPMENT"],
    description:
      "Custom software designed around the way your organization actually works.",
    capabilities: [
      "Business Platforms",
      "Internal Systems",
      "SaaS Products",
      "APIs & Backend Systems",
      "Management Systems",
    ],
    visual: "software",
    mediaSrc: "/assets/services/software-development.jpg",
    mediaAlt:
      "Vertical modular slabs with a red core glow suggesting structured software systems",
  },
  {
    id: "mobile-applications",
    number: "03",
    title: "Mobile Applications",
    shortLabel: "Mobile",
    displayLines: ["MOBILE", "APPLICATIONS"],
    description:
      "Mobile products designed around real users, workflows and business needs.",
    capabilities: [
      "iOS & Android",
      "Cross-platform Applications",
      "Business Applications",
      "Consumer Applications",
    ],
    visual: "mobile",
    mediaSrc: "/assets/services/mobile-applications.jpg",
    mediaAlt:
      "Smartphone composition over geometric forms on a light editorial field",
  },
  {
    id: "ai-machine-learning",
    number: "04",
    title: "AI & Machine Learning",
    shortLabel: "AI & ML",
    displayLines: ["AI & MACHINE", "LEARNING"],
    description:
      "Intelligent systems that use data to recognize patterns, automate decisions and solve problems traditional software cannot handle efficiently.",
    capabilities: [
      "Machine Learning",
      "Computer Vision",
      "Predictive Models",
      "Natural Language Processing",
      "AI Integrations",
    ],
    visual: "ai",
    mediaSrc: "/assets/services/ai-machine-learning.jpg",
    mediaAlt:
      "Network of nodes and red particle cluster representing machine learning systems",
  },
  {
    id: "data-analytics",
    number: "05",
    title: "Data & Analytics",
    shortLabel: "Data",
    displayLines: ["DATA &", "ANALYTICS"],
    description:
      "Systems that turn complex information into something people can understand, monitor and act on.",
    capabilities: [
      "Dashboards",
      "Data Visualization",
      "Analytics Platforms",
      "Reporting Systems",
      "Data Processing",
    ],
    visual: "data",
    mediaSrc: "/assets/services/data-analytics.jpg",
    mediaAlt:
      "Glass chart panes rising from a stone base representing data analytics",
  },
  {
    id: "automation-integrations",
    number: "06",
    title: "Automation & Integrations",
    shortLabel: "Automation",
    displayLines: ["AUTOMATION &", "INTEGRATIONS"],
    description:
      "Software that connects systems, reduces repetitive work and helps information move where it needs to go.",
    capabilities: [
      "Workflow Automation",
      "API Integrations",
      "Business Automation",
      "Third-party Integrations",
    ],
    visual: "automation",
    mediaSrc: "/assets/services/automation-integrations.jpg",
    mediaAlt:
      "Connected cubes in a glass conduit representing automation pipelines",
  },
];

export type OveliqIndustryVisual =
  | "retail"
  | "finance"
  | "hospitality"
  | "real-estate"
  | "education"
  | "healthcare"
  | "logistics"
  | "professional"
  | "startups";

export type OveliqIndustry = {
  id: string;
  number: string;
  name: string;
  slug: string;
  headlineLines: readonly string[];
  /** Sentence-case outcome for passive homepage index / future pages. */
  outcomeLine: string;
  description: string;
  possibilities: readonly string[];
  visual: OveliqIndustryVisual;
  /** Homepage shows only featured industries; full set remains for future pages. */
  homepage?: boolean;
};

export const oveliqForYourBusiness = {
  number: "04",
  label: "FOR YOUR BUSINESS",
  tagline: "Start with what sounds familiar.",
  headlineLines: ["WHAT'S HOLDING", "YOUR BUSINESS", "BACK?"] as const,
  supporting: "You know the challenge. We help you find the right way forward.",
  possibilitiesLabel: "WHAT WE COULD BUILD",
  disclaimer: "Examples, not limits. Every solution starts with the problem.",
  ctaEyebrow: "DON'T SEE YOUR INDUSTRY?",
  ctaSupporting: "That's okay. Tell us what you're trying to solve.",
  ctaLabel: "TELL US YOUR PROBLEM",
  ctaHref: "/contact?service=custom#project-brief",
} as const;

/** Illustrative possibilities, not claims of delivered client results. */
export const oveliqBusinessNeeds = [
  {
    id: "enquiries", need: "People find us. But they don't contact us.", solution: "We build websites that explain your value and make taking the next step easy.", cta: "Help me get more enquiries",
    kind: "website", service: "website", label: "A BETTER FIRST IMPRESSION",
    scenario: "You run a service business. People find you online, but struggle to understand your offer or take the next step.",
    build: "We could build a clear, fast website with service pages, relevant work and a simple enquiry or booking flow.",
    result: "Help the right people understand your value and get in touch.",
    project: "energex", projectLabel: "See Energex / website project",
  },
  {
    id: "admin", need: "We're spending too much time on admin.", solution: "We connect your tools and automate repetitive tasks.", cta: "Help me reduce the admin",
    kind: "workflow", service: "automation", label: "FEWER REPETITIVE TASKS",
    scenario: "Every new booking means copying details, sending a confirmation and remembering to follow up.",
    build: "We could connect your forms, calendar and customer tools so one action starts the next, with your team handling exceptions.",
    result: "Spend less time moving information between tools.",
  },
  {
    id: "visibility", need: "We've outgrown our spreadsheets.", solution: "We build software that brings your customers, records and daily work together.", cta: "Help me bring it all together",
    kind: "dashboard", service: "product", label: "A CLEARER DAILY PICTURE",
    scenario: "Your team switches between spreadsheets and messages to find records, check progress and prepare reports.",
    build: "We could build a shared dashboard with connected records, role-specific views and clear next actions.",
    result: "Give your team a consistent view of the work.",
  },
  {
    id: "idea", need: "We have an idea. We need someone to build it.", solution: "We turn it into a working app or platform.", cta: "Help me build my idea",
    kind: "app", service: "product", label: "FROM IDEA TO SOMETHING USABLE",
    scenario: "You know the problem you want to solve, but need help deciding what to build first.",
    build: "We could shape the core user journey, design the experience and build a focused web or mobile product to try with real users.",
    result: "Learn from a working product and decide what comes next.",
    project: "cira", projectLabel: "Explore CIRA / independent prototype",
  },
] as const;

export const oveliqIndustries: OveliqIndustry[] = [
  {
    id: "retail-ecommerce",
    number: "01",
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    headlineLines: ["SELL BETTER.", "UNDERSTAND MORE.", "AUTOMATE THE REST."],
    outcomeLine: "Sell better. Understand more. Automate the rest.",
    description:
      "Build connected digital experiences that make it easier to sell, understand customers and manage everyday operations.",
    possibilities: [
      "E-commerce Platforms",
      "Inventory Systems",
      "Customer Dashboards",
      "Sales Analytics",
      "Product Recommendation Systems",
      "Order Automation",
      "Customer Support Tools",
      "Mobile Shopping Experiences",
    ],
    visual: "retail",
    homepage: true,
  },
  {
    id: "finance",
    number: "02",
    name: "Finance",
    slug: "finance",
    headlineLines: ["MAKE FINANCIAL", "SERVICES SIMPLER."],
    outcomeLine: "Make financial services simpler.",
    description:
      "Build digital products that make financial workflows easier to manage for both teams and customers.",
    possibilities: [
      "Lending Platforms",
      "Customer Portals",
      "Financial Dashboards",
      "Workflow Automation",
      "Document Processing",
      "Reporting Systems",
      "Internal Management Tools",
      "Mobile Applications",
    ],
    visual: "finance",
    homepage: true,
  },
  {
    id: "hospitality",
    number: "03",
    name: "Hospitality",
    slug: "hospitality",
    headlineLines: ["CREATE BETTER", "GUEST EXPERIENCES."],
    outcomeLine: "Create better guest experiences.",
    description:
      "Connect discovery, booking, communication and operations through thoughtful digital products.",
    possibilities: [
      "Hotel Websites",
      "Booking Experiences",
      "Guest Portals",
      "Reservation Systems",
      "Customer Analytics",
      "Automated Communication",
      "Loyalty Experiences",
      "AI-assisted Guest Support",
    ],
    visual: "hospitality",
  },
  {
    id: "real-estate",
    number: "04",
    name: "Real Estate",
    slug: "real-estate",
    headlineLines: ["MAKE PROPERTY", "EASIER TO DISCOVER."],
    outcomeLine: "Make property easier to discover.",
    description:
      "Create digital experiences that help people explore properties while giving teams better tools to manage leads and information.",
    possibilities: [
      "Property Websites",
      "Listing Platforms",
      "Customer Portals",
      "Lead Management Systems",
      "Property Dashboards",
      "Search & Recommendation",
      "Automated Follow-ups",
      "Mobile Applications",
    ],
    visual: "real-estate",
  },
  {
    id: "education",
    number: "05",
    name: "Education",
    slug: "education",
    headlineLines: ["BUILD A BETTER", "LEARNING EXPERIENCE."],
    outcomeLine: "Build a better learning experience.",
    description:
      "Connect learners, educators and administrators with software designed around the way education actually works.",
    possibilities: [
      "Learning Platforms",
      "Student Portals",
      "School Management Systems",
      "Attendance Systems",
      "Analytics Dashboards",
      "Reporting Tools",
      "Mobile Applications",
      "AI-assisted Learning Tools",
    ],
    visual: "education",
    homepage: true,
  },
  {
    id: "healthcare",
    number: "06",
    name: "Healthcare",
    slug: "healthcare",
    headlineLines: ["MAKE DIGITAL", "CARE EASIER TO USE."],
    outcomeLine: "Make digital care easier to use.",
    description:
      "Build digital tools that can help organizations manage information, communication and operational workflows more effectively.",
    possibilities: [
      "Patient Portals",
      "Appointment Experiences",
      "Internal Management Systems",
      "Operational Dashboards",
      "Reporting Tools",
      "Workflow Automation",
      "Communication Systems",
      "Mobile Applications",
    ],
    visual: "healthcare",
  },
  {
    id: "logistics",
    number: "07",
    name: "Logistics",
    slug: "logistics",
    headlineLines: ["KEEP OPERATIONS", "MOVING."],
    outcomeLine: "Keep operations moving.",
    description:
      "Connect workflows, information and teams through systems built around day-to-day operations.",
    possibilities: [
      "Operations Dashboards",
      "Order Management",
      "Delivery Workflows",
      "Customer Portals",
      "Reporting Systems",
      "Process Automation",
      "Mobile Operations Tools",
      "System Integrations",
    ],
    visual: "logistics",
    homepage: true,
  },
  {
    id: "professional-services",
    number: "08",
    name: "Professional Services",
    slug: "professional-services",
    headlineLines: ["SPEND LESS TIME", "ON REPETITIVE WORK."],
    outcomeLine: "Spend less time on repetitive work.",
    description:
      "Turn manual processes into connected digital workflows so teams can focus on higher-value work.",
    possibilities: [
      "Client Portals",
      "Internal Management Systems",
      "Document Workflows",
      "Reporting Dashboards",
      "Workflow Automation",
      "AI-assisted Operations",
      "API Integrations",
      "Business Websites",
    ],
    visual: "professional",
    homepage: true,
  },
  {
    id: "startups",
    number: "09",
    name: "Startups",
    slug: "startups",
    headlineLines: ["FROM IDEA", "TO REAL PRODUCT."],
    outcomeLine: "From idea to real product.",
    description:
      "Turn an early concept into a usable digital product designed to learn, evolve and grow.",
    possibilities: [
      "MVP Development",
      "Web Applications",
      "Mobile Applications",
      "SaaS Products",
      "Backend Systems",
      "AI Features",
      "Analytics",
      "Product Iteration",
    ],
    visual: "startups",
    homepage: true,
  },
];

/** Homepage-visible industries — curated subset; full set remains in `oveliqIndustries`. */
export const oveliqHomepageIndustries = oveliqIndustries.filter(
  (industry) => industry.homepage,
);

export const oveliqSelectedWork = {
  title: "SELECTED PROJECTS",
  supporting: "Explore client websites, applied AI and operations software. See what we built, how it works and our role in each project.",
  moreLabel: "more projects",
  moreHref: "/work",
} as const;

/** Spector-style grid tile: title + client caption over blank media. */
export type OveliqProjectTile = {
  id: string;
  title: string;
  client: string;
  /** Project detail route (`/work/<id>`). */
  href?: string;
};

/** Homepage selection and full work index share the same project records. */
export const oveliqProjectTiles: OveliqProjectTile[] = portfolioProjects
  .filter(project => project.featured)
  .map(project => ({ id: project.slug, title: project.title, client: project.client, href: `/work/${project.slug}` }));

export const oveliqBrandTransition = {
  lines: ["DESIGN.", "ENGINEERING.", "INTELLIGENCE."] as const,
  supporting: "Built around real problems.",
} as const;

export const oveliqPhilosophy = {
  linesA: ["WE DON'T", "JUST WRITE", "CODE."] as const,
  linesB: ["WE SOLVE", "PROBLEMS."] as const,
  supporting:
    "The best technology starts with understanding what actually needs to change.",
} as const;

export type OveliqProcessStage = {
  number: string;
  title: string;
  shortLine: string;
  description: string;
};

export const oveliqHowWeWork = {
  number: "03",
  label: "HOW WE WORK",
  tagline: "From thinking to form.",
  headlineLines: ["A CLEAR PATH", "FROM IDEA TO LAUNCH."] as const,
  supporting:
    "A clear process keeps good ideas from getting lost between conversation and code.",
  ctaEyebrow: "HAVE A PROJECT IN MIND?",
  ctaLabel: "START A PROJECT",
  ctaHref: "/contact#project-brief",
} as const;

export const oveliqProcess: OveliqProcessStage[] = [
  {
    number: "01",
    title: "Discover",
    shortLine: "Understand the problem.",
    description:
      "We learn about the challenge, the people involved and what success should actually look like.",
  },
  {
    number: "02",
    title: "Define",
    shortLine: "Decide what should exist.",
    description:
      "We turn what we've learned into a clear product direction, scope and technical approach.",
  },
  {
    number: "03",
    title: "Design",
    shortLine: "Shape the experience.",
    description:
      "We design how the product should work, feel and communicate before unnecessary complexity enters the build.",
  },
  {
    number: "04",
    title: "Build",
    shortLine: "Engineer the product.",
    description:
      "We turn the approved direction into working software with the right technology for the problem.",
  },
  {
    number: "05",
    title: "Launch",
    shortLine: "Put it into the real world.",
    description:
      "We test, prepare and release the product so real people can start using it.",
  },
  {
    number: "06",
    title: "Evolve",
    shortLine: "Keep making it better.",
    description:
      "We learn from real use, improve what matters and extend the product as needs change.",
  },
];

export type OveliqCapabilityGroup = {
  id: string;
  title: string;
  items: readonly string[];
};

/**
 * Technical competencies under the services layer.
 * Labels drawn only from existing Oveliqt service/capability context — no invented stack.
 */
export const oveliqCapabilities = {
  label: "CAPABILITIES",
  tagline: "Technology with intent.",
  headline: ["TECHNOLOGY IS", "THE TOOL.", "THE OUTCOME", "IS THE POINT."] as const,
  supporting:
    "We choose technology around the problem — not the other way around.",
  groups: [
    {
      id: "frontend",
      title: "FRONTEND",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "Modern responsive interfaces",
      ],
    },
    {
      id: "backend",
      title: "BACKEND",
      items: ["Node.js", "NestJS", "Java", "REST APIs", "APIs & Backend Systems"],
    },
    {
      id: "data",
      title: "DATA",
      items: [
        "PostgreSQL",
        "Data Processing",
        "Dashboards",
        "Analytics",
        "Data Visualization",
      ],
    },
    {
      id: "ai-machine-learning",
      title: "AI & MACHINE LEARNING",
      items: [
        "Python",
        "Machine Learning",
        "Computer Vision",
        "Predictive Models",
        "Natural Language Processing",
        "AI Integrations",
      ],
    },
    {
      id: "mobile",
      title: "MOBILE",
      items: [
        "iOS & Android",
        "Cross-platform Applications",
        "Business Applications",
        "Consumer Applications",
      ],
    },
    {
      id: "automation-integrations",
      title: "AUTOMATION & INTEGRATIONS",
      items: [
        "Workflow Automation",
        "API Integrations",
        "System Integrations",
        "Third-party Integrations",
        "Internal Systems",
      ],
    },
  ] satisfies readonly OveliqCapabilityGroup[],
} as const;

export type OveliqFounder = {
  id: string;
  slot: 1 | 2;
  /** Optional — omit until real names exist. */
  name?: string;
  role?: string;
  bio?: string;
  imageSrc?: string;
  imageAlt?: string;
  links?: readonly { label: string; href: string }[];
};

/**
 * Homepage About — human / rest section.
 * Founders are structurally ready; only render fields that are actually supplied.
 */
export const oveliqAbout = {
  number: "05",
  label: "ABOUT",
  tagline: "Built around good work.",
  headlineLines: [
    "A SMALL STUDIO.",
    "A SHARED STANDARD.",
  ] as const,
  paragraphs: [
    "We design and build websites, business platforms and applied AI. Our published work so far ranges from a workshop catalogue and corporate websites for energy, investment and technology companies to our own civic-reporting platform and applied AI projects.",
    "Oveliqt started from a shared interest in technology and a habit of asking the same question whenever we saw a problem: could we build something better?",
    "You can explore the work before starting a conversation: each case study explains the brief, the approach and what we delivered.",
  ] as const,
  /**
   * Founder cards are hidden for launch (2026-11-26). The About page and homepage About
   * section render nothing while this list is empty. To bring them back, restore the
   * entry from git (id "orrie-dan-nkusi", portrait /assets/team/orrie-dan-nkusi.webp).
   */
  founders: [] as readonly OveliqFounder[],
} as const;

/* ------------------------------------------------------------------ */
/* Spector-pattern sections: case study, testimonials, pricing,        */
/* CTA band and FAQ. Blocks marked `sample: true` hold SAMPLE CONTENT  */
/* (synthetic numbers, quotes and prices) — replace before launch.     */
/* ------------------------------------------------------------------ */

export type OveliqMetric = {
  value: string;
  suffix?: string;
  label: string;
};

export type OveliqContactPerson = {
  name: string;
  role: string;
  imageSrc?: string;
  sample?: boolean;
};

export const oveliqCaseStudy = {
  sample: true,
  number: "05",
  label: "CASE STUDY",
  tagline: "Proof over promises.",
  headlineLines: [
    "WHEN THE SOFTWARE",
    "FITS THE WORK,",
    "THE RESULTS",
    "FOLLOW.",
  ] as const,
  project: {
    client: "Lending Platform",
    category: "Digital Lending",
    title: "A lending journey without the paperwork",
    description:
      "We replaced a paper-heavy loan application and review process with a guided digital flow, automated credit checks and a review dashboard for the credit team.",
    mediaSrc: "/assets/services/software-development.jpg",
    mediaAlt: "Abstract modular slabs representing the lending platform",
    ctaLabel: "DISCUSS A SIMILAR PROJECT",
    ctaHref: "/contact#project-brief",
  },
  metricsLabel: "Project metrics",
  metricsCaption: "From audit to launch",
  metrics: [
    { value: "10", suffix: "wks", label: "From first workshop to production release" },
    { value: "62", suffix: "%", label: "Less time spent reviewing each application" },
    { value: "2.4", suffix: "×", label: "More applications completed fully online" },
  ] satisfies readonly OveliqMetric[],
  quote: {
    text: "Oveliqt understood how our credit team actually works before writing a line of code. The new platform feels like it was always meant to be there.",
    name: "Amara Okafor",
    role: "Head of Operations, lending client",
  },
} as const;

export type OveliqTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const oveliqTestimonials = {
  sample: true,
  number: "06",
  label: "CLIENT STORIES",
  tagline: "In their words.",
  headlineLines: ["IN THEIR", "WORDS."] as const,
  items: [
    {
      id: "t-01",
      quote:
        "They asked better questions than we did about our own process. What we got was software our team actually wanted to use.",
      name: "Grace Wanjiru",
      role: "Managing Director",
      company: "Northline Logistics",
    },
    {
      id: "t-02",
      quote:
        "The dashboard replaced four spreadsheets and a weekly meeting. Decisions that took days now take minutes.",
      name: "Samuel Habimana",
      role: "Finance Lead",
      company: "Sora Retail Group",
    },
    {
      id: "t-03",
      quote:
        "Clear scope, honest timelines and no surprises on the invoice. That alone made Oveliqt different.",
      name: "Claire Dubois",
      role: "Founder",
      company: "Atelier Maison",
    },
    {
      id: "t-04",
      quote:
        "The computer vision pilot went from idea to working prototype in weeks, and the team explained every trade-off along the way.",
      name: "Daniel Mensah",
      role: "CTO",
      company: "Vantage Health",
    },
  ] satisfies readonly OveliqTestimonial[],
} as const;

export type OveliqPricingTier = {
  id: string;
  name: string;
  badge: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  summary: string;
  duration: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  ctaNote: string;
  featured?: boolean;
};

export const oveliqPricing = {
  sample: true,
  number: "07",
  label: "ENGAGEMENTS",
  tagline: "Value defined clearly.",
  headlineLines: ["CLEAR SCOPE.", "CLEAR COST.", "NO SURPRISES."] as const,
  supporting:
    "Start with a focused scope that fits your priorities and budget. We agree on deliverables, costs and milestones before work begins; any changes are priced together.",
  tiers: [
    {
      id: "launch",
      name: "Launch",
      badge: "PROJECT",
      price: "Scoped quote",
      summary: "Websites, landing pages and focused digital experiences.",
      duration: "3–5 weeks",
      features: [
        "Discovery & content structure",
        "Custom design system",
        "Responsive build & CMS",
        "SEO & performance baseline",
        "30 days post-launch support",
      ],
      ctaLabel: "START A PROJECT",
      ctaHref: "/contact#project-brief",
      ctaNote: "For a sharp, well-built web presence.",
    },
    {
      id: "build",
      name: "Build",
      badge: "PROJECT",
      price: "Scoped quote",
      summary: "Web apps, internal platforms and MVPs built around your workflow.",
      duration: "8–12 weeks",
      features: [
        "Product & workflow discovery",
        "UX, UI and clickable prototype",
        "Frontend, backend & APIs",
        "Integrations with your tools",
        "Milestone-based delivery",
        "90 days post-launch support",
      ],
      ctaLabel: "START A PROJECT",
      ctaHref: "/contact#project-brief",
      ctaNote: "For products that need to do real work.",
      featured: true,
    },
    {
      id: "partner",
      name: "Partner",
      badge: "MONTHLY",
      price: "Custom",
      summary: "An ongoing product, data and AI team embedded with yours.",
      duration: "Ongoing",
      features: [
        "Dedicated senior team",
        "AI, data & automation work",
        "Roadmap & priority planning",
        "Continuous delivery",
        "Monitoring & maintenance",
      ],
      ctaLabel: "TALK TO US",
      ctaHref: "/contact#project-brief",
      ctaNote: "For long-term products and complex systems.",
    },
  ] satisfies readonly OveliqPricingTier[],
} as const;

/** Reusable conversion band (Spector "Book a call" pattern). */
export const oveliqCtaBands = {
  pricing: {
    sample: true,
    eyebrow: "NOT SURE WHICH FITS?",
    statement:
      "Every project begins with a free 30-minute discovery call. No commitment, no pressure.",
    ctaLabel: "START A PROJECT",
    ctaHref: "/contact#project-brief",
    person: { name: "Ethan Mercer", role: "Co-founder · Engineering", sample: true },
  },
  faq: {
    sample: true,
    eyebrow: "STILL HAVE A QUESTION?",
    statement:
      "If anything is unclear, we'll walk through it together and define what makes sense for your project.",
    ctaLabel: "START A PROJECT",
    ctaHref: "/contact#project-brief",
    person: { name: "Liam Mercer", role: "Co-founder · Product & AI", sample: true },
  },
} as const satisfies Record<
  string,
  {
    sample: boolean;
    eyebrow: string;
    statement: string;
    ctaLabel: string;
    ctaHref: string;
    person?: OveliqContactPerson;
  }
>;

export type OveliqFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const oveliqFaq = {
  /** Timelines and terms are assumptions — confirm before launch. */
  sample: true,
  number: "06",
  label: "FAQ",
  tagline: "Clear answers.",
  headlineLines: ["BEFORE", "WE START."] as const,
  asideTitle: "Have questions?",
  asideText:
    "Answers to what people usually ask before working with us. Anything else, just ask.",
  items: [
    {
      id: "faq-start",
      question: "How do we start working together?",
      answer:
        "We begin with a short call to understand the problem, the people involved and what success looks like. If it's a fit, we send a written scope, timeline and estimate.",
    },
    {
      id: "faq-cost",
      question: "How much does a project cost?",
      answer:
        "Cost depends on the scope, complexity and integrations involved. A useful brief helps define the work and build an estimate around the actual requirements.",
    },
    {
      id: "faq-timeline",
      question: "How long does a typical project take?",
      answer:
        "Timelines depend on the product, the content available and the systems it needs to connect to. Discovery helps turn that uncertainty into a sequence of clear milestones.",
    },
    {
      id: "faq-ai",
      question: "Do we actually need AI?",
      answer:
        "Not always. We recommend AI only where it clearly beats a simpler solution — and we'll tell you when ordinary software is the better answer.",
    },
    {
      id: "faq-stack",
      question: "What technologies do you use?",
      answer:
        "We choose technology around the problem. Typical stacks include React and TypeScript on the frontend, Node.js, Python or Java on the backend, and cloud services that fit your team.",
    },
    {
      id: "faq-ownership",
      question: "Who owns the code and designs?",
      answer:
        "You do. On final payment, all source code, designs and documentation are transferred to you.",
    },
    {
      id: "faq-after",
      question: "What happens after launch?",
      answer:
        "Every project includes a support period. After that, you can continue with an ongoing partnership or take the product in-house with full documentation.",
    },
  ] satisfies readonly OveliqFaqItem[],
} as const;

export type OveliqFooterNavItem = {
  label: string;
  href: string;
};

/**
 * Conversion footer / `#contact`.
 * No real Oveliqt email or submission endpoint exists yet —
 * set `email` (preferred → mailto) or `ctaHref` (scheduling URL) when available.
 * Until then `ctaHref` stays null so the CTA does not fake a submission.
 */
export const oveliqContact = {
  /** International WhatsApp number, country code included; no leading zero. */
  whatsappNumber: "250793083537" as string | null,
  label: "HAVE A PROJECT?",
  headlineLines: ["LET'S BUILD", "SOMETHING USEFUL."] as const,
  supporting: "Tell us what you're trying to build, improve or automate.",
  ctaLabel: "START A PROJECT",
  /** mailto:… or https://… scheduling — leave null until a real destination exists. */
  ctaHref: null as string | null,
  /** When set, primary CTA becomes mailto and email is shown in the utility layer. */
  email: "info@oveliqt.com" as string | null,
  wordmark: "OVELIQT",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
  { label: "Ways to work together", href: "/pricing" },
    { label: "For Your Business", href: "/#business" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/about" },
    /* FAQ link appears once the FAQ is confirmed (oveliqFaq.sample === false). */
    ...(oveliqFaq.sample ? [] : [{ label: "FAQ", href: "/#faq" }]),
  ] satisfies readonly OveliqFooterNavItem[],
  copyright: "© Oveliqt",
} as const;

/**
 * Registered company details (RDB certificate, printed 22 Oct 2026).
 * Shown in the footer legal line and on the Privacy / Terms pages.
 */
export const oveliqCompany = {
  legalName: "OVELIQ TECHNOLOGIES LTD",
  tradingName: "Oveliqt",
  companyCode: "156912863",
  city: "Kigali, Rwanda",
  registeredOffice: "KN 186 Street, Urumuri, Rwezamenyo II, Rwezamenyo, Nyarugenge, Kigali, Rwanda",
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export type OveliqLegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type OveliqLegalPage = {
  /**
   * DRAFT legal copy written from how the site actually works (no accounts,
   * no analytics, no cookies, the enquiry brief is sent by the visitor via
   * WhatsApp or email). While `draft` is true the page renders and is linked,
   * but is served `noindex` and left out of the sitemap. Have the copy
   * reviewed, then set `draft: false`.
   */
  draft: boolean;
  label: string;
  headlineLines: readonly string[];
  supporting: string;
  lastUpdated: string;
  sections: readonly OveliqLegalSection[];
};

export const oveliqPrivacyPage: OveliqLegalPage = {
  draft: false,
  label: "PRIVACY",
  headlineLines: ["PRIVACY", "NOTICE."],
  supporting: "What this website collects, what happens when you contact us, and the choices you have.",
  lastUpdated: "19 November 2026",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `Oveliqt is the trading name of ${oveliqCompany.legalName}, a private company registered in Rwanda (company code ${oveliqCompany.companyCode}), with its registered office at ${oveliqCompany.registeredOffice}. We are responsible for the personal data described in this notice.`,
        "Questions about your data can go to info@oveliqt.com.",
      ],
    },
    {
      heading: "What this website collects",
      paragraphs: [
        "Browsing this website does not require an account. We do not use analytics, advertising trackers or cookies, and fonts and images are served from our own site.",
        "Like any website, our hosting provider automatically processes basic technical information (such as your IP address, browser type and the pages requested) to deliver the site and keep it secure. We do not use this information to identify you.",
      ],
    },
    {
      heading: "When you send us a project brief",
      paragraphs: [
        "The project brief on our contact page stays in your browser while you fill it in. Nothing is sent to us until you choose to send it yourself through WhatsApp or your own email app. If you save your brief instead, it is downloaded to your device and not sent anywhere.",
        "When you contact us, we receive what you choose to share: usually your name, phone number or email address, and details about your project.",
      ],
    },
    {
      heading: "How we use your information",
      bullets: [
        "To reply to your enquiry and discuss your project.",
        "To prepare proposals and, if we work together, to deliver and support the work.",
        "To meet our legal, tax and accounting obligations.",
      ],
      paragraphs: [
        "We do not sell your information, and we do not add you to marketing lists without your agreement.",
      ],
    },
    {
      heading: "Who else processes it",
      paragraphs: [
        "Messages you send by WhatsApp or email pass through those services and are handled under their own privacy terms. Our hosting, email and messaging providers may store data on servers outside Rwanda; where they do, we rely on them to protect it to a standard consistent with Rwandan data protection law.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiries for as long as we need to respond and follow up, and no longer than 24 months if we do not go on to work together. Project and billing records are kept for as long as the law requires.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Under Rwanda's Law N° 058/2021 relating to the protection of personal data and privacy (and the GDPR, where it applies to you), you can ask us to access, correct or delete your personal data, to object to or restrict how we use it, or to receive a copy of it.",
        "To make a request, email info@oveliqt.com. If you are not satisfied with our response, you can complain to the National Cyber Security Authority (NCSA), Rwanda's data protection supervisory authority.",
      ],
    },
    {
      heading: "Changes to this notice",
      paragraphs: [
        "If we change how we handle personal data, we will update this page and the date above.",
      ],
    },
  ],
};

export const oveliqTermsPage: OveliqLegalPage = {
  draft: false,
  label: "TERMS",
  headlineLines: ["TERMS OF", "USE."],
  supporting: "The terms that apply when you use this website.",
  lastUpdated: "19 November 2026",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        `This website is operated by ${oveliqCompany.legalName}, trading as Oveliqt (company code ${oveliqCompany.companyCode}), ${oveliqCompany.city}. By using the site you agree to these terms.`,
      ],
    },
    {
      heading: "Information on this site",
      paragraphs: [
        "Content on this site describes our services and work for general information. It is not an offer or a quotation. Any project is agreed in a written proposal or agreement, which sets out the scope, fees and terms for that work.",
        "We try to keep the site accurate and up to date, but we do not guarantee that it is complete or free of errors.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The design, text, graphics and code of this site belong to Oveliqt unless stated otherwise. You may share links to it, but you may not copy or reuse its content for commercial purposes without our permission.",
        "Client names, logos and project materials shown in our work belong to their respective owners and are shown with their knowledge.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "This site links to services such as WhatsApp and to our clients' websites. We are not responsible for the content or practices of sites we do not control.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "To the extent permitted by law, we are not liable for losses arising from your use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the Republic of Rwanda, and the courts of Rwanda have jurisdiction over any dispute about them.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Questions about these terms can go to info@oveliqt.com."],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Inner pages — Work, project detail, Services, About, Contact.        */
/* Layouts follow Spector's inner pages; copy is Oveliqt-only and does  */
/* not repeat homepage sections. Blocks marked `sample: true` hold     */
/* SAMPLE CONTENT (dates, timeframes, numbers, bios) — replace before  */
/* launch.                                                             */
/* ------------------------------------------------------------------ */

export type OveliqPageMeta = {
  title: string;
  description: string;
};

export const oveliqPageMeta = {
  work: {
    title: "Work — Oveliqt",
    description:
      "Selected Oveliqt work: client websites across manufacturing, energy, investment and technology, plus our own platform and applied AI projects.",
  },
  pricing: {
    title: "Ways to work together - Oveliqt",
    description: "Explore focused starting scopes for websites, digital products and AI. Clear proposals, phased delivery and room to grow.",
  },
  services: {
    title: "Services — Oveliqt",
    description:
      "Web development, custom software, mobile applications, AI & machine learning, data & analytics, and automation — in detail.",
  },
  about: {
    title: "About — Oveliqt",
    description:
      "Oveliqt is an independent software and AI studio in Kigali. How we think, who we are and how we work.",
  },
  contact: {
    title: "Contact — Oveliqt",
    description:
      "Two simple questions to shape your next project. Prepare your message and start a conversation with Oveliqt.",
  },
  privacy: {
    title: "Privacy — Oveliqt",
    description: "How the Oveliqt website handles personal data: no analytics or cookies, and what happens when you send us a project brief.",
  },
  terms: {
    title: "Terms of use — Oveliqt",
    description: "The terms that apply when you use the Oveliqt website.",
  },
  notFound: {
    title: "Page not found — Oveliqt",
    description: "This page does not exist.",
  },
} as const satisfies Record<string, OveliqPageMeta>;

export const oveliqNotFound = {
  label: "404",
  tagline: "Nothing to see here.",
  headlineLines: ["PAGE NOT", "FOUND."],
  supporting: "The page you're looking for doesn't exist or has moved.",
} as const;

/* —— Work + project detail ———————————————————————————————————————— */

export type OveliqProjectSection = {
  label: string;
  /** Spector two-row manifesto: first row muted, second solid + indented. */
  headlineLines: readonly [string, string];
  lead: string;
  paragraphs: readonly string[];
};

export type OveliqProjectDetail = {
  slug: string;
  title: string;
  client: string;
  /** One line under the title on panels and the detail hero. */
  tagline: string;
  /** Detail hero paragraph (right column). */
  intro: string;
  date?: string;
  category: "Websites" | "Platforms" | "AI & Research";
  status: "Client website" | "Partner contribution" | "Independent prototype" | "ML engineering project" | "Research project";
  featured?: boolean;
  mediaNote?: string;
  industry: string;
  role: readonly string[];
  deliverables: readonly string[];
  timeframe?: string;
  mediaSrc: string;
  mediaAlt: string;
  /** Full-bleed images between story sections. */
  gallery: readonly { src: string; alt: string; caption?: string }[];
  challenge: OveliqProjectSection;
  solution: OveliqProjectSection;
  outcome: {
    label: string;
    lead: string;
    points: readonly string[];
  };
  /** Live product URL — the "VIEW PROJECT" link only renders when set. */
  externalUrl?: string;
  /** SAMPLE CONTENT — illustrative narrative, replace before launch. */
  sample?: boolean;
};

export const oveliqWorkIntro = {
  label: "SELECTED WORK",
  title: "Platforms, products and intelligent systems — each one built around a real problem.",
  allLabel: "ALL PROJECTS",
} as const;

/** Public case studies. Unconfirmed partner work and archived samples are not routed. */
export const oveliqProjectDetails = { items: portfolioProjects } as const;

export function findProjectDetail(slug: string): OveliqProjectDetail | undefined {
  return oveliqProjectDetails.items.find((item) => item.slug === slug);
}

export const oveliqProjectPage = {
  metaLabels: {
    industry: "INDUSTRY",
    role: "ROLE",
    deliverables: "DELIVERABLES",
    timeframe: "TIMEFRAME",
  },
  viewProjectLabel: "VIEW PROJECT",
  previousLabel: "PREVIOUS",
  nextLabel: "NEXT",
  allProjectsLabel: "ALL PROJECTS",
  cta: {
    sample: true,
    eyebrow: "WE DON'T PITCH. WE HAVE A CONVERSATION.",
    statement: "Have a similar problem? Every project begins with a free discovery call.",
    ctaLabel: "START A PROJECT",
    ctaHref: "/contact",
    person: { name: "Ethan Mercer", role: "Co-founder · Engineering", sample: true },
  },
} as const;

/* —— Services ———————————————————————————————————————————————————— */

export type OveliqServiceFaq = { question: string; answer: string };

export type OveliqServiceDetail = {
  serviceId: string;
  lead: string;
  paragraphs: readonly string[];
  deliverables: readonly string[];
  goodFor: readonly string[];
  /** Case-study slugs shown on the service page; unknown or sample slugs are skipped. */
  relatedProjects: readonly string[];
  /* —— Service page (`/services/<id>`) —— */
  /** One-sentence statement opening the overview. */
  overviewHeadline: string;
  /** Search description for the service page. */
  metaDescription: string;
  /** "What we build" cards. */
  capabilityNotes: readonly { title: string; body: string }[];
  /** Four delivery steps, specific to the service. */
  approach: readonly { title: string; body: string }[];
  /** Typical tools — confirm before launch; omit to hide the row. */
  stack?: readonly string[];
  faqs: readonly OveliqServiceFaq[];
  /** Two related service ids for "Often paired with". */
  pairsWith: readonly string[];
  /** Index into `oveliqSolutionPricing.solutions` for "A good place to start". */
  startingPoint: 0 | 1 | 2;
  /** Pre-selects the contact form (`enquiryHref`). */
  enquiry: "website" | "product" | "automation";
};

/** Hosting answer shared by service FAQs. */
const hostingFaq: OveliqServiceFaq = {
  question: "Can you host and maintain it for us?",
  answer:
    "Yes. We can host, monitor and maintain what we build for an additional monthly fee, agreed in the proposal. If you'd rather run it yourselves, we hand over the code, infrastructure and documentation so your team can.",
};

export const oveliqServicesPage = {
  title: ["WHAT WE", "BUILD"] as const,
  intro:
    "Six disciplines, one team. Each service below can stand on its own — most projects combine two or three.",
  indexLabel: "SERVICES",
  deliverablesLabel: "What we deliver",
  goodForLabel: "Where it fits",
  relatedLabel: "See it in practice",
  exploreLabel: "Explore",
  /** Section labels on each service page. */
  detailLabels: {
    breadcrumb: "Services",
    primaryCta: "Discuss a project",
    proofCta: "See it in practice",
    overview: "Overview",
    build: "What we build",
    buildHeadline: ["WHERE WE", "CAN HELP"] as const,
    outcomes: "What you get",
    approach: "How we deliver it",
    approachHeadline: ["FROM BRIEF", "TO HANDOVER"] as const,
    stack: "Typical tools",
    proof: "See it in practice",
    allWork: "All work",
    start: "A good place to start",
    startCta: "Ways to work together",
    faq: "Questions",
    pairs: "Often paired with",
    ctaEyebrow: "READY WHEN YOU ARE",
    ctaLabel: "START A PROJECT",
    previous: "Previous",
    next: "Next",
  },
  details: [
    {
      serviceId: "web-development",
      lead: "Websites and web applications that are fast, accessible and easy to keep up to date.",
      paragraphs: [
        "We design and build everything from a focused landing page to a full web application. Performance, accessibility and search visibility are part of the build, not a checklist at the end.",
        "Content is structured so your team can update it without a developer, and components are reusable so the site stays consistent as it grows.",
      ],
      deliverables: ["Design system & components", "Responsive front-end", "CMS or content model", "SEO & performance setup", "Analytics"],
      goodFor: ["Launching or relaunching a brand", "Turning a manual process into a web tool", "Selling online"],
      relatedProjects: ["energex", "ecobe", "soliaris", "axeora", "everis"],
      overviewHeadline: "Performance, accessibility and search visibility are part of the build — not a checklist at the end.",
      metaDescription: "Websites and web applications by Oveliqt: fast, accessible, search-ready and easy for your team to keep up to date.",
      capabilityNotes: [
        { title: "Corporate websites", body: "A clear home for your organisation, structured around what visitors come to find." },
        { title: "Web applications", body: "Browser-based tools that replace a manual process with accounts, data and workflow." },
        { title: "E-commerce", body: "Storefronts with catalogue, checkout and payments your team can run day to day." },
        { title: "Landing pages", body: "Focused pages for a launch, campaign or product, built to turn interest into enquiries." },
        { title: "Digital experiences", body: "Interactive and editorial pieces where motion and storytelling carry the message." },
      ],
      approach: [
        { title: "Discover", body: "Audience, goals and a content inventory. We agree what the site must do before designing it." },
        { title: "Structure & design", body: "Sitemap, key page layouts and a component library you review and approve." },
        { title: "Build", body: "Responsive front-end, content model and integrations, shown in regular demos." },
        { title: "Launch & handover", body: "SEO, analytics and performance checks, then a walkthrough so your team owns the content." },
      ],
      stack: ["React", "TypeScript", "Headless CMS", "Vite / Next.js"],
      faqs: [
        { question: "Can we update the content ourselves?", answer: "Yes. Content is modelled so your team can edit pages, posts and media without a developer, and we walk you through it at handover." },
        { question: "How long does a website take?", answer: "It depends on the number of pages, the content and any integrations. You get a phased timeline with the proposal, and a focused site moves considerably faster than a full web application." },
        { question: "Do you redesign existing websites?", answer: "Yes. We review what works today — content, search rankings, analytics — and carry it forward so a relaunch doesn't cost you the visibility you've built." },
        hostingFaq,
      ],
      pairsWith: ["software-development", "automation-integrations"],
      startingPoint: 0,
      enquiry: "website",
    },
    {
      serviceId: "software-development",
      lead: "Custom platforms shaped around how your organisation actually works — not the other way around.",
      paragraphs: [
        "We start by mapping the real workflow: who does what, which decisions matter and where things currently break. The software follows from that, with clear roles, permissions and states.",
        "We build for the long term: documented APIs, tested business logic and an architecture your team can extend.",
      ],
      deliverables: ["Workflow & data model", "Web platform", "APIs & integrations", "Roles & permissions", "Documentation & handover"],
      goodFor: ["Replacing spreadsheets and email chains", "Internal operations platforms", "SaaS products and MVPs"],
      relatedProjects: ["cira"],
      overviewHeadline: "The software follows the workflow — clear roles, permissions and states, built to be extended.",
      metaDescription: "Custom software by Oveliqt: business platforms, internal systems, SaaS products and APIs shaped around how your organisation works.",
      capabilityNotes: [
        { title: "Business platforms", body: "One place for the records, decisions and people behind a core part of your operation." },
        { title: "Internal systems", body: "Tools that replace spreadsheets and email chains with a shared, reliable workflow." },
        { title: "SaaS products", body: "A focused first version of your product, built so it can grow with its users." },
        { title: "APIs & backend systems", body: "Documented, tested services that other software — yours or your partners' — can rely on." },
        { title: "Management systems", body: "Role-based views for staff, managers and administrators over the same data." },
      ],
      approach: [
        { title: "Map the workflow", body: "Who does what, which decisions matter and where things break today." },
        { title: "Model & prototype", body: "Data model, roles and a clickable prototype of the core workflow for you to test." },
        { title: "Build in phases", body: "The most valuable workflow first, with working software at every demo." },
        { title: "Handover & support", body: "Documentation, tests and a walkthrough so your team can run and extend it." },
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
      faqs: [
        { question: "Do we own the code?", answer: "Yes. On final payment, the code and documentation we write for you are yours." },
        { question: "Can you work with our existing systems?", answer: "Usually. We review what you have during discovery and recommend whether to integrate with it, extend it or replace it." },
        { question: "Can we start small?", answer: "Yes — we recommend it. A first version built around one core workflow lets your team use it early and shapes what comes next." },
        hostingFaq,
      ],
      pairsWith: ["automation-integrations", "data-analytics"],
      startingPoint: 1,
      enquiry: "product",
    },
    {
      serviceId: "mobile-applications",
      lead: "Mobile products for customers and for teams in the field.",
      paragraphs: [
        "We decide early whether native or cross-platform is right for the product, then design around the realities of mobile use: short sessions, poor connectivity and one hand on the screen.",
        "Apps share APIs and data with your web platform, so information stays consistent everywhere it appears.",
      ],
      deliverables: ["iOS & Android apps", "Offline-friendly data flows", "Push notifications", "App store release"],
      goodFor: ["Field data collection", "Customer self-service", "Companion apps for an existing platform"],
      relatedProjects: ["cira"],
      overviewHeadline: "Designed for short sessions, patchy connectivity and one hand on the screen.",
      metaDescription: "Mobile apps by Oveliqt: iOS, Android and cross-platform apps for customers and field teams, connected to your platform.",
      capabilityNotes: [
        { title: "iOS & Android", body: "Apps for both stores, released and maintained through a single, predictable process." },
        { title: "Cross-platform applications", body: "One codebase for both platforms when it suits the product and budget." },
        { title: "Business applications", body: "Field data collection, inspections and task lists that keep working offline." },
        { title: "Consumer applications", body: "Self-service and companion apps your customers will actually keep on their phone." },
      ],
      approach: [
        { title: "Frame the product", body: "Who uses it, where and how often — and whether native or cross-platform fits." },
        { title: "Design for mobile", body: "Key flows prototyped on a real device, tested with the people who'll use them." },
        { title: "Build & connect", body: "The app plus the APIs and data it shares with your web platform." },
        { title: "Release", body: "Store listings, review and release, then updates as the product grows." },
      ],
      stack: ["React Native", "TypeScript", "Push notifications", "Offline sync"],
      faqs: [
        { question: "Native or cross-platform?", answer: "It depends on the product. Cross-platform is often the faster, more economical route; native makes sense when you need deep device features or platform-specific polish. We recommend one during discovery." },
        { question: "Do you handle the App Store and Google Play?", answer: "Yes. We prepare the listings, manage review and release the app under your developer accounts." },
        { question: "Will it work without a connection?", answer: "Where it matters, yes. We design offline-friendly data flows so work can continue and sync when the connection returns." },
        hostingFaq,
      ],
      pairsWith: ["software-development", "web-development"],
      startingPoint: 1,
      enquiry: "product",
    },
    {
      serviceId: "ai-machine-learning",
      lead: "Applied AI where it solves a real problem — and an honest answer when it doesn't.",
      paragraphs: [
        "We frame the problem first, check whether the data can support it, and evaluate models on the cases that matter to you rather than on benchmark averages.",
        "When AI is the right tool, we ship it inside a product people can use, with monitoring so its behaviour stays visible over time.",
      ],
      deliverables: ["Problem framing & feasibility", "Data preparation", "Model training & evaluation", "AI features in production", "Monitoring"],
      goodFor: ["Computer vision", "Document and text processing", "Prediction and classification", "Assistants on your own data"],
      relatedProjects: ["crosswalk-intelligence", "ecosort-ai"],
      overviewHeadline: "We check the data can support it, then evaluate on the cases that matter to you.",
      metaDescription: "Applied AI and machine learning by Oveliqt: computer vision, language processing, prediction and assistants, evaluated honestly and shipped in real products.",
      capabilityNotes: [
        { title: "Machine learning", body: "Models trained on your data to classify, score or forecast what matters to your work." },
        { title: "Computer vision", body: "Detecting and measuring what appears in images and video, with results people can review." },
        { title: "Predictive models", body: "Early signals on demand, risk or attrition, with the reasons behind each prediction." },
        { title: "Natural language processing", body: "Reading, sorting and summarising documents, messages and forms at scale." },
        { title: "AI integrations", body: "Assistants and AI features built into the tools your team already uses, grounded in your own data." },
      ],
      approach: [
        { title: "Frame & assess", body: "Define the decision AI should support and check the data can support it." },
        { title: "Prototype & evaluate", body: "A working pilot measured on your real cases, with its limits stated plainly." },
        { title: "Ship in the product", body: "The model inside an interface people use, with a human in the loop where it counts." },
        { title: "Monitor", body: "Ongoing checks so accuracy and behaviour stay visible after launch." },
      ],
      stack: ["Python", "PyTorch", "LLM APIs", "Evaluation tooling"],
      faqs: [
        { question: "Do we need a lot of data to start?", answer: "Not always. Some problems can start with existing models and a small set of your examples. Part of discovery is telling you honestly whether your data is enough." },
        { question: "What if AI isn't the right answer?", answer: "Then we'll say so, and suggest the simpler software or automation that solves the problem." },
        { question: "How do you keep our data private?", answer: "We agree data handling up front, use only what the problem needs, and choose providers and hosting that meet your requirements." },
        hostingFaq,
      ],
      pairsWith: ["data-analytics", "automation-integrations"],
      startingPoint: 2,
      enquiry: "automation",
    },
    {
      serviceId: "data-analytics",
      lead: "From scattered data to the few numbers that drive decisions.",
      paragraphs: [
        "We agree on what you need to know and how often, then build the pipelines, models and views that answer it reliably.",
        "Dashboards are designed to be read, not admired — clear hierarchy, sensible defaults and alerts when something needs attention.",
      ],
      deliverables: ["Metric definitions", "Data pipelines", "Dashboards & reports", "Alerts & summaries"],
      goodFor: ["Operational visibility", "Programme and impact reporting", "Consolidating several data sources"],
      relatedProjects: [],
      overviewHeadline: "Dashboards designed to be read, not admired — and alerts when something needs attention.",
      metaDescription: "Data and analytics by Oveliqt: metric definitions, pipelines, dashboards and reporting that turn scattered data into decisions.",
      capabilityNotes: [
        { title: "Dashboards", body: "The few numbers each team needs, on one screen, refreshed automatically." },
        { title: "Data visualization", body: "Charts with a clear hierarchy, so the important change is the first thing you see." },
        { title: "Analytics platforms", body: "A single, trusted home for data that currently lives in several tools." },
        { title: "Reporting systems", body: "Scheduled programme, impact and management reports, produced without manual assembly." },
        { title: "Data processing", body: "Pipelines that collect, clean and join data reliably, with checks when something looks wrong." },
      ],
      approach: [
        { title: "Agree the questions", body: "What you need to know, how often and who acts on it." },
        { title: "Define & connect", body: "Metric definitions and pipelines from each source, checked for quality." },
        { title: "Design the views", body: "Dashboards and reports reviewed with the people who'll read them." },
        { title: "Automate & alert", body: "Scheduled refreshes, summaries and alerts, documented for your team." },
      ],
      stack: ["SQL", "Python", "PostgreSQL", "BI dashboards"],
      faqs: [
        { question: "Our data is spread across several tools. Is that a problem?", answer: "No — that's the usual starting point. We connect the sources, agree definitions and build one reliable view." },
        { question: "Can you work with the BI tool we already use?", answer: "Often, yes. We can build on your existing tool or recommend one if you don't have it yet." },
        { question: "How do we know the numbers are right?", answer: "Each metric has a written definition, and pipelines include checks that flag missing or unusual data." },
        hostingFaq,
      ],
      pairsWith: ["ai-machine-learning", "software-development"],
      startingPoint: 2,
      enquiry: "automation",
    },
    {
      serviceId: "automation-integrations",
      lead: "Connect the tools you already use and remove the repetitive work between them.",
      paragraphs: [
        "We map the process before automating it, so we only automate what should be automated — and keep people in the loop where judgement matters.",
        "Every workflow is monitored. When something fails, it fails visibly and recoverably.",
      ],
      deliverables: ["Process mapping", "API & system integrations", "Automated workflows", "Monitoring & alerts"],
      goodFor: ["Removing manual re-entry", "Syncing systems that don't talk", "Routing requests and approvals"],
      relatedProjects: [],
      overviewHeadline: "We only automate what should be automated — and keep people in the loop where judgement matters.",
      metaDescription: "Automation and integrations by Oveliqt: connect your tools, remove repetitive work and route requests with monitored, recoverable workflows.",
      capabilityNotes: [
        { title: "Workflow automation", body: "Repetitive steps handled automatically, with people involved only where judgement matters." },
        { title: "API integrations", body: "Your systems exchanging data directly, instead of through copy and paste." },
        { title: "Business automation", body: "Requests, approvals and notifications routed to the right person at the right time." },
        { title: "Third-party integrations", body: "Payments, messaging, CRM and accounting tools connected to the way you work." },
      ],
      approach: [
        { title: "Map the process", body: "Every step, hand-off and exception — before anything is automated." },
        { title: "Design the flow", body: "What runs automatically, what needs a person and what happens when something fails." },
        { title: "Connect & build", body: "Integrations and workflows tested against real cases." },
        { title: "Monitor", body: "Alerts and logs so failures are visible and recoverable." },
      ],
      stack: ["REST & webhooks", "Node.js", "Workflow tools", "Monitoring"],
      faqs: [
        { question: "Which tools can you connect?", answer: "Most tools with an API or export — CRMs, spreadsheets, accounting, messaging and payment providers. We confirm feasibility for your stack during discovery." },
        { question: "What happens when an automation fails?", answer: "It fails visibly. Workflows are monitored, alerts reach the right person and failed steps can be retried without losing data." },
        { question: "Do we have to replace our current tools?", answer: "Usually not. The goal is to make the tools you already use work together." },
        hostingFaq,
      ],
      pairsWith: ["software-development", "ai-machine-learning"],
      startingPoint: 2,
      enquiry: "automation",
    },
  ] satisfies readonly OveliqServiceDetail[],
  included: {
    label: "Every project",
    headlineLines: ["WHAT EVERY", "PROJECT INCLUDES"] as const,
    items: [
      { number: "01", title: "A discovery phase", body: "We understand the problem, the people and the constraints before proposing a solution." },
      { number: "02", title: "Design before build", body: "You see and approve how it works before engineering time is committed." },
      { number: "03", title: "Regular demos", body: "Working software every step of the way, so there are no surprises at the end." },
      { number: "04", title: "Documentation & handover", body: "Code, infrastructure and decisions documented so your team can own it." },
    ],
  },
  cta: {
    sample: true,
    eyebrow: "NOT SURE WHICH SERVICE YOU NEED?",
    statement: "Most clients aren't. Tell us the problem and we'll suggest the right mix.",
    ctaLabel: "START A PROJECT",
    ctaHref: "/contact",
    person: { name: "Liam Mercer", role: "Co-founder · Product & AI", sample: true },
  },
} as const;

export type OveliqServicePage = { service: OveliqService; detail: OveliqServiceDetail };

/** Services that have a detail page (`/services/<id>`), in index order. */
export const oveliqServicePages: readonly OveliqServicePage[] = oveliqServicesPage.details.flatMap((detail) => {
  const service = oveliqServices.find((item) => item.id === detail.serviceId);
  return service ? [{ service, detail }] : [];
});

export function findServicePage(slug: string): OveliqServicePage | undefined {
  return oveliqServicePages.find((page) => page.service.id === slug);
}

/* —— About ——————————————————————————————————————————————————————— */

/** Example starting scopes for the ways-to-work page. Project fees are agreed after scope. */
export const oveliqSolutionPricing = {
  solutions: [
    { title: "Websites", description: "A considered home for your business, built to turn interest into enquiries.", startingScope: "A clear web presence", includes: ["Up to 5 core pages", "Responsive design & development", "Contact form & essential SEO"] },
    { title: "Apps & platforms", description: "A focused first version of the product or internal tool you have in mind.", startingScope: "One core workflow", includes: ["One core workflow", "User accounts & a shared database", "Product design, build & handover"] },
    { title: "AI & automation", description: "A practical first step towards less repetitive work and more useful data.", startingScope: "One practical pilot", includes: ["One defined workflow or AI pilot", "Connection to your existing tools", "Evaluation, monitoring & handover"] },
  ],
} as const;

/** "Ways to work together" (/pricing): engagement models, process and FAQ around the starting scopes. */
export const oveliqWaysToWork = {
  intro: "Explore an idea, build a first version or keep improving something that already works. Pick the way of working that fits where you are. You get a written scope and quote before anything starts.",
  models: {
    label: "Three ways to work with us",
    title: ["Start where you are.", "Not where a package says."],
    items: [
      { id: "discovery", name: "Discovery sprint", question: "Not sure what to build first?", body: "A short, focused phase to understand the problem, the people involved and the options. You leave with a clear plan, a scoped first version and an estimate, whether or not you build it with us.", pricing: "Fixed fee, quoted up front", bestFor: "Early ideas, unclear requirements, choosing between options", cta: "Start with discovery", href: "/contact?service=custom#project-brief" },
      { id: "project", name: "Fixed-scope project", question: "Know what you need?", body: "We agree the deliverables, milestones and price, then design and build it. You see progress throughout and get a proper handover at the end.", pricing: "Indicative ranges below · written quote", bestFor: "Websites, first product versions, one workflow or AI pilot", cta: "See starting scopes", href: "#starting-scopes", featured: true },
      { id: "partnership", name: "Ongoing partnership", question: "Already live and growing?", body: "A monthly agreement for improvements, new features and support. We plan the work with you and adjust as your priorities change.", pricing: "Monthly scope, agreed together", bestFor: "Products after launch, teams without in-house developers", cta: "Talk about a partnership", href: "/contact?service=custom#project-brief" },
    ],
  },
  scopes: {
    label: "Fixed-scope projects / Starting scopes",
    title: "A focused first project.",
    body: "Each range is indicative and covers a typical first scope. Your quote depends on what you need, and we can phase the work to fit your budget.",
  },
  process: {
    label: "How a project runs",
    title: "From first message to handover.",
    steps: [
      { title: "A conversation", body: "Tell us your goal on WhatsApp or by email. We ask questions until we understand the problem and who it’s for." },
      { title: "A written proposal", body: "You receive the scope, deliverables, timeline, milestones and price in writing. Nothing starts until you agree." },
      { title: "Build in milestones", body: "We share designs and working software as we go. Payments follow the milestones in your proposal." },
      { title: "Launch & handover", body: "We launch with you, document what we built and hand it over. Ongoing support is available if you want it." },
    ],
  },
  faq: {
    label: "Pricing & process, answered",
    title: "Questions before you start",
    items: [
      { question: "Why do you show price ranges instead of fixed prices?", answer: "Two projects with the same name can need very different work. The ranges show what a typical first scope costs. After a conversation, you get a written quote for your project specifically." },
      { question: "What shapes the final price?", answer: "Features, integrations, data readiness, security and support needs. If the budget is tight, we can phase delivery so the most important part comes first." },
      { question: "What about ongoing costs?", answer: "Hosting, third-party tools, AI usage and ongoing support are separate from the build. Your proposal lists one-off and recurring costs before work begins." },
      { question: "What happens if the scope changes?", answer: "It often does, and that’s fine. We talk through the change, agree any effect on cost and timeline with you in writing, and then carry on." },
      { question: "Who owns the work?", answer: "You do. You get the code, documentation and access to the services it runs on, so you can keep building with us or with anyone else." },
      { question: "Can we start small?", answer: "Yes, and we usually recommend it. A discovery sprint or a single workflow is a good way to see how we work before committing to more." },
    ],
  },
  cta: {
    title: "Not sure which fits?",
    body: "Tell us what you’re trying to do. We’ll suggest the best way to start, on WhatsApp or by email, whichever you prefer.",
    label: "Start a conversation",
    href: "/contact#project-brief",
  },
} as const;

export const oveliqAboutPage = {
  hero: {
    intro: "Oveliqt is an independent software and AI studio in Kigali. We design and build websites, business platforms and applied AI, and we stay close to the people who will use them.",
  },
  purpose: {
    label: "01 / THE STUDIO",
    title: "Good software starts with paying attention.",
    paragraphs: [
      "To the person using it. To the work happening around it. To the small frustrations that end up filling someone’s whole day.",
      "So we start there. Product thinking, design and engineering happen in the same conversation, with the same people, from the first call to the handover.",
      "We work across web, software, AI and data. Whatever the medium, the aim is the same: something useful, easy to understand and ready for everyday use.",
    ],
  },
  origin: {
    label: "02 / HOW WE STARTED",
    title: ["One question,", "asked often."],
    question: "Could we build something better?",
    paragraphs: [
      "Oveliqt began with two brothers who shared an interest in technology and a habit of asking that question whenever something got in someone’s way.",
      "The habit became a practice. We built websites for businesses, contributed to a larger platform with a delivery partner and kept prototyping on our own to test new ideas, especially in applied AI.",
      "Each project taught us something about how people actually work, and that is what we bring to the next one.",
    ],
    /** Labels for portfolio counts; numbers come from portfolio.ts so they stay accurate. */
    tallies: [
      { status: "Client website", singular: "client website", plural: "client websites" },
      { status: "Partner contribution", singular: "partner platform", plural: "partner platforms" },
      { status: "Independent prototype", singular: "independent prototype", plural: "independent prototypes" },
      { status: "ML engineering project", singular: "ML engineering project", plural: "ML engineering projects" },
    ],
  },
  /** Founder cards render here from `oveliqAbout.founders`. */
  people: {
    label: "03 / THE PEOPLE",
    title: ["A small team.", "Close to the work."],
    body: "The people you speak with are the people shaping and building your product. We stay involved from the first conversation through design, engineering and handover.",
  },
  principles: {
    label: "04 / WHAT WE HOLD OURSELVES TO",
    title: ["Fewer, better", "decisions."],
    items: [
      { title: "Understand before we build.", body: "We learn how the work happens today before suggesting what should change. The right first version is usually smaller than you expect." },
      { title: "Plain language, always.", body: "No jargon to hide behind. You hear what we recommend, what it costs and what we’d leave out, in words you can share with your team." },
      { title: "Honest about the work.", body: "We show the work as it is: client projects, partner contributions and our own prototypes, each labelled for what it is." },
      { title: "Built to be handed over.", body: "Readable code, documented decisions and no lock-in. If you take the product in-house, your team can carry on without us." },
    ],
  },
  collaboration: {
    label: "05 / WORKING TOGETHER",
    title: ["CLOSE TO THE WORK.", "CLOSE TO YOU."],
    intro: "A good collaboration makes a complex project feel clearer. Here’s what you can expect from working with us.",
    items: [
      { number: "01", title: "You talk to the people building it.", body: "No account managers in between. We ask questions, explain the trade-offs and make decisions with you, so you know what we’re building and why." },
      { number: "02", title: "One joined-up process.", body: "Product decisions, design and engineering stay in the same conversation, so nothing gets lost between stages." },
      { number: "03", title: "Progress you can see.", body: "We share designs and working software as the product takes shape. Your feedback steers the work while there’s still room to change it." },
    ],
  },
  cta: {
    label: "YOUR IDEA / OUR NEXT CONVERSATION",
    title: "Tell us what you're working on.",
    body: "An early idea, a difficult workflow or a product ready for its next step. Start with a short message on WhatsApp or by email, whichever suits you.",
    linkLabel: "Start a conversation",
    href: "/contact",
    secondaryLabel: "See ways to work together",
    secondaryHref: "/pricing",
  },
} as const;

/* —— Contact ————————————————————————————————————————————————————— */

/** Guided enquiry content. Delivery is configured in oveliqContact. */
export const oveliqEnquiry = {
  steps: ["Your idea", "Your goal", "Let’s talk"],
  /** Final-step delivery choice. A channel shows only when its destination in oveliqContact is set. */
  channels: {
    whatsapp: { label: "WhatsApp", detail: "Chat from your phone. Usually the quickest reply.", action: "Continue on WhatsApp", note: "WhatsApp opens with your message ready. Tap Send there to start the conversation." },
    email: { label: "Email", detail: "Send it from your own inbox. Handy if you want to attach files.", action: "Open in my email app", note: "Your email app opens with the message ready. Press Send when you’re happy with it." },
  },
  emailSubject: "Project enquiry",
  services: [
    { title: "A website", description: "A sharper presence. A better experience.", goals: [
      { label: "Get more enquiries", text: "I’d like a website that helps the right people find my business and makes it easier for them to get in touch." },
      { label: "Refresh our website", text: "Our current website no longer reflects what we do. I’d like to make it clearer, more modern and easier to use." },
      { label: "Launch something new", text: "I’m launching a new business or offer and need a website that explains it clearly and builds trust." },
    ] },
    { title: "An app or platform", description: "Turn an idea into something people use.", goals: [
      { label: "Bring an idea to life", text: "I have an idea for a digital product and would like help turning it into a first version people can try." },
      { label: "Improve an existing product", text: "We have a product already, but I’d like to make the experience simpler and more useful for our users." },
      { label: "Connect our operations", text: "I’d like a platform that brings our team, information and daily workflows together in one place." },
    ] },
    { title: "AI & automation", description: "Less busywork. More possibilities.", goals: [
      { label: "Reduce repetitive work", text: "Our team spends too much time on repetitive tasks. I’d like to automate the routine work so we can focus on what matters." },
      { label: "Put our data to work", text: "We have useful information spread across different tools. I’d like to make it easier to find answers and act on them." },
      { label: "Explore what’s possible", text: "I’d like help identifying where AI could make a practical difference in our business and choosing a useful place to start." },
    ] },
    { title: "Something else", description: "Let’s work out the shape of it together.", goals: [
      { label: "Solve a business problem", text: "There’s a problem in our business that I think technology could help solve. I’d like help finding the right approach." },
      { label: "Find the right direction", text: "I have a few ideas but I’m not sure what to build first. I’d like help deciding where to focus." },
      { label: "Find a technical partner", text: "I’m looking for a technical partner to help shape, build and improve a digital project over time." },
    ] },
  ],
} as const;


