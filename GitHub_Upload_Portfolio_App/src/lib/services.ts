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
  sortOrder: number;
  published: boolean;
};

export function splitBullets(bullets: string): string[] {
  return bullets
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);
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
    price: s.price,
    bullets: s.bullets,
    sortOrder: (i + 1) * 10,
    published: true,
  }));
}

export async function getPublishedServices(): Promise<DisplayService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (rows.length === 0) return fallback();

    return rows.map((s) => ({
      id: s.id,
      slug: s.slug,
      icon: s.icon,
      title: s.title,
      blurb: s.blurb,
      price: s.price,
      bullets: splitBullets(s.bullets),
      sortOrder: s.sortOrder,
      published: s.published,
    }));
  } catch {
    return fallback();
  }
}
