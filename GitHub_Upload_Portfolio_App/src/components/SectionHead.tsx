import Reveal from "./Reveal";

export default function SectionHead({
  tag,
  title,
  subtitle,
  center = false,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="sec-tag">{tag}</div>
      <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[1.02rem] text-muted">{subtitle}</p>}
    </Reveal>
  );
}
