import Image from "next/image";

/**
 * Image sources for work and blog cards come from the database, so an editor
 * can paste a remote URL at any time. next/image throws a hard error on
 * unconfigured hostnames, which would take the whole page down. Local paths get
 * the full optimizer; anything remote falls back to a lazy <img>.
 */
export default function SafeImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  const isLocal = src.startsWith("/");

  if (!isLocal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image src={src} alt={alt} fill sizes={sizes} className={className} />
  );
}
