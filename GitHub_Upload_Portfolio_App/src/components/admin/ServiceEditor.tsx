"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type ServiceData = {
  id?: string;
  title: string;
  slug: string;
  icon: string;
  blurb: string;
  price: string;
  bullets: string;
  sortOrder: number;
  published: boolean;
};

const empty: ServiceData = {
  title: "",
  slug: "",
  icon: "*",
  blurb: "",
  price: "",
  bullets: "",
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

export default function ServiceEditor({ initial }: { initial?: ServiceData }) {
  const router = useRouter();
  const [data, setData] = useState<ServiceData>(initial || empty);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initial?.id);

  function set<K extends keyof ServiceData>(key: K, value: ServiceData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `/api/admin/services/${initial!.id}`
        : "/api/admin/services";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save service.");
      }
      router.push("/admin/services");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save service.");
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

      <div className="grid gap-x-4 sm:grid-cols-[1fr_110px]">
        <div>
          <label className="label" htmlFor="title">
            Service title
          </label>
          <input
            id="title"
            className="field"
            value={data.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
            placeholder="ICP & Buyer Persona Research"
          />
        </div>
        <div>
          <label className="label" htmlFor="icon">
            Icon text
          </label>
          <input
            id="icon"
            className="field"
            value={data.icon}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="AI"
          />
        </div>
      </div>

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
        placeholder="icp-buyer-persona-research"
      />

      <label className="label" htmlFor="blurb">
        Short description
      </label>
      <textarea
        id="blurb"
        className="field min-h-[95px] resize-y"
        value={data.blurb}
        onChange={(e) => set("blurb", e.target.value)}
        placeholder="Explain the result this service creates for the buyer."
      />

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            className="field"
            value={data.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="From Rs.4,999 / $79"
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
            placeholder="10"
          />
        </div>
      </div>

      <label className="label" htmlFor="bullets">
        Deliverables / bullets (one per line)
      </label>
      <textarea
        id="bullets"
        className="field min-h-[170px] resize-y font-mono text-[0.9rem]"
        value={data.bullets}
        onChange={(e) => set("bullets", e.target.value)}
        placeholder={"Buyer persona profile\nPain points\nMessaging angles"}
      />

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
          {saving ? "Saving..." : isEdit ? "Update service" : "Create service"}
        </button>
        <button
          onClick={() => router.push("/admin/services")}
          className="btn btn-ghost"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
