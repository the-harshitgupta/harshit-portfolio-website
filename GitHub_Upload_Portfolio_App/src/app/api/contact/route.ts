import { NextResponse } from "next/server";
import { notifyLeadSubmitted } from "@/lib/lead-notifications";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-()\s]{7,20}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const business = String(body.business || "").trim();
    const need = String(body.need || "").trim();
    const message = String(body.message || "").trim();

    // honeypot (optional field named "company" left empty by humans)
    if (body.company) {
      return NextResponse.json({ ok: true });
    }
    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    // Phone is optional: an email address is enough to deliver a free audit,
    // and requiring a number measurably suppresses submissions.
    if (phone && !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        business: business || null,
        need: need || null,
        message: message || null,
        source: "website",
      },
    });
    await notifyLeadSubmitted({
      name,
      email,
      phone: phone || null,
      business: business || null,
      need: need || null,
      message: message || null,
      source: "website",
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
