import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LazyHero3D from "@/components/LazyHero3D";
import SafeImage from "@/components/SafeImage";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { processSteps, site } from "@/lib/site";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { getPublishedServices } from "@/lib/services";
import { getPublishedWork } from "@/lib/work";
import { getPublishedTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: {
    absolute: "Marketing & Growth Strategist for Founders | Harshit Gupta",
  },
  description:
    "I help founders, startups, and D2C brands get more of the right customers - with clear go-to-market strategy, positioning, content, and marketing analytics.",
  alternates: { canonical: site.url },
};

export const revalidate = 60;

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [posts, services, works, testimonials] = await Promise.all([
    getLatestPosts(),
    getPublishedServices(),
    getPublishedWork(),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex items-center overflow-hidden md:min-h-[calc(100vh-72px)]">
        <LazyHero3D />
        <div className="wrap relative z-10 grid items-center gap-8 py-10 md:gap-10 md:py-16 md:grid-cols-[1.15fr_0.85fr]">
          {/* Message before face: the headline has to land inside 5 seconds,
              so on mobile the photo sits below the copy as a credibility block. */}
          <div className="relative order-last mx-auto">
            <div className="relative w-[min(240px,62vw)] overflow-hidden rounded-[26px] border-[6px] border-white bg-[#dceeef] shadow-soft md:w-[min(360px,80vw)]">
              <Image
                src="/harshit.png"
                alt={`${site.name}, ${site.role}`}
                width={420}
                height={520}
                priority
                sizes="(max-width: 768px) 240px, 360px"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Chips overflow the viewport on small screens */}
            <Chip className="left-[-26px] top-6 hidden md:flex">
              &#9673; ICP Clarity
            </Chip>
            <Chip className="bottom-16 right-[-30px] hidden [animation-delay:1.4s] md:flex">
              &#9650; GTM Roadmap
            </Chip>
            <Chip className="bottom-[-18px] left-8 hidden [animation-delay:.7s] md:flex">
              &#9632; AI-assisted Research
            </Chip>
          </div>

          <div className="order-first">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfeaea] bg-teal-soft px-4 py-1.5 text-[0.8rem] font-semibold text-teal-deep md:mb-5">
              <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_0_4px_rgba(10,143,150,.18)]" />
              GTM &middot; Brand Strategy &middot; AI Marketing
            </span>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.7rem)] font-extrabold leading-[1.1] tracking-tight">
              Helping founders find their{" "}
              <em className="not-italic text-teal-deep">best customers</em> and the
              message that sells.
            </h1>
            <p className="mt-4 max-w-xl text-[1rem] text-muted md:mt-6 md:text-[1.08rem]">
              I help startups and D2C brands work out who their best customer is,
              sharpen the message, and build a marketing plan they can actually
              run.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-3.5">
              <Link href="/contact" className="btn btn-primary">
                Get My Free 3-Point Audit
              </Link>
              <Link href="/work" className="btn btn-ghost">
                View Sample Work
              </Link>
            </div>

            {/* Zero-friction alternative for visitors not ready to book */}
            <div className="mt-6 max-w-md rounded-[16px] border border-line bg-white/80 p-4 backdrop-blur-sm md:mt-8">
              <p className="mb-2.5 text-[0.88rem] font-semibold text-navy">
                Not ready to talk? Start with the free ICP Clarity Checklist.
              </p>
              <LeadMagnetForm inline />
            </div>

            <div className="mt-7 hidden flex-wrap gap-7 sm:flex md:mt-9">
              {[
                ["5+ yrs", "Business & brand strategy"],
                ["D2C / SaaS", "B2B & MSME focus"],
                ["MBA", "FIIB, Delhi"],
              ].map(([b, s]) => (
                <div key={b} className="flex flex-col">
                  <b className="font-serif text-xl text-navy md:text-2xl">{b}</b>
                  <small className="text-[0.82rem] text-muted">{s}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-y border-line bg-white py-14 md:py-24">
        <div className="wrap">
          <SectionHead
            tag="Services"
            title="Productized strategy, built to be executed."
            subtitle="Clear deliverables and practical roadmaps you can act on immediately, not a long report no one reads."
          />
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {services.slice(0, 6).map((s, i) => (
              // Mobile shows the top 3; the rest live on /services
              <div key={s.title} className={i >= 3 ? "hidden md:block" : ""}>
                <Reveal delay={i * 60}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="card-base group block h-full p-5 transition hover:-translate-y-1.5 hover:border-[#bfe0e0] hover:shadow-soft md:p-7"
                  >
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-[13px] bg-gradient-to-br from-teal to-teal-deep text-lg text-white md:mb-4 md:h-12 md:w-12 md:text-xl">
                      {s.icon}
                    </div>
                    <h3 className="font-serif text-[1.1rem] font-semibold md:text-[1.18rem]">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.9rem] text-muted md:line-clamp-none md:text-[0.94rem]">
                      {s.blurb}
                    </p>
                    <div className="mt-3 text-[0.92rem] font-bold text-navy md:mt-4">
                      {s.price}
                    </div>
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:mt-10">
            <Link href="/services" className="btn btn-ghost">
              See all services &amp; pricing
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET - hidden on mobile: the hero already carries this offer */}
      <section className="hidden py-14 md:block md:py-24">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="sec-tag">Free Resource</div>
            <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
              Download the Free ICP Clarity Checklist.
            </h2>
            <p className="mt-4 text-muted">
              If you are not sure who your best customer is, start here. This
              checklist helps you define your ICP, find real customer language,
              and write a simple positioning statement in 7 days.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              <li>1. Identify your best-fit customer segment.</li>
              <li>2. Find pains, triggers, objections, and buying language.</li>
              <li>3. Turn your research into clearer content and messaging.</li>
            </ul>
            <Link href="/resources/icp-checklist" className="btn btn-ghost mt-7">
              Learn what is inside
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <LeadMagnetForm compact />
          </Reveal>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="py-14 md:py-24">
        <div className="wrap">
          <SectionHead
            tag="Selected Work"
            title="Sample strategy projects."
            subtitle="Portfolio samples that show how I think: problem, research, strategy, and a practical deliverable."
          />
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {works.map((w, i) => (
              // Mobile shows 2 samples; the third is one tap away on /work
              <div key={w.title} className={i >= 2 ? "hidden md:block" : ""}>
                <Reveal delay={i * 60}>
                  <div className="card-base group h-full overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#eef4f4]">
                      <SafeImage
                        src={w.image}
                        alt={w.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                        {w.tag}
                      </div>
                      <h3 className="mt-2 font-serif text-[1.08rem] font-semibold md:text-[1.12rem]">
                        {w.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] text-muted">{w.desc}</p>
                      <Link
                        href={`/work/${w.slug}`}
                        className="mt-3.5 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-navy hover:text-teal-deep"
                      >
                        View sample &#8594;
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/work" className="btn btn-ghost">
              See all sample work
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* PROCESS */}
      <section className="border-y border-line bg-white py-14 md:py-24">
        <div className="wrap">
          <SectionHead
            tag="How I Work"
            title="A clear process, not a guessing game."
            subtitle="Structured, fast, and built so you can act on the output immediately."
          />
          {/* 2-up on mobile keeps all four steps visible without a long scroll */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {processSteps.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="card-base h-full p-4 md:p-7">
                  <div className="font-serif text-2xl font-extrabold leading-none text-[#cfe6e6] md:text-3xl">
                    {p.num}
                  </div>
                  <h3 className="mt-2 font-serif text-[1rem] font-semibold md:mt-2.5 md:text-[1.05rem]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.84rem] text-muted md:mt-2 md:text-[0.9rem]">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {posts.length > 0 && (
        <section className="py-14 md:py-24">
          <div className="wrap">
            <SectionHead
              tag="From the Blog"
              title="Ideas on GTM, positioning & growth."
              subtitle="Practical marketing thinking for founders and operators."
            />
            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {posts.map((post, i) => (
                // Mobile shows 2 posts; "Read the blog" covers the rest
                <div key={post.id} className={i >= 2 ? "hidden md:block" : ""}>
                  <Reveal delay={i * 60}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="card-base group block h-full overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft"
                    >
                      {post.coverImage && (
                        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-[#eef4f4]">
                          <SafeImage
                            src={post.coverImage}
                            alt={post.title}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5 md:p-6">
                        <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                          {post.category} &middot; {formatDate(post.createdAt)}
                        </div>
                        <h3 className="mt-2 font-serif text-[1.08rem] font-semibold md:text-[1.12rem]">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-[0.9rem] text-muted md:line-clamp-none">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center md:mt-10">
              <Link href="/blog" className="btn btn-ghost">
                Read the blog
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute flex animate-floaty items-center gap-2 rounded-[14px] border border-line bg-white px-3.5 py-2.5 text-[0.82rem] font-semibold shadow-sm2 ${className}`}
    >
      {children}
    </div>
  );
}
