import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/auth";
import { slugify } from "@/lib/utils";

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
    const tag = String(b.tag || "").trim();
    const desc = String(b.desc || "").trim();
    const image = String(b.image || "").trim();
    const href = String(b.href || "").trim();
    const cta = String(b.cta || "").trim();

    if (!title || !tag || !desc || !image || !href || !cta) {
      return NextResponse.json(
        { error: "Title, tag, description, image, link, and CTA are required." },
        { status: 400 }
      );
    }

    let slug = slugify(String(b.slug || title));
    const clash = await prisma.workItem.findFirst({
      where: { slug, NOT: { id: params.id } },
    });
    if (clash) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const item = await prisma.workItem.update({
      where: { id: params.id },
      data: {
        slug,
        title,
        tag,
        desc,
        image,
        href,
        cta,
        sortOrder: Number(b.sortOrder) || 100,
        published: Boolean(b.published),
      },
    });

    return NextResponse.json({ ok: true, slug: item.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not update work item." },
      { status: 500 }
    );
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
    await prisma.workItem.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not delete work item." },
      { status: 500 }
    );
  }
}
