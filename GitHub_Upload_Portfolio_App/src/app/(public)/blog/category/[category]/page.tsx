import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import SectionHead from "@/components/SectionHead";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { slugify } from "@/lib/utils";

export const revalidate = 60;

async function getCategory(categorySlug: string) {
  try {
    const categories = await prisma.post.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
    });
    return categories
      .map((p) => p.category)
      .find((category) => slugify(category) === categorySlug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const categories = await prisma.post.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
    });
    return categories.map((p) => ({ category: slugify(p.category) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = await getCategory(params.category);
  if (!category) return { title: "Blog category not found" };
  const url = `${site.url}/blog/category/${params.category}`;
  return {
    title: `${category} Articles`,
    description: `Read practical ${category.toLowerCase()} articles by Harshit Gupta for GTM strategy, positioning, ICP research, and growth.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${category} Articles | ${site.name}`,
      description: `Read practical ${category.toLowerCase()} articles by Harshit Gupta.`,
      url,
      type: "website",
      images: [`${site.url}/og/default.png`],
    },
    twitter: { card: "summary_large_image", images: [`${site.url}/og/default.png`] },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = await getCategory(params.category);
  if (!category) notFound();

  const posts = await prisma.post.findMany({
    where: { published: true, category },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <Link
            href="/blog"
            className="mb-8 inline-flex text-sm font-semibold text-teal-deep hover:underline"
          >
            &#8592; Back to all blog posts
          </Link>
          <SectionHead
            as="h1"
            tag="Blog Category"
            title={`${category} articles.`}
            subtitle="Browse focused articles by topic so visitors and search engines can understand your expertise clearly."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} delay={(i % 3) * 60} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
