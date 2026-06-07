import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { site } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - GTM, Positioning & Growth",
  description:
    "Practical articles on go-to-market strategy, ICP research, brand positioning, marketing analytics, and AI for marketing.",
  alternates: { canonical: `${site.url}/blog` },
};

async function getData(category?: string, tag?: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(category && category !== "All" ? { category } : {}),
        ...(tag ? { tags: { contains: tag, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    const all = await prisma.post.findMany({
      where: { published: true },
      select: { category: true },
    });
    const categories = Array.from(new Set(all.map((p) => p.category))).sort();
    return { posts, categories };
  } catch {
    return { posts: [], categories: [] as string[] };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const active = searchParams.category || "All";
  const activeTag = searchParams.tag || "";
  const { posts, categories } = await getData(active, activeTag);

  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <SectionHead
            as="h1"
            tag="Blog"
            title="Ideas on GTM, positioning & growth."
            subtitle="Practical marketing thinking for founders, operators, and D2C teams - no fluff."
          />

          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2.5">
              {["All", ...categories].map((c) => (
                <Link
                  key={c}
                  href={
                    c === "All" ? "/blog" : `/blog/category/${slugify(c)}`
                  }
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active === c
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-white text-muted hover:border-teal-deep hover:text-teal-deep"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          )}

          {activeTag && (
            <div className="mb-8 rounded-xl border border-line bg-white p-4 text-sm text-muted">
              Showing posts tagged{" "}
              <span className="font-bold text-navy">#{activeTag}</span>.{" "}
              <Link href="/blog" className="font-semibold text-teal-deep hover:underline">
                Clear filter
              </Link>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="card-base bg-white p-12 text-center">
              <h3 className="font-serif text-xl font-bold text-navy">
                No posts yet.
              </h3>
              <p className="mx-auto mt-2 max-w-md text-muted">
                New articles are on the way. In the meantime, request a free audit
                and let&apos;s talk about your marketing.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">
                Get My Free 3-Point Audit
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} delay={(i % 3) * 60} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
