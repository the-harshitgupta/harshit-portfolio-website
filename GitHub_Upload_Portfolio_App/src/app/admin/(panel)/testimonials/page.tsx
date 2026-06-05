import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TestimonialActions from "@/components/admin/TestimonialActions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">
            Manage client quotes shown on the website.
          </p>
        </div>
        <Link href="/admin/testimonials/new" className="btn btn-primary">
          + New testimonial
        </Link>
      </div>

      <div className="card-base mt-6 overflow-x-auto bg-white">
        {testimonials.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">
            No testimonials yet. Add your first client quote.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-4">Client</th>
                <th className="p-4">Quote</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-b border-line/60 align-top">
                  <td className="p-4">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted">
                      {[t.role, t.company].filter(Boolean).join(", ") || "-"}
                    </div>
                    <div className="mt-1 text-xs text-teal-deep">
                      {"*".repeat(Math.max(1, Math.min(5, t.rating)))}
                    </div>
                  </td>
                  <td className="max-w-xl p-4 text-muted">{t.quote}</td>
                  <td className="p-4 text-muted">{t.sortOrder}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        t.published
                          ? "bg-teal-soft text-teal-deep"
                          : "bg-[#f1f3f4] text-muted"
                      }`}
                    >
                      {t.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <TestimonialActions id={t.id} />
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
