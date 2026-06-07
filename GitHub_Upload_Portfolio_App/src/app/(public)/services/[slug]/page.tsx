import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import {
  getPublishedServiceBySlug,
  getPublishedServices,
  parseFaqs,
} from "@/lib/services";
import { renderMarkdown } from "@/lib/utils";
import { site } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getPublishedServiceBySlug(params.slug);
  if (!service) return { title: "Service not found" };

  const url = `${site.url}/services/${service.slug}`;
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.blurb,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.blurb,
      url,
      type: "website",
      images: [`${site.url}/og/default.png`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`${site.url}/og/default.png`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getPublishedServiceBySlug(params.slug);
  if (!service) notFound();

  const faqs = parseFaqs(service.faqs);
  const detailsHtml = service.details ? renderMarkdown(service.details) : "";
  const url = `${site.url}/services/${service.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription || service.blurb,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      areaServed: "Worldwide",
    },
    url,
    offers: {
      "@type": "Offer",
      priceSpecification: service.price,
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

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
        name: "Services",
        item: `${site.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="py-16">
        <div className="wrap">
          <Link
            href="/services"
            className="text-sm font-semibold text-teal-deep hover:underline"
          >
            &#8592; Back to services
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="sec-tag">Service</div>
              <h1 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted">{service.blurb}</p>
              <div className="mt-6 inline-flex rounded-full bg-teal-soft px-4 py-2 text-sm font-bold text-teal-deep">
                {service.price}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/contact?need=${encodeURIComponent(service.title)}`}
                  className="btn btn-primary"
                >
                  Request this service
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  View sample work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card-base bg-white p-7">
                <div className="grid h-12 w-12 place-items-center rounded-[13px] bg-gradient-to-br from-teal to-teal-deep text-xl text-white">
                  {service.icon}
                </div>
                <h2 className="mt-5 font-serif text-xl font-bold text-navy">
                  What you get
                </h2>
                <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-0.5 text-teal-deep">&#10003;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {detailsHtml && (
        <section className="border-y border-line bg-white py-16">
          <div className="wrap max-w-3xl">
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: detailsHtml }}
            />
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="py-16">
          <div className="wrap max-w-3xl">
            <div className="sec-tag">FAQs</div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy">
              Common questions.
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="card-base bg-white p-6">
                  <h3 className="font-semibold text-navy">{faq.question}</h3>
                  <p className="mt-2 text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
