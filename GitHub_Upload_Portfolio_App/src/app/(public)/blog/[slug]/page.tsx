import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { renderMarkdown, formatDate, slugify, tagList } from "@/lib/utils";
import { site } from "@/lib/site";

export const revalidate = 60;

const DEFAULT_OG = `${site.url}/og/default.png`;

type PostSeoFields = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
};

function withSeoFields<T extends object>(post: T): T & PostSeoFields {
  return post as T & PostSeoFields;
}

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

async function getRelatedPosts(category: string, currentId: string) {
  try {
    return await prisma.post.findMany({
      where: {
        published: true,
        category,
        NOT: { id: currentId },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 3,
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const rawPost = await getPost(params.slug);
  if (!rawPost) return { title: "Post not found" };
  const post = withSeoFields(rawPost);
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogImage = toAbsoluteUrl(post.ogImage || post.coverImage) || DEFAULT_OG;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
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
  const rawPost = await getPost(params.slug);
  if (!rawPost) notFound();
  const post = withSeoFields(rawPost);

  const html = renderMarkdown(post.content);
  const tags = tagList(post.tags);
  const relatedPosts = await getRelatedPosts(post.category, post.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: toAbsoluteUrl(post.ogImage || post.coverImage) || DEFAULT_OG,
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
            <Link
              href={`/blog/category/${slugify(post.category)}`}
              className="hover:underline"
            >
              {post.category}
            </Link>{" "}
            &middot; {post.readMinutes} min read &middot; {formatDate(post.createdAt)}
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

          <div className="card-base mt-10 bg-teal-soft p-7">
            <div className="sec-tag">Free Resource</div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
              Want clearer customers before your next campaign?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Download the free ICP Clarity Checklist and turn broad audience
              guesses into sharper messaging, content, and targeting.
            </p>
            <Link href="/resources/icp-checklist" className="btn btn-primary mt-5">
              Download the Free ICP Checklist
            </Link>
          </div>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2.5 border-t border-line pt-6">
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="pill hover:border-teal-deep hover:text-teal-deep"
                >
                  #{t}
                </Link>
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

      {relatedPosts.length > 0 && (
        <section className="border-t border-line bg-white py-16">
          <div className="wrap">
            <div className="mb-8 max-w-2xl">
              <div className="sec-tag">Related Reading</div>
              <h2 className="mt-3 font-serif text-3xl font-bold text-navy">
                Keep building your GTM clarity.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related, i) => (
                <BlogCard key={related.id} post={related} delay={(i % 3) * 60} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
