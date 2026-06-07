import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

type PostSeoFields = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
};

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const rawPost = await prisma.post.findUnique({ where: { id: params.id } });
  if (!rawPost) notFound();
  const post = rawPost as typeof rawPost & PostSeoFields;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold">Edit post</h1>
      <PostEditor
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage || "",
          seoTitle: post.seoTitle || "",
          seoDescription: post.seoDescription || "",
          ogImage: post.ogImage || "",
          category: post.category,
          tags: post.tags,
          published: post.published,
          featured: post.featured,
        }}
      />
    </div>
  );
}
