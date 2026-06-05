"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type TestimonialData = {
  id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
  sortOrder: number;
  published: boolean;
};

const empty: TestimonialData = {
  name: "",
  role: "",
  company: "",
  quote: "",
  image: "",
  rating: 5,
  sortOrder: 100,
  published: true,
};

export default function TestimonialEditor({
  initial,
}: {
  initial?: TestimonialData;
}) {
  const router = useRouter();
  const [data, setData] = useState<TestimonialData>(initial || empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initial?.id);

  function set<K extends keyof TestimonialData>(
    key: K,
    value: TestimonialData[K]
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `/api/admin/testimonials/${initial!.id}`
        : "/api/admin/testimonials";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save testimonial.");
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save testimonial.");
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

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="field"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Client name"
          />
        </div>
        <div>
          <label className="label" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            className="field"
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Company / brand"
          />
        </div>
      </div>

      <label className="label" htmlFor="role">
        Role
      </label>
      <input
        id="role"
        className="field"
        value={data.role}
        onChange={(e) => set("role", e.target.value)}
        placeholder="Founder / Marketing Lead"
      />

      <label className="label" htmlFor="quote">
        Quote
      </label>
      <textarea
        id="quote"
        className="field min-h-[150px] resize-y"
        value={data.quote}
        onChange={(e) => set("quote", e.target.value)}
        placeholder="What did they say about the work?"
      />

      <label className="label" htmlFor="image">
        Image URL/path (optional)
      </label>
      <input
        id="image"
        className="field"
        value={data.image}
        onChange={(e) => set("image", e.target.value)}
        placeholder="/testimonials/client.jpg or https://..."
      />

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="rating">
            Rating
          </label>
          <input
            id="rating"
            type="number"
            min={1}
            max={5}
            className="field"
            value={data.rating}
            onChange={(e) => set("rating", Number(e.target.value) || 5)}
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
          {saving
            ? "Saving..."
            : isEdit
              ? "Update testimonial"
              : "Create testimonial"}
        </button>
        <button
          onClick={() => router.push("/admin/testimonials")}
          className="btn btn-ghost"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
