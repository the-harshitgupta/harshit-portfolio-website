import Reveal from "./Reveal";

export default function SectionHead({
  tag,
  title,
  subtitle,
  center = false,
  as = "h2",
}: {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="sec-tag">{tag}</div>
      <Heading className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
        {title}
      </Heading>
      {subtitle && <p className="mt-3 text-[1.02rem] text-muted">{subtitle}</p>}
    </Reveal>
  );
}
