import Link from "next/link";
import Reveal from "@/components/Reveal";
import { formatDate } from "@/lib/utils";

export type BlogCardPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  readMinutes: number;
  createdAt: Date;
};

export default function BlogCard({
  post,
  delay = 0,
}: {
  post: BlogCardPost;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/blog/${post.slug}`}
        className="card-base group flex h-full flex-col overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft"
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
        <div className="flex flex-1 flex-col p-6">
          <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
            {post.category} &middot; {post.readMinutes} min
          </div>
          <h2 className="mt-2 font-serif text-[1.15rem] font-semibold">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-[0.9rem] text-muted">{post.excerpt}</p>
          <span className="mt-4 text-xs text-muted">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
