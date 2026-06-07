import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { renderMarkdown, formatDate, tagList } from "@/lib/utils";
import { site } from "@/lib/site";

export const revalidate = 60;

const DEFAULT_OG = `${site.url}/og/default.png`;

// Cover images may be stored as a relative path ("/blog/x.png") or a full URL
// ("https://..."). Only prepend the site URL when it is relative.
function toAbsoluteUrl(src?: string | null) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : `${site.url}${src}`;
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getPost(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  const ogImage = toAbsoluteUrl(post.coverImage) || DEFAULT_OG;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      images: [ogImage],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const tags = tagList(post.tags);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: toAbsoluteUrl(post.coverImage) || DEFAULT_OG,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="py-16">
        <div className="wrap max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-semibold text-teal-deep hover:underline"
          >
            &#8592; Back to blog
          </Link>

          <div className="mt-6 text-[0.78rem] font-bold uppercase tracking-wide text-teal-deep">
            {post.category} &middot; {post.readMinutes} min read &middot;{" "}
            {formatDate(post.createdAt)}
          </div>
          <h1 className="mt-3 font-serif text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>

          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-xl2 border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="w-full" />
            </div>
          )}

          <div
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2.5 border-t border-line pt-6">
              {tags.map((t) => (
                <span key={t} className="pill">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="card-base mt-12 bg-white p-7 text-center">
            <h3 className="font-serif text-xl font-bold text-navy">
              Want this applied to your business?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Get a free 3-point audit and a clear next step for your marketing.
            </p>
            <Link href="/contact" className="btn btn-primary mt-5">
              Get My Free 3-Point Audit
            </Link>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
