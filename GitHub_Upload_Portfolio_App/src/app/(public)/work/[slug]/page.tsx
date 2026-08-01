import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { getPublishedWork, getPublishedWorkBySlug } from "@/lib/work";

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await getPublishedWork();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const work = await getPublishedWorkBySlug(params.slug);
  if (!work) return { title: "Work not found" };
  const url = `${site.url}/work/${work.slug}`;
  return {
    title: `${work.title} Case Study`,
    description: work.desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${work.title} Case Study | ${site.name}`,
      description: work.desc,
      url,
      type: "article",
      images: [work.image.startsWith("http") ? work.image : `${site.url}${work.image}`],
    },
    twitter: {
      card: "summary_large_image",
      images: [work.image.startsWith("http") ? work.image : `${site.url}${work.image}`],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = await getPublishedWorkBySlug(params.slug);
  if (!work) notFound();

  const imageUrl = work.image.startsWith("http") ? work.image : `${site.url}${work.image}`;
  const url = `${site.url}/work/${work.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.desc,
    image: imageUrl,
    url,
    creator: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    about: work.tag,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-16">
        <div className="wrap">
          <Link
            href="/work"
            className="text-sm font-semibold text-teal-deep hover:underline"
          >
            &#8592; Back to work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div className="sec-tag">{work.tag}</div>
              <h1 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-tight tracking-tight">
                {work.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted">{work.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={work.href}
                  target={work.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {work.cta}
                </a>
                <Link href="/contact" className="btn btn-ghost">
                  Get My Free 3-Point Audit
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[26px] border border-line bg-white shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <section className="border-y border-line bg-white py-16">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {[
            ["Problem", "The business needed clearer customer focus, positioning, and practical next steps."],
            ["Approach", "The work combined audience research, competitor analysis, messaging, and GTM planning."],
            ["Output", "A practical strategy deliverable designed to guide targeting, content, and campaign decisions."],
          ].map(([title, body]) => (
            <div key={title} className="card-base p-6">
              <h2 className="font-serif text-xl font-bold text-navy">{title}</h2>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
