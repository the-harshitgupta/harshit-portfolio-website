import Link from "next/link";
import { prisma } from "@/lib/prisma";
import WorkActions from "@/components/admin/WorkActions";

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  const items = await prisma.workItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Work</h1>
          <p className="mt-1 text-sm text-muted">
            Manage portfolio cards, sample PDFs, and case-study links.
          </p>
        </div>
        <Link href="/admin/work/new" className="btn btn-primary">
          + New work
        </Link>
      </div>

      <div className="card-base mt-6 overflow-x-auto bg-white">
        {items.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">
            No work items yet. Create your first portfolio item.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-4">Work</th>
                <th className="p-4">Link</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w.id} className="border-b border-line/60 align-top">
                  <td className="p-4">
                    <div className="font-medium">{w.title}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-teal-deep">
                      {w.tag}
                    </div>
                    <div className="mt-1 max-w-xl text-xs text-muted">{w.desc}</div>
                  </td>
                  <td className="p-4 text-xs text-muted">{w.href}</td>
                  <td className="p-4 text-muted">{w.sortOrder}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        w.published
                          ? "bg-teal-soft text-teal-deep"
                          : "bg-[#f1f3f4] text-muted"
                      }`}
                    >
                      {w.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <WorkActions id={w.id} />
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
