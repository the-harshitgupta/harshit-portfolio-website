import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import type { DisplayTestimonial } from "@/lib/testimonials";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: DisplayTestimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y border-line bg-white py-20">
      <div className="wrap">
        <SectionHead
          tag="Client Words"
          title="Trusted for clear thinking and practical execution."
          subtitle="A few words from founders and operators who needed sharper targeting, messaging, and go-to-market direction."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.id || t.name} delay={i * 60}>
              <figure className="card-base h-full bg-cream p-7">
                <div className="mb-4 text-sm font-bold tracking-[0.2em] text-teal-deep">
                  {"*".repeat(Math.max(1, Math.min(5, t.rating)))}
                </div>
                <blockquote className="text-[0.98rem] leading-7 text-ink">
                  &quot;{t.quote}&quot;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-teal-soft font-bold text-teal-deep">
                      {t.name.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-navy">{t.name}</div>
                    <div className="text-xs text-muted">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
