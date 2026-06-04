import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [postCount, publishedCount, leadCount, newLeads, recentLeads] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total posts", value: postCount },
    { label: "Published", value: publishedCount },
    { label: "Total leads", value: leadCount },
    { label: "New leads", value: newLeads, accent: true },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Overview of your content and leads.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-base bg-white p-5">
            <div
              className={`font-serif text-3xl font-extrabold ${
                s.accent ? "text-teal-deep" : "text-navy"
              }`}
            >
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/posts/new" className="btn btn-primary">
          + New blog post
        </Link>
        <Link href="/admin/leads" className="btn btn-ghost">
          View all leads
        </Link>
      </div>

      <div className="card-base mt-8 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold">Recent leads</h2>
          <Link
            href="/admin/leads"
            className="text-sm font-semibold text-teal-deep hover:underline"
          >
            See all &#8594;
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="text-sm text-muted">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Need</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id} className="border-b border-line/60">
                    <td className="py-2.5 pr-4 font-medium">{l.name}</td>
                    <td className="py-2.5 pr-4 text-muted">{l.email}</td>
                    <td className="py-2.5 pr-4 text-muted">{l.need || "-"}</td>
                    <td className="py-2.5 pr-4">
                      <span className="rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-semibold text-teal-deep">
                        {l.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted">
                      {formatDate(l.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
