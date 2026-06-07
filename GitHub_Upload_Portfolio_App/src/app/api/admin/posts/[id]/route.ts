import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/auth";
import { slugify, estimateReadMinutes } from "@/lib/utils";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const clash = await prisma.post.findFirst({
      where: { slug, NOT: { id: params.id } },
    });
    if (clash) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
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
      },
    });
    return NextResponse.json({ ok: true, slug: post.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update post." }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete post." }, { status: 500 });
  }
}
