"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type WorkData = {
  id?: string;
  slug: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
  sortOrder: number;
  published: boolean;
};

const empty: WorkData = {
  slug: "",
  tag: "",
  title: "",
  desc: "",
  image: "",
  href: "",
  cta: "View sample",
  sortOrder: 100,
  published: true,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function WorkEditor({ initial }: { initial?: WorkData }) {
  const router = useRouter();
  const [data, setData] = useState<WorkData>(initial || empty);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initial?.id);

  function set<K extends keyof WorkData>(key: K, value: WorkData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/admin/work/${initial!.id}` : "/api/admin/work";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save work item.");
      }
      router.push("/admin/work");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save work item.");
      setSaving(false);
    }
  }

  return (
    <div className="card-base bg-white p-7">
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <label className="label" htmlFor="title">
        Work title
      </label>
      <input
        id="title"
        className="field"
        value={data.title}
        onChange={(e) => {
          set("title", e.target.value);
          if (!slugTouched) set("slug", slugify(e.target.value));
        }}
        placeholder="NudgeAI Go-To-Market Plan"
      />

      <label className="label" htmlFor="slug">
        Slug
      </label>
      <input
        id="slug"
        className="field"
        value={data.slug}
        onChange={(e) => {
          setSlugTouched(true);
          set("slug", slugify(e.target.value));
        }}
        placeholder="nudgeai-go-to-market-plan"
      />

      <label className="label" htmlFor="tag">
        Tag / category
      </label>
      <input
        id="tag"
        className="field"
        value={data.tag}
        onChange={(e) => set("tag", e.target.value)}
        placeholder="B2B SaaS / GTM"
      />

      <label className="label" htmlFor="desc">
        Description
      </label>
      <textarea
        id="desc"
        className="field min-h-[95px] resize-y"
        value={data.desc}
        onChange={(e) => set("desc", e.target.value)}
        placeholder="Briefly explain the project and outcome."
      />

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="image">
            Image URL/path
          </label>
          <input
            id="image"
            className="field"
            value={data.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/work/portfolio_glow.png"
          />
        </div>
        <div>
          <label className="label" htmlFor="href">
            CTA link / PDF path
          </label>
          <input
            id="href"
            className="field"
            value={data.href}
            onChange={(e) => set("href", e.target.value)}
            placeholder="/work/sample.pdf or /contact"
          />
        </div>
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cta">
            CTA label
          </label>
          <input
            id="cta"
            className="field"
            value={data.cta}
            onChange={(e) => set("cta", e.target.value)}
            placeholder="View sample PDF"
          />
        </div>
        <div>
          <label className="label" htmlFor="sortOrder">
            Sort order
          </label>
          <input
            id="sortOrder"
            type="number"
            className="field"
            value={data.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={data.published}
          onChange={(e) => set("published", e.target.checked)}
        />
        Published on website
      </label>

      <div className="mt-6 flex gap-3">
        <button onClick={save} disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : isEdit ? "Update work" : "Create work"}
        </button>
        <button onClick={() => router.push("/admin/work")} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </div>
  );
}
