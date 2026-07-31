import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="py-14 md:py-24">
      <div className="wrap">
        <Reveal className="overflow-hidden rounded-[28px] bg-gradient-to-br from-navy to-navy-soft px-6 py-12 text-center text-white shadow-soft md:px-16 md:py-16">
          <div className="sec-tag !text-gold">Let&apos;s Talk</div>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-bold">
            Not sure what your marketing is missing? Find out for free.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] text-[#c7d2ea] md:text-base">
            Request a free 3-point audit: one positioning gap, one funnel issue,
            and one growth opportunity, specific to your business.
          </p>
          {/* One dominant action plus one low-commitment fallback. A third
              option here was splitting intent rather than adding choice. */}
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:mt-8">
            <Link
              href="/contact"
              className="btn bg-white text-navy hover:-translate-y-0.5"
            >
              Get My Free 3-Point Audit
            </Link>
            <Link
              href="/resources/icp-checklist"
              className="btn border-[1.5px] border-white/40 text-white hover:bg-white/10"
            >
              Free ICP Checklist
            </Link>
          </div>
          <p className="mt-5 text-[0.82rem] text-[#9fb0cf]">
            Usually replies within 24 hours &middot; No pitch on the first call
          </p>
        </Reveal>
      </div>
    </section>
  );
}
