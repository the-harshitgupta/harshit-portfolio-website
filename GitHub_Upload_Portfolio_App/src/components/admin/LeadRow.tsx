"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = ["new", "contacted", "won", "lost"];

export default function LeadRow({
  lead,
}: {
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    business: string | null;
    need: string | null;
    message: string | null;
    status: string;
    createdAt: string;
  };
}) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function changeStatus(next: string) {
    setStatus(next);
    setBusy(true);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <>
      <tr className="border-b border-line/60 align-top">
        <td className="p-4">
          <div className="font-medium">{lead.name}</div>
          <a
            href={`mailto:${lead.email}`}
            className="text-xs text-teal-deep hover:underline"
          >
            {lead.email}
          </a>
          {lead.phone && (
            <a
              href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
              className="block text-xs text-muted hover:text-teal-deep hover:underline"
            >
              {lead.phone}
            </a>
          )}
          {lead.business && (
            <div className="text-xs text-muted">{lead.business}</div>
          )}
        </td>
        <td className="p-4 text-muted">{lead.need || "-"}</td>
        <td className="p-4">
          <select
            value={status}
            disabled={busy}
            onChange={(e) => changeStatus(e.target.value)}
            className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-semibold"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </td>
        <td className="p-4 text-xs text-muted">
          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="p-4">
          <div className="flex justify-end gap-2">
            {lead.message && (
              <button
                onClick={() => setOpen((o) => !o)}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-teal-deep hover:text-teal-deep"
              >
                {open ? "Hide" : "View"}
              </button>
            )}
            <button
              onClick={remove}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      {open && lead.message && (
        <tr className="border-b border-line/60 bg-cream/50">
          <td colSpan={5} className="p-4 text-sm text-muted">
            <strong className="text-ink">Message:</strong> {lead.message}
          </td>
        </tr>
      )}
    </>
  );
}
