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

const fallbackTestimonials: DisplayTestimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Founder",
    company: "B2B SaaS Startup",
    quote:
      "Harshit helped us simplify our ICP and positioning into a message our buyers actually understood. The roadmap was practical and easy to execute.",
    image: null,
    rating: 5,
    sortOrder: 10,
    published: true,
  },
  {
    name: "Riya Sharma",
    role: "Brand Lead",
    company: "D2C Skincare Brand",
    quote:
      "The buyer persona research gave us clear content angles, objections, and messaging gaps. It immediately improved how we briefed campaigns.",
    image: null,
    rating: 5,
    sortOrder: 20,
    published: true,
  },
];

export async function getPublishedTestimonials(): Promise<DisplayTestimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (rows.length === 0) return fallbackTestimonials;

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
    return fallbackTestimonials;
  }
}
