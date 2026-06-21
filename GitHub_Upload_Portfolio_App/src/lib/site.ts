export const site = {
  name: "Harshit Gupta",
  role: "Marketing & Growth Strategist for Founders & D2C Brands",
  tagline:
    "Helping founders find their best customers and the message that sells.",
  description:
    "Marketing & growth strategist helping founders, startups, and D2C brands get more of the right customers - with go-to-market strategy, positioning, content, and marketing analytics that drive real growth.",
  email: "harshit.growthpilot@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.theharshitgupta.com",
  location: "New Delhi, India",
  socials: {
    linkedin: "https://www.linkedin.com/in/the-harshitgupta",
    x: "https://x.com/theharshit05",
    instagram: "https://www.instagram.com/theharshitgupta.ai",
    fiverr: "https://www.fiverr.com/h_growth",
  },
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Funnel resources surfaced in the footer so visitors can discover them.
export const resourceLinks = [
  { label: "Free ICP Checklist", href: "/resources/icp-checklist" },
  { label: "ICP & Positioning Workshop", href: "/workshop" },
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
    title: "ICP & Positioning Audit",
    blurb:
      "Start here. A fast, outside-expert review of your customer, offer, and message, with a clear list of exactly what to fix first. Fully credited toward the GTM Clarity Sprint if you upgrade within 14 days.",
    price: `From ${RS}7,500 / $99`,
    bullets: [
      "1-page action sheet (ideal customer + #1 gap)",
      "10-15 min Loom walkthrough of your site/offer",
      "Rewritten headline + one key section",
      "3-5 prioritized, do-able fixes",
      "Credited toward the Sprint if you upgrade",
    ],
  },
  {
    icon: "\u25B2",
    title: "GTM Clarity Sprint",
    blurb:
      "My flagship. A 2-3 week guided sprint that locks your ICP, positioning, and messaging, and hands you a 30-day go-to-market + content plan, so every rupee you spend after works harder.",
    price: `From ${RS}50,000 / $699`,
    bullets: [
      "ICP + buyer persona document",
      "Positioning statement + value proposition",
      "Homepage + core messaging rewrite",
      "30-day GTM + content roadmap",
      "2 calls (kickoff + handover) + async support",
    ],
  },
  {
    icon: "\u25C6",
    title: "Advisory Retainer",
    blurb:
      "Ongoing GTM & positioning direction so your message stays sharp and your pipeline stays warm, month after month. The natural next step after a Sprint.",
    price: `${RS}35,000 / mo \u00b7 $449`,
    bullets: [
      "2 strategy calls per month",
      "Monthly GTM & content direction",
      "Async review of pages, offers & posts",
      "A monthly 1-page action plan",
      "Cancel anytime (7 days' notice)",
    ],
  },
  {
    icon: "\u25A0",
    title: "Brand Positioning Rewrite",
    blurb:
      "A sharper one-line positioning, homepage hero rewrite, offer messaging, and clear differentiation buyers understand fast.",
    price: `From ${RS}14,999 / $249`,
    bullets: [
      "One-line positioning",
      "Homepage hero rewrite",
      "Value proposition",
      "Differentiation angles",
      "Messaging do's & don'ts",
    ],
  },
  {
    icon: "\u25D4",
    title: "Marketing Analytics & KPIs",
    blurb:
      "A simple KPI framework and dashboard so you track leads, conversion, and growth, not vanity metrics.",
    price: `From ${RS}9,999 / $150`,
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
    price: `From ${RS}14,999 / $249`,
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

// Keep these in sync with the service display names in the admin panel.
// The service detail page deep-links to /contact?need=<service title>, so
// these labels must match the live service titles for the dropdown to preselect.
export const needOptions = [
  "Marketing Clarity Audit",
  "Growth Strategy Sprint",
  "Fractional Growth Partner",
  "Messaging & Positioning Rewrite",
  "Marketing Metrics That Matter",
  "AI Content Engine",
  "ICP & Positioning Workshop",
  "Not sure yet",
];
