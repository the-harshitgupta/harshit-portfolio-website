"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Could not delete.");
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/posts/${id}/edit`}
        className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-teal-deep hover:text-teal-deep"
      >
        Edit
      </Link>
      <button
        onClick={remove}
        disabled={busy}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        {busy ? "..." : "Delete"}
      </button>
    </div>
  );
}
