import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const business = String(body.business || "").trim();
    const need = String(body.need || "").trim();
    const message = String(body.message || "").trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    // honeypot (optional field named "company" left empty by humans)
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    await prisma.lead.create({
      data: {
        name,
        email,
        business: business || null,
        need: need || null,
        message: message || null,
        source: "website",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json(
      { error: "Could not submit right now. Please email directly." },
      { status: 500 }
    );
  }
}
