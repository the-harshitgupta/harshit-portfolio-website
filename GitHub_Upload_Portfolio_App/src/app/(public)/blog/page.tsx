import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - GTM, Positioning & Growth",
  description:
    "Practical articles on go-to-market strategy, ICP research, brand positioning, marketing analytics, and AI for marketing.",
};

async function getData(category?: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(category && category !== "All" ? { category } : {}),
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
  searchParams: { category?: string };
}) {
  const active = searchParams.category || "All";
  const { posts, categories } = await getData(active);

  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <SectionHead
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
                    c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`
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
                Request a Free Audit
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-base group flex h-full flex-col overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft"
                  >
                    {post.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden border-b border-line bg-[#eef4f4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                        {post.category} &middot; {post.readMinutes} min
                      </div>
                      <h2 className="mt-2 font-serif text-[1.15rem] font-semibold">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-[0.9rem] text-muted">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 text-xs text-muted">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
