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
    const blurb = String(b.blurb || "").trim();
    const price = String(b.price || "").trim();

    if (!title || !blurb || !price) {
      return NextResponse.json(
        { error: "Title, description, and price are required." },
        { status: 400 }
      );
    }

    let slug = slugify(String(b.slug || title));
    const clash = await prisma.service.findFirst({
      where: { slug, NOT: { id: params.id } },
    });
    if (clash) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        icon: String(b.icon || "*").trim().slice(0, 8) || "*",
        blurb,
        price,
        bullets: String(b.bullets || "").trim(),
        sortOrder: Number(b.sortOrder) || 100,
        published: Boolean(b.published),
      },
    });

    return NextResponse.json({ ok: true, slug: service.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not update service." },
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
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not delete service." },
      { status: 500 }
    );
  }
}
