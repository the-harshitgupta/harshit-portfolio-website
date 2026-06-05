import { prisma } from "@/lib/prisma";

export type DisplayTestimonial = {
  id?: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  image: string | null;
  rating: number;
  sortOrder: number;
  published: boolean;
};

export async function getPublishedTestimonials(): Promise<DisplayTestimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return rows.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      quote: t.quote,
      image: t.image,
      rating: t.rating,
      sortOrder: t.sortOrder,
      published: t.published,
    }));
  } catch {
    return [];
  }
}
