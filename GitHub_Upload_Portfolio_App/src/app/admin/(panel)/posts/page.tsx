import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import PostActions from "@/components/admin/PostActions";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Blog posts</h1>
          <p className="mt-1 text-sm text-muted">{posts.length} total</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          + New post
        </Link>
      </div>

      <div className="card-base mt-6 overflow-x-auto bg-white">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">
            No posts yet. Create your first one.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-line/60">
                  <td className="p-4">
                    <div className="font-medium">{p.title}</div>
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="text-xs text-teal-deep hover:underline"
                    >
                      /blog/{p.slug}
                    </Link>
                  </td>
                  <td className="p-4 text-muted">{p.category}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.published
                          ? "bg-teal-soft text-teal-deep"
                          : "bg-[#f1f3f4] text-muted"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-muted">{formatDate(p.createdAt)}</td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <PostActions id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
