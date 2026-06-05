import Link from "next/link";
import Image from "next/image";
import Hero3D from "@/components/Hero3D";
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
      <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
        <Hero3D />
        <div className="wrap relative z-10 grid items-center gap-10 py-16 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfeaea] bg-teal-soft px-4 py-1.5 text-[0.8rem] font-semibold text-teal-deep">
              <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_0_4px_rgba(10,143,150,.18)]" />
              GTM &middot; Brand Strategy &middot; AI Marketing
            </span>
            <h1 className="font-serif text-[clamp(2.3rem,5vw,3.7rem)] font-extrabold leading-[1.08] tracking-tight">
              Helping founders find their{" "}
              <em className="not-italic text-teal-deep">best customers</em> and the
              message that sells.
            </h1>
            <p className="mt-6 max-w-xl text-[1.08rem] text-muted">
              I help startups, D2C brands, and small businesses clarify their ICP,
              sharpen positioning, and build practical marketing systems using
              research, analytics, and AI-assisted strategy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/contact" className="btn btn-primary">
                Request a Free 3-Point Audit
              </Link>
              <Link href="/work" className="btn btn-ghost">
                View Sample Work
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-7">
              {[
                ["5+ yrs", "Business & brand strategy"],
                ["D2C / SaaS", "B2B & MSME focus"],
                ["MBA", "FIIB, Delhi"],
              ].map(([b, s]) => (
                <div key={b} className="flex flex-col">
                  <b className="font-serif text-2xl text-navy">{b}</b>
                  <small className="text-[0.82rem] text-muted">{s}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="relative w-[min(360px,80vw)] overflow-hidden rounded-[26px] border-[6px] border-white bg-[#dceeef] shadow-soft">
              <Image
                src="/harshit.png"
                alt={`${site.name}, ${site.role}`}
                width={420}
                height={520}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <Chip className="left-[-26px] top-6">&#9673; ICP Clarity</Chip>
            <Chip className="bottom-16 right-[-30px] [animation-delay:1.4s]">
              &#9650; GTM Roadmap
            </Chip>
            <Chip className="bottom-[-18px] left-8 [animation-delay:.7s]">
              &#9632; AI-assisted Research
            </Chip>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-y border-line bg-white py-24">
        <div className="wrap">
          <SectionHead
            tag="Services"
            title="Productized strategy, built to be executed."
            subtitle="Clear deliverables and practical roadmaps you can act on immediately, not a long report no one reads."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-base group block h-full p-7 transition hover:-translate-y-1.5 hover:border-[#bfe0e0] hover:shadow-soft"
                >
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-[13px] bg-gradient-to-br from-teal to-teal-deep text-xl text-white">
                    {s.icon}
                  </div>
                  <h3 className="font-serif text-[1.18rem] font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.94rem] text-muted">{s.blurb}</p>
                  <div className="mt-4 text-[0.92rem] font-bold text-navy">
                    {s.price}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-ghost">
              See all services & pricing
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="py-24">
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
      <section className="py-24">
        <div className="wrap">
          <SectionHead
            tag="Selected Work"
            title="Sample strategy projects."
            subtitle="Portfolio samples that show how I think: problem, research, strategy, and a practical deliverable."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {works.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="card-base group h-full overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft">
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-[#eef4f4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                      {w.tag}
                    </div>
                    <h3 className="mt-2 font-serif text-[1.12rem] font-semibold">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] text-muted">{w.desc}</p>
                    <a
                      href={w.href}
                      target={w.href.endsWith(".pdf") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-navy hover:text-teal-deep"
                    >
                      {w.cta} &#8594;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* PROCESS */}
      <section className="border-y border-line bg-white py-24">
        <div className="wrap">
          <SectionHead
            tag="How I Work"
            title="A clear process, not a guessing game."
            subtitle="Structured, fast, and built so you can act on the output immediately."
          />
          <div className="grid gap-5 md:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="card-base h-full p-7">
                  <div className="font-serif text-3xl font-extrabold leading-none text-[#cfe6e6]">
                    {p.num}
                  </div>
                  <h3 className="mt-2.5 font-serif text-[1.05rem] font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] text-muted">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {posts.length > 0 && (
        <section className="py-24">
          <div className="wrap">
            <SectionHead
              tag="From the Blog"
              title="Ideas on GTM, positioning & growth."
              subtitle="Practical marketing thinking for founders and operators."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-base group block h-full overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft"
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
                    <div className="p-6">
                      <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                        {post.category} &middot; {formatDate(post.createdAt)}
                      </div>
                      <h3 className="mt-2 font-serif text-[1.12rem] font-semibold">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] text-muted">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
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
