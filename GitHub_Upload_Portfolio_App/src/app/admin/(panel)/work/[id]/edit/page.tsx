import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WorkEditor from "@/components/admin/WorkEditor";

export const dynamic = "force-dynamic";

export default async function EditWorkPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.workItem.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold">Edit work item</h1>
      <WorkEditor
        initial={{
          id: item.id,
          slug: item.slug,
          tag: item.tag,
          title: item.title,
          desc: item.desc,
          image: item.image,
          href: item.href,
          cta: item.cta,
          sortOrder: item.sortOrder,
          published: item.published,
        }}
      />
    </div>
  );
}
