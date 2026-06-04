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
    const blurb = String(b.blurb || "").trim();
    const price = String(b.price || "").trim();

    if (!title || !blurb || !price) {
      return NextResponse.json(
        { error: "Title, description, and price are required." },
        { status: 400 }
      );
    }

    let slug = slugify(String(b.slug || title));
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const service = await prisma.service.create({
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

    return NextResponse.json({ ok: true, id: service.id, slug: service.slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create service." },
      { status: 500 }
    );
  }
}
