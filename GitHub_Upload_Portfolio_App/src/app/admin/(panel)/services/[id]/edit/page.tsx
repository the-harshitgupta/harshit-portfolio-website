import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceEditor from "@/components/admin/ServiceEditor";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold">Edit service</h1>
      <ServiceEditor
        initial={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          icon: service.icon,
          blurb: service.blurb,
          price: service.price,
          bullets: service.bullets,
          seoTitle: service.seoTitle || "",
          seoDescription: service.seoDescription || "",
          details: service.details,
          faqs: service.faqs,
          sortOrder: service.sortOrder,
          published: service.published,
        }}
      />
    </div>
  );
}
