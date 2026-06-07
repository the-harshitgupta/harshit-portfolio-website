"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type PostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  category: string;
  tags: string;
  published: boolean;
  featured: boolean;
};

const empty: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
  category: "Marketing",
  tags: "",
  published: true,
  featured: false,
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

export default function PostEditor({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const [data, setData] = useState<PostData>(initial || empty);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initial?.id);

  function set<K extends keyof PostData>(key: K, value: PostData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not save.");
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
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
        Title
      </label>
      <input
        id="title"
        className="field"
        value={data.title}
        onChange={(e) => {
          set("title", e.target.value);
          if (!slugTouched) set("slug", slugify(e.target.value));
        }}
        placeholder="How to define your ICP in 7 days"
      />

      <label className="label" htmlFor="slug">
        Slug (URL)
      </label>
      <input
        id="slug"
        className="field"
        value={data.slug}
        onChange={(e) => {
          setSlugTouched(true);
          set("slug", slugify(e.target.value));
        }}
        placeholder="how-to-define-your-icp"
      />

      <label className="label" htmlFor="excerpt">
        Excerpt (shown in cards & SEO)
      </label>
      <textarea
        id="excerpt"
        className="field min-h-[70px] resize-y"
        value={data.excerpt}
        onChange={(e) => set("excerpt", e.target.value)}
        placeholder="A short 1-2 sentence summary."
      />

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            className="field"
            value={data.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="GTM / Positioning / Analytics"
          />
        </div>
        <div>
          <label className="label" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            className="field"
            value={data.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="icp, positioning, d2c"
          />
        </div>
      </div>

      <label className="label" htmlFor="cover">
        Cover image URL (optional)
      </label>
      <input
        id="cover"
        className="field"
        value={data.coverImage}
        onChange={(e) => set("coverImage", e.target.value)}
        placeholder="/work/portfolio_glow.png or https://..."
      />

      <div className="mt-6 rounded-xl border border-line bg-cream p-5">
        <div className="sec-tag mb-3">SEO Settings</div>
        <p className="mb-4 text-sm text-muted">
          Optional fields for Google and social previews. If blank, the site uses
          the title, excerpt, and cover image.
        </p>

        <label className="label" htmlFor="seoTitle">
          SEO title (optional)
        </label>
        <input
          id="seoTitle"
          className="field"
          value={data.seoTitle}
          onChange={(e) => set("seoTitle", e.target.value)}
          placeholder="Best keyword-focused title, around 50-60 characters"
        />

        <label className="label" htmlFor="seoDescription">
          SEO description (optional)
        </label>
        <textarea
          id="seoDescription"
          className="field min-h-[76px] resize-y"
          value={data.seoDescription}
          onChange={(e) => set("seoDescription", e.target.value)}
          placeholder="Meta description, around 140-160 characters"
        />

        <label className="label" htmlFor="ogImage">
          Social preview image URL (optional)
        </label>
        <input
          id="ogImage"
          className="field"
          value={data.ogImage}
          onChange={(e) => set("ogImage", e.target.value)}
          placeholder="/blog/your-cover.png or https://..."
        />
      </div>

      <label className="label" htmlFor="content">
        Content (Markdown supported)
      </label>
      <textarea
        id="content"
        className="field min-h-[320px] resize-y font-mono text-[0.9rem]"
        value={data.content}
        onChange={(e) => set("content", e.target.value)}
        placeholder={
          "## Heading\n\nWrite your post in Markdown.\n\n- Bullet one\n- Bullet two"
        }
      />

      <div className="mt-4 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Featured
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={save} disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : isEdit ? "Update post" : "Create post"}
        </button>
        <button
          onClick={() => router.push("/admin/posts")}
          className="btn btn-ghost"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
