import { prisma } from "@/lib/prisma";
import LeadRow from "@/components/admin/LeadRow";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Leads</h1>
      <p className="mt-1 text-sm text-muted">
        {leads.length} total, captured from the contact form
      </p>

      <div className="card-base mt-6 overflow-x-auto bg-white">
        {leads.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">
            No leads yet. They will appear here when someone submits the contact
            form.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-4">Contact</th>
                <th className="p-4">Need</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <LeadRow
                  key={l.id}
                  lead={{
                    id: l.id,
                    name: l.name,
                    email: l.email,
                    phone: l.phone,
                    business: l.business,
                    need: l.need,
                    message: l.message,
                    status: l.status,
                    createdAt: l.createdAt.toISOString(),
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
