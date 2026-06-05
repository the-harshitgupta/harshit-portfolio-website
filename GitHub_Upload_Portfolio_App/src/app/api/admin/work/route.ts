import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function POST(req: Request) {
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
    const existing = await prisma.workItem.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const item = await prisma.workItem.create({
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

    return NextResponse.json({ ok: true, id: item.id, slug: item.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create work item." },
      { status: 500 }
    );
  }
}
