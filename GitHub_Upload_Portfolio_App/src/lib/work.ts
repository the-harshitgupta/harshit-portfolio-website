import { prisma } from "@/lib/prisma";
import { works as fallbackWorks } from "@/lib/site";

export type DisplayWork = {
  id?: string;
  slug: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
  sortOrder: number;
  published: boolean;
};

function fallback(): DisplayWork[] {
  return fallbackWorks.map((w, i) => ({
    slug: w.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    tag: w.tag,
    title: w.title,
    desc: w.desc,
    image: w.image,
    href: w.href,
    cta: w.cta,
    sortOrder: (i + 1) * 10,
    published: true,
  }));
}

export async function getPublishedWork(): Promise<DisplayWork[]> {
  try {
    const rows = await prisma.workItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (rows.length === 0) return fallback();

    return rows.map((w) => ({
      id: w.id,
      slug: w.slug,
      tag: w.tag,
      title: w.title,
      desc: w.desc,
      image: w.image,
      href: w.href,
      cta: w.cta,
      sortOrder: w.sortOrder,
      published: w.published,
    }));
  } catch {
    return fallback();
  }
}
