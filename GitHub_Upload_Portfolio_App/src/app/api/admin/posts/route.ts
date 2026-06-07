import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/auth";
import { slugify, estimateReadMinutes } from "@/lib/utils";

export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const b = await req.json();
    const title = String(b.title || "").trim();
    const content = String(b.content || "").trim();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }
    let slug = slugify(String(b.slug || title));
    // ensure unique slug
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const data = {
        title,
        slug,
        excerpt: String(b.excerpt || "").trim() || content.slice(0, 150),
        content,
        coverImage: String(b.coverImage || "").trim() || null,
        seoTitle: String(b.seoTitle || "").trim() || null,
        seoDescription: String(b.seoDescription || "").trim() || null,
        ogImage: String(b.ogImage || "").trim() || null,
        category: String(b.category || "Marketing").trim(),
        tags: String(b.tags || "").trim(),
        published: Boolean(b.published),
        featured: Boolean(b.featured),
        readMinutes: estimateReadMinutes(content),
      };

    const post = await prisma.post.create({
      data: data as any,
    });
    return NextResponse.json({ ok: true, id: post.id, slug: post.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create post." }, { status: 500 });
  }
}
