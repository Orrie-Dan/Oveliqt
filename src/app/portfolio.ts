import type { OveliqProjectDetail } from "./content";

/** Public projects in editorial order; project type and contribution remain explicit. */
export const portfolioProjects: readonly OveliqProjectDetail[] = [
  {
    "slug": "ecobe",
    "category": "Websites",
    "status": "Client website",
    "featured": true,
    "title": "ECOBE",
    "client": "Steel & Interiors",
    "tagline": "From a printed catalogue to a browsable collection.",
    "intro": "A website for ECOBE Trading Company in Kigali — steel fabrication, wood manufacturing and interior solutions — built from the company profile and product catalogue.",
    "industry": "Manufacturing · Interiors",
    "role": [
      "Art direction",
      "Interface design",
      "Front-end engineering",
      "Content structure"
    ],
    "deliverables": [
      "Marketing website",
      "Work catalogue",
      "WhatsApp & email enquiries"
    ],
    "mediaSrc": "/assets/work/ecobe/workshop.jpg",
    "mediaAlt": "ECOBE homepage — full-bleed black-and-white photograph of a mitre saw in the workshop",
    "gallery": [
      {
        "src": "/assets/work/ecobe/headline.jpg",
        "alt": "ECOBE homepage typographic pause: “We Build What Lasts.”"
      },
      {
        "src": "/assets/work/ecobe/editorial.jpg",
        "alt": "Outdoor dining set photograph above the workshop introduction in editorial serif type"
      }
    ],
    "challenge": {
      "label": "Challenge",
      "headlineLines": [
        "THE WORK",
        "LIVED IN PRINT"
      ],
      "lead": "The workshop's best pieces lived in a company profile and a printed catalogue.",
      "paragraphs": [
        "The company profile and product catalogue needed a digital home where visitors could explore the work and enquire about a specific piece."
      ]
    },
    "solution": {
      "label": "Solution",
      "headlineLines": [
        "IMAGE, PAUSE,",
        "IMAGE AGAIN"
      ],
      "lead": "Let the work lead, then make the enquiry specific.",
      "paragraphs": [
        "Large photographs and a restrained editorial layout introduce the workshop and its materials. Individual work pages give each piece room to be explored.",
        "Each work page connects to a prepared WhatsApp message or email draft with the piece title, reference and link, giving the conversation a clear starting point."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "Each piece has its own page and a one-tap way to ask about it.",
      "points": [
        "A browsable catalogue of steel, wood and interior work",
        "Enquiries that name the exact piece",
        "WhatsApp and email contact with no backend to run"
      ]
    },
    "externalUrl": "https://ecobe.vercel.app",
    "mediaNote": "Website preview. Product-specific enquiries connect each piece to a prepared WhatsApp or email message."
  },
  {
    "slug": "soliaris",
    "title": "Soliaris Africa",
    "client": "Soliaris Africa Ltd",
    "tagline": "A regional energy story, brought online.",
    "intro": "A corporate website for Soliaris Africa, connecting its purpose, energy-development focus and regional outlook through a visual, multi-page experience.",
    "industry": "Energy · Infrastructure",
    "role": [
      "Website development",
      "Content organisation",
      "Responsive interfaces",
      "Interactive mapping"
    ],
    "deliverables": [
      "Corporate website",
      "Regional map experience",
      "Company and opportunity pages",
      "News and partner content"
    ],
    "mediaSrc": "/assets/work/soliaris/preview.jpg",
    "mediaAlt": "Soliaris Africa website preview from a local build",
    "gallery": [
      {
        "src": "/assets/work/soliaris/detail.jpg",
        "alt": "Soliaris Africa website content and navigation",
        "caption": "Website preview captured from a local build."
      }
    ],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "A REGIONAL VISION",
        "A CLEAR STORY"
      ],
      "lead": "Make a broad energy-development ambition understandable to the people who might become partners.",
      "paragraphs": [
        "The site needed to explain both the company’s focus in The Gambia and its wider West African outlook, with clear routes into its activities and opportunities."
      ]
    },
    "solution": {
      "label": "The approach",
      "headlineLines": [
        "PLACE, PURPOSE,",
        "POSSIBILITY"
      ],
      "lead": "Bring the geography and the business story into the same experience.",
      "paragraphs": [
        "A visual opening introduces the company, followed by its energy systems, regional focus, opportunities and impact approach.",
        "An interactive regional map gives the outlook a geographic context. Company, activity, partnership and news pages let visitors explore further without overloading the homepage."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "A regional energy story, brought online.",
      "points": [
        "Multi-page company and opportunity presentation",
        "Interactive West African regional map",
        "Responsive layouts for desktop and mobile",
        "Structured news and partnership content"
      ]
    },
    "category": "Websites",
    "status": "Client website",
    "featured": true,
    "externalUrl": "https://soliaris.vercel.app/",
    "mediaNote": "Website previews captured from a local build; the live site may have changed."
  },
  {
    "slug": "energex",
    "title": "Energex",
    "client": "Energex Global Solution",
    "tagline": "A complex energy offer, made easier to explore.",
    "intro": "A corporate energy website structured around solutions, equipment, industries and project delivery, with English and Traditional Chinese content architecture.",
    "industry": "Energy · Engineering",
    "role": [
      "Website development",
      "Information architecture",
      "Responsive interfaces",
      "Localisation implementation"
    ],
    "deliverables": [
      "Solution and equipment pages",
      "Industry navigation",
      "English and Traditional Chinese routes",
      "Enquiry flow architecture"
    ],
    "mediaSrc": "/assets/work/energex/preview.jpg",
    "mediaAlt": "Current Energex website with its video-led energy facility hero, navy interface and orange highlights",
    "gallery": [
      {
        "src": "/assets/work/energex/detail.jpg",
        "alt": "Energex website content and navigation",
        "caption": "Current-source website preview — solution discovery and equipment pathways."
      }
    ],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "MANY CAPABILITIES",
        "ONE WAY IN"
      ],
      "lead": "Help visitors navigate a technical offer without needing to understand the entire energy value chain first.",
      "paragraphs": [
        "Generation, storage, infrastructure and lifecycle services address different needs. The website needed a consistent structure for comparing capabilities and finding a relevant next step."
      ]
    },
    "solution": {
      "label": "The approach",
      "headlineLines": [
        "FROM OVERVIEW",
        "TO THE DETAIL"
      ],
      "lead": "Organise the experience around the questions a prospective partner brings.",
      "paragraphs": [
        "The content model connects solution families, equipment and industries, with dedicated detail pages rather than one undifferentiated list of capabilities.",
        "Locale-aware routes and navigation support English and Traditional Chinese. Enquiry validation and delivery architecture provide a defined path from discovery to a project discussion."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "A complex energy offer, made easier to explore.",
      "points": [
        "Structured solution and equipment discovery",
        "Industry-specific content pathways",
        "English and Traditional Chinese content architecture",
        "Responsive components and an enquiry workflow"
      ]
    },
    "category": "Websites",
    "status": "Client website",
    "featured": true,
    "externalUrl": "https://www.energexglobalsolution.com/en",
    "mediaNote": "Website captured from the current source in an isolated local preview."
  },
  {
    "slug": "crosswalk-intelligence",
    "title": "Crosswalk Intelligence",
    "client": "Independent project",
    "tagline": "From traffic footage to reviewable crossing events.",
    "intro": "A computer-vision prototype combining object tracking and event analysis to help a human reviewer inspect pedestrian and vehicle interactions at a crossing.",
    "industry": "AI · Computer Vision",
    "role": [
      "Detection and tracking pipeline",
      "Event analysis",
      "Evaluation",
      "Review interface implementation"
    ],
    "deliverables": [
      "Video-analysis pipeline",
      "Crossing annotation workflow",
      "Reviewable event output",
      "Evaluation write-up"
    ],
    "mediaSrc": "/assets/work/crosswalk-intelligence/product-visual.svg",
    "mediaAlt": "Crossing-analysis visualisation showing crossing zones, pedestrian and vehicle trajectories, and event review",
    "gallery": [],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "DETECTIONS ALONE",
        "DON’T TELL THE STORY"
      ],
      "lead": "Turn movement over time into an event a person can inspect.",
      "paragraphs": [
        "A box around a person or vehicle does not explain how they interact. Crossing analysis needs tracks, a defined crossing area and a transparent event definition."
      ]
    },
    "solution": {
      "label": "The approach",
      "headlineLines": [
        "TRACK THE MOVEMENT",
        "REVIEW THE EVENT"
      ],
      "lead": "Connect object tracks with crossing geometry and event-level review.",
      "paragraphs": [
        "The pipeline combines YOLO detection and ByteTrack tracking with crossing-event analysis. A review interface supports video upload, crossing annotation and inspection of the results.",
        "The project write-up reports 96% precision and 81% recall on 45 hand-reviewed events from unseen videos at a single Bangkok intersection. Those results describe a narrow project evaluation, not validated performance across locations or a deployed enforcement service."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "From traffic footage to reviewable crossing events.",
      "points": [
        "Detection and tracking connected to event analysis",
        "Crossing annotation and review workflow",
        "Human inspection of flagged interactions",
        "Documented evaluation with explicit dataset and sample-size limits"
      ]
    },
    "category": "AI & Research",
    "status": "Independent prototype",
    "featured": true,
    "mediaNote": "Conceptual product visualisation of the analysis process, not recorded footage or measured detection output."
  },
  {
    "slug": "axeora",
    "title": "Axeora",
    "client": "Axeora UAE",
    "tagline": "A clear digital presence for a complex technology business.",
    "intro": "A corporate website presenting Axeora’s technology capabilities and UAE–Africa outlook through interactive geography, mission-based content and dedicated solution pages.",
    "industry": "Technology · Corporate",
    "role": [
      "Website development",
      "Content structure",
      "Interactive interfaces",
      "Responsive implementation"
    ],
    "deliverables": [
      "Corporate website",
      "Interactive geographic hero",
      "Capability and solution pages",
      "Company and regional content"
    ],
    "mediaSrc": "/assets/work/axeora/preview.jpg",
    "mediaAlt": "Axeora website preview from a local build",
    "gallery": [
      {
        "src": "/assets/work/axeora/detail.jpg",
        "alt": "Axeora website content and navigation",
        "caption": "Website preview captured from a local build."
      }
    ],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "COMPLEX TECHNOLOGY",
        "A CLEAR ENTRANCE"
      ],
      "lead": "Present several technology domains through a coherent company story.",
      "paragraphs": [
        "AI infrastructure, cloud, cybersecurity and digital public services speak to different audiences. The website needed to make the relationships understandable while keeping each area easy to explore."
      ]
    },
    "solution": {
      "label": "The approach",
      "headlineLines": [
        "GEOGRAPHY FIRST",
        "CAPABILITIES NEXT"
      ],
      "lead": "Connect the company’s regional outlook with the capabilities it describes.",
      "paragraphs": [
        "A geographic opening introduces the UAE–Africa corridor. Capability sections, mission-oriented content and solution pages then provide progressively more detail.",
        "The work covers website development and interactive presentation. It does not represent delivery of the AI, cloud or cybersecurity infrastructure described in the company’s content."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "A clear digital presence for a complex technology business.",
      "points": [
        "Interactive geographic introduction",
        "Structured capability and solution content",
        "Responsive corporate website",
        "Distinct routes into company and regional information"
      ]
    },
    "category": "Websites",
    "status": "Client website",
    "featured": true,
    "externalUrl": "https://www.axeora.ai/",
    "mediaNote": "Website previews captured from a local build. This case study covers the website, not the infrastructure services it describes."
  },
  {
    "slug": "education-operations",
    "title": "Education Operations Platform",
    "client": "Confidential · Partner delivery",
    "tagline": "Register a learner. Record the day. See what needs attention.",
    "intro": "A development contribution within a partner-led education platform. Registration, attendance and assessments connect daily staff workflows with management reporting, including synchronisation for interrupted connectivity.",
    "category": "Platforms",
    "status": "Partner contribution",
    "industry": "Education · Operations",
    "role": [
      "Platform development contribution",
      "Role-specific interfaces",
      "Data and workflow integration"
    ],
    "deliverables": [
      "Registration and record workflows",
      "Attendance and assessment capture",
      "Role-specific reporting",
      "Offline-friendly record synchronisation"
    ],
    "mediaSrc": "/assets/work/education-operations/product-visual.svg",
    "mediaAlt": "Anonymised education-system visualisation combining attendance capture, learner records and synchronisation",
    "mediaNote": "Anonymised product visualisation with illustrative records; not a screenshot of the confidential system.",
    "gallery": [],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "LOCAL RECORDS",
        "A SHARED PICTURE"
      ],
      "lead": "The same records need to serve two very different working days.",
      "paragraphs": [
        "Local staff need to register learners and capture attendance or assessments quickly. Managers need to review completeness, trends and follow-up across those records. The interface has to support both without making daily capture feel like report preparation.",
        "Interrupted connectivity adds another constraint: records captured locally need a path back into the shared operational picture."
      ]
    },
    "solution": {
      "label": "How it works",
      "headlineLines": [
        "CAPTURE ONCE",
        "FOLLOW THROUGH"
      ],
      "lead": "A shared record follows the learner through day-to-day activity and review.",
      "paragraphs": [
        "01 / Register. Establish the learner record and its relevant relationships so later activity stays connected to the same person.",
        "02 / Capture. Give staff focused views for attendance, screening, assessments and follow-up needs, with offline-friendly capture and synchronisation.",
        "03 / Review. Bring the records into role-specific management views, with reporting and change history to support oversight.",
        "Oveliqt contributed platform development, role-specific interfaces, and data and workflow integration within a partner-led delivery. Client identity and programme details remain confidential."
      ]
    },
    "outcome": {
      "label": "The system",
      "lead": "Connected records from registration to management review.",
      "points": [
        "Registration linked with attendance and assessments",
        "Role-specific staff and management workspaces",
        "Synchronisation for interrupted connectivity",
        "Reporting and traceable record changes"
      ]
    },
    "featured": true
  },
  {
    "slug": "cira",
    "category": "Platforms",
    "status": "Independent prototype",
    "mediaNote": "Prototype interface. No public-service deployment or adoption is claimed.",
    "title": "CIRA",
    "client": "Civic Reporting",
    "tagline": "Citizens report it. Officers resolve it. Everyone sees the status.",
    "intro": "An independent civic-reporting prototype connecting a citizen reporting experience with officer and administrator workspaces. Built to explore a visible path from a reported issue to resolution.",
    "industry": "Public Sector · Civic Tech",
    "role": [
      "Product design",
      "API & data model",
      "Web & mobile apps",
      "Admin dashboard"
    ],
    "deliverables": [
      "Citizen web app",
      "iOS & Android app",
      "Officer & admin dashboard",
      "Photo uploads & status tracking"
    ],
    "mediaSrc": "/assets/work/cira/report-map.jpg",
    "mediaAlt": "CIRA homepage — report and status actions above an interactive reporting map",
    "gallery": [
      {
        "src": "/assets/work/cira/how-it-works.jpg",
        "alt": "CIRA's four reporting steps: locate, describe, submit and track"
      }
    ],
    "challenge": {
      "label": "Challenge",
      "headlineLines": [
        "REPORTS THAT",
        "GO NOWHERE"
      ],
      "lead": "Reporting broken infrastructure usually means never knowing whether anyone saw it.",
      "paragraphs": [
        "Citizens need a quick way to report a problem with evidence. Officers need one queue to triage and resolve reports, not scattered calls and messages."
      ]
    },
    "solution": {
      "label": "Solution",
      "headlineLines": [
        "ONE REPORT",
        "TRACKED TO DONE"
      ],
      "lead": "One API behind a citizen web app, a mobile app and an officer dashboard.",
      "paragraphs": [
        "Citizens submit reports with photos from the web or the React Native app. Officers and administrators work through them in a dashboard, and citizens can track the status of their report. Email and SMS delivery remain development mocks; the case study covers the reporting and officer workflows."
      ]
    },
    "outcome": {
      "label": "Outcome",
      "lead": "A prototype connecting citizen reports with officer workflows.",
      "points": [
        "Reporting from web and mobile",
        "Photo evidence on every report",
        "Officer and administrator workflows",
        "Report status tracking across citizen and officer views"
      ]
    },
    "externalUrl": "https://cira-ashy.vercel.app",
    "featured": false
  }
];
