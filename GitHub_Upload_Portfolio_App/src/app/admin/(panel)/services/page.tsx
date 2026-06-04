import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiceActions from "@/components/admin/ServiceActions";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Services</h1>
          <p className="mt-1 text-sm text-muted">
            Manage the services and prices shown on the website.
          </p>
        </div>
        <Link href="/admin/services/new" className="btn btn-primary">
          + New service
        </Link>
      </div>

      <div className="card-base mt-6 overflow-x-auto bg-white">
        {services.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">
            No services yet. Create your first service.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-4">Service</th>
                <th className="p-4">Price</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-line/60 align-top">
                  <td className="p-4">
                    <div className="font-medium">{s.title}</div>
                    <div className="mt-1 max-w-xl text-xs text-muted">
                      {s.blurb}
                    </div>
                    <div className="mt-1 text-xs text-teal-deep">/{s.slug}</div>
                  </td>
                  <td className="p-4 font-medium text-navy">{s.price}</td>
                  <td className="p-4 text-muted">{s.sortOrder}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        s.published
                          ? "bg-teal-soft text-teal-deep"
                          : "bg-[#f1f3f4] text-muted"
                      }`}
                    >
                      {s.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <ServiceActions id={s.id} />
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
