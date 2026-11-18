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
    "slug": "everis",
    "title": "Everis",
    "client": "Everis Holding",
    "tagline": "From investment mandate to a clear corporate website.",
    "intro": "A corporate website for an energy developer and investor, explaining its activities, investment approach and the opportunities it considers.",
    "industry": "Energy · Investment",
    "role": [
      "Website development",
      "Content organisation",
      "Responsive interfaces"
    ],
    "deliverables": [
      "Corporate website",
      "Activity detail pages",
      "Project opportunity content",
      "Enquiry pathways"
    ],
    "mediaSrc": "/assets/work/everis/preview.jpg",
    "mediaAlt": "Everis website preview from a local build",
    "gallery": [
      {
        "src": "/assets/work/everis/detail.jpg",
        "alt": "Everis website content and navigation",
        "caption": "Website preview captured from a local build."
      }
    ],
    "challenge": {
      "label": "The challenge",
      "headlineLines": [
        "A LONG LIFECYCLE",
        "A SIMPLE INTRODUCTION"
      ],
      "lead": "Explain where the business participates, from early development to operating assets.",
      "paragraphs": [
        "Potential partners need to understand the company’s activities, how it evaluates opportunities and which information makes an initial project discussion useful."
      ]
    },
    "solution": {
      "label": "The approach",
      "headlineLines": [
        "A CLEAR MANDATE",
        "A USEFUL NEXT STEP"
      ],
      "lead": "Structure the site around the business and the decisions its visitors need to make.",
      "paragraphs": [
        "About, Activities and Approach pages provide a clear backbone, with separate detail pages for the main activity areas.",
        "Opportunity content explains the stages and project information relevant to an initial discussion. Enquiry pathways preserve that context as visitors move toward contact."
      ]
    },
    "outcome": {
      "label": "The delivery",
      "lead": "From investment mandate to a clear corporate website.",
      "points": [
        "Five main company pages with activity detail pages",
        "Clear project and acquisition opportunity criteria",
        "Responsive layouts and reusable content components",
        "Contextual routes into an enquiry"
      ]
    },
    "category": "Websites",
    "status": "Client website",
    "externalUrl": "https://www.everisholding.com/",
    "mediaNote": "Website previews captured from a local build; the live site may have changed.",
    "featured": true
  }
];
