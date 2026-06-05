import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/auth";

function clampRating(value: unknown) {
  const n = Number(value) || 5;
  return Math.max(1, Math.min(5, Math.round(n)));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const b = await req.json();
    const name = String(b.name || "").trim();
    const quote = String(b.quote || "").trim();

    if (!name || !quote) {
      return NextResponse.json(
        { error: "Name and quote are required." },
        { status: 400 }
      );
    }

    await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name,
        quote,
        role: String(b.role || "").trim() || null,
        company: String(b.company || "").trim() || null,
        image: String(b.image || "").trim() || null,
        rating: clampRating(b.rating),
        sortOrder: Number(b.sortOrder) || 100,
        published: Boolean(b.published),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not update testimonial." },
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
    await prisma.testimonial.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not delete testimonial." },
      { status: 500 }
    );
  }
}
