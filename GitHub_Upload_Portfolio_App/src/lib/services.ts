import { prisma } from "@/lib/prisma";
import { services as fallbackServices } from "@/lib/site";

export type DisplayService = {
  id?: string;
  slug: string;
  icon: string;
  title: string;
  blurb: string;
  price: string;
  bullets: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  details: string;
  faqs: string;
  sortOrder: number;
  published: boolean;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export function splitBullets(bullets: string): string[] {
  return bullets
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);
}

/**
 * Prices are free-text in the admin panel, so they drift: some rows say
 * "From Rs.14,999", others "From \u20B914,999". Mixed currency notation on a
 * pricing page reads as careless, so normalise it at render time rather than
 * relying on every future edit being typed consistently.
 */
export function normalisePrice(price: string): string {
  return price.replace(/\bRs\.?\s*(?=[\d\u20B9])/gi, "\u20B9");
}

function fallback(): DisplayService[] {
  return fallbackServices.map((s, i) => ({
    slug: s.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    icon: s.icon,
    title: s.title,
    blurb: s.blurb,
    price: normalisePrice(s.price),
    bullets: s.bullets,
    seoTitle: `${s.title} | Harshit Gupta`,
    seoDescription: s.blurb,
    details: "",
    faqs: "",
    sortOrder: (i + 1) * 10,
    published: true,
  }));
}

function mapService(s: {
  id: string;
  slug: string;
  icon: string;
  title: string;
  blurb: string;
  price: string;
  bullets: string;
  seoTitle: string | null;
  seoDescription: string | null;
  details: string;
  faqs: string;
  sortOrder: number;
  published: boolean;
}): DisplayService {
  return {
    id: s.id,
    slug: s.slug,
    icon: s.icon,
    title: s.title,
    blurb: s.blurb,
    price: normalisePrice(s.price),
    bullets: splitBullets(s.bullets),
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    details: s.details,
    faqs: s.faqs,
    sortOrder: s.sortOrder,
    published: s.published,
  };
}

export async function getPublishedServices(): Promise<DisplayService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (rows.length === 0) return fallback();

    return rows.map(mapService);
  } catch {
    return fallback();
  }
}

export async function getPublishedServiceBySlug(
  slug: string
): Promise<DisplayService | null> {
  try {
    const service = await prisma.service.findFirst({
      where: { slug, published: true },
    });
    return service ? mapService(service) : null;
  } catch {
    return fallback().find((s) => s.slug === slug) || null;
  }
}

export function parseFaqs(input: string): ServiceFaq[] {
  return input
    .split("---")
    .map((block) => {
      const [question, ...answerLines] = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return {
        question: question || "",
        answer: answerLines.join(" "),
      };
    })
    .filter((faq) => faq.question && faq.answer);
}
