import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-()\s]{7,20}$/;
const DOWNLOAD_URL = "/resources/free-icp-clarity-checklist.html";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();

    if (body.company) {
      return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
    }
    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        need: "Free ICP Clarity Checklist",
        message:
          "Downloaded the Free ICP Clarity Checklist. Follow up with workshop or audit invitation.",
        source: "icp-checklist",
      },
    });

    return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
  } catch (err) {
    console.error("lead magnet error", err);
    return NextResponse.json(
      { error: "Could not send the checklist right now. Please try again." },
      { status: 500 }
    );
  }
}
