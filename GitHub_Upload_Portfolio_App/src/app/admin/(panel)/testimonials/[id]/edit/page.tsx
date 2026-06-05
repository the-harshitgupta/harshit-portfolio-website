import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialEditor from "@/components/admin/TestimonialEditor";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold">Edit testimonial</h1>
      <TestimonialEditor
        initial={{
          id: testimonial.id,
          name: testimonial.name,
          role: testimonial.role || "",
          company: testimonial.company || "",
          quote: testimonial.quote,
          image: testimonial.image || "",
          rating: testimonial.rating,
          sortOrder: testimonial.sortOrder,
          published: testimonial.published,
        }}
      />
    </div>
  );
}
