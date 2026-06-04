export const site = {
  name: "Harshit Gupta",
  role: "GTM & Brand Strategy Consultant",
  tagline:
    "Helping founders find their best customers and the message that sells.",
  description:
    "GTM, ICP research, brand positioning, marketing analytics, and AI-assisted marketing strategy for startups, D2C brands, and small businesses.",
  email: "harshit.growthpilot@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  location: "New Delhi, India",
  socials: {
    linkedin: "https://www.linkedin.com/in/the-harshitgupta",
    instagram: "https://www.instagram.com/theharshitgupta.ai",
    fiverr: "https://www.fiverr.com/h_growth",
    youtube: "#",
  },
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Rupee sign via escape to keep source ASCII-safe.
const RS = "\u20B9";

export type Service = {
  icon: string;
  title: string;
  blurb: string;
  price: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    icon: "\u25C9",
    title: "ICP & Buyer Persona Research",
    blurb:
      "Know exactly who to target, what they care about, why they buy, and how to message them, from reviews, competitors, and AI-assisted analysis.",
    price: `From ${RS}4,999 / $79`,
    bullets: [
      "1-3 detailed buyer personas",
      "Pains, triggers & objections",
      "Competitor messaging gaps",
      "Customer-language messaging angles",
      "Channel & targeting recommendations",
    ],
  },
  {
    icon: "\u25B2",
    title: "GTM Clarity Sprint",
    blurb:
      "ICP, positioning, competitor scan, offer messaging, and a 30-day content & campaign roadmap, delivered in days.",
    price: `From ${RS}14,999 / $249`,
    bullets: [
      "ICP + positioning statement",
      "Competitor scan",
      "Offer & messaging framework",
      "30-day campaign roadmap",
      "Channel priority plan",
    ],
  },
  {
    icon: "\u25A0",
    title: "Brand Positioning Rewrite",
    blurb:
      "A sharper one-line positioning, homepage hero rewrite, offer messaging, and clear differentiation buyers understand fast.",
    price: `From ${RS}4,999 / $79`,
    bullets: [
      "One-line positioning",
      "Homepage hero rewrite",
      "Value proposition",
      "Differentiation angles",
      "Messaging do's & don'ts",
    ],
  },
  {
    icon: "\u25C6",
    title: "Founder Growth Playbook",
    blurb:
      "ICP deck, funnel map, content pillars, KPI dashboard structure, and complete marketing direction before you hire or scale.",
    price: `From ${RS}39,999 / $699`,
    bullets: [
      "ICP & persona deck",
      "Full funnel map",
      "Content pillar system",
      "KPI dashboard structure",
      "90-day execution plan",
    ],
  },
  {
    icon: "\u25D4",
    title: "Marketing Analytics & KPIs",
    blurb:
      "A simple KPI framework and dashboard so you track leads, conversion, and growth, not vanity metrics.",
    price: `From ${RS}6,999 / $120`,
    bullets: [
      "KPI framework",
      "Dashboard structure (Power BI/Sheets)",
      "Funnel metrics map",
      "Reporting cadence",
      "What-to-track checklist",
    ],
  },
  {
    icon: "\u25B7",
    title: "AI Content Strategy System",
    blurb:
      "Content pillars, a 30-day calendar, a hook bank, and an AI-assisted repurposing workflow tied to leads.",
    price: `From ${RS}9,999 / $150`,
    bullets: [
      "5 content pillars",
      "30-day content calendar",
      "Hook & angle bank",
      "AI repurposing workflow",
      "Content-to-lead funnel",
    ],
  },
];

export type Work = {
  tag: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
};

export const works: Work[] = [
  {
    tag: "B2B SaaS / GTM",
    title: "NudgeAI Go-To-Market Plan",
    desc: "ICP, competitor gaps, positioning, and a 90-day launch roadmap for a B2B sales intelligence product.",
    image: "/work/portfolio_nudgeai.png",
    href: "/work/NudgeAI_GTM_Sample.pdf",
    cta: "View sample PDF",
  },
  {
    tag: "D2C / Brand Strategy",
    title: "Glow & Co ICP & Personas",
    desc: "Audience strategy and buyer personas for a D2C skincare brand, with messaging and content direction.",
    image: "/work/portfolio_glow.png",
    href: "/work/Glow_Co_ICP_Sample.pdf",
    cta: "View sample PDF",
  },
  {
    tag: "Research / Positioning",
    title: "ICP & Buyer Persona Research",
    desc: "A productized research deliverable: pains, buying triggers, objections, competitor insight, and messaging angles.",
    image: "/work/portfolio_icp.png",
    href: "/contact",
    cta: "Request this service",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "I review your business, offer, audience, and competitors to find where the real gaps are.",
  },
  {
    num: "02",
    title: "Research",
    desc: "Reviews, competitor scans, and AI-assisted analysis to uncover customer language and intent.",
  },
  {
    num: "03",
    title: "Strategize",
    desc: "ICP, positioning, messaging, and a roadmap mapped to your goals and channels.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "A practical document and a short walkthrough so your team can execute right away.",
  },
];

export const needOptions = [
  "ICP & Buyer Persona Research",
  "GTM Clarity Sprint",
  "Brand Positioning Rewrite",
  "Founder Growth Playbook",
  "Marketing Analytics & KPIs",
  "AI Content Strategy System",
  "Not sure yet",
];
