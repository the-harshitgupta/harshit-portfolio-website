import { NextResponse } from "next/server";
import { notifyLeadSubmitted } from "@/lib/lead-notifications";
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
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    // Name and phone are optional: the fewer fields a free download asks for,
    // the more of them get completed. Both are enriched later on the call.
    if (phone && !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    const leadName = name.length >= 2 ? name : "Checklist subscriber";

    await prisma.lead.create({
      data: {
        name: leadName,
        email,
        phone: phone || null,
        need: "Free ICP Clarity Checklist",
        message:
          "Downloaded the Free ICP Clarity Checklist. Follow up with workshop or audit invitation.",
        source: "icp-checklist",
      },
    });
    await notifyLeadSubmitted({
      name: leadName,
      email,
      phone: phone || null,
      need: "Free ICP Clarity Checklist",
      message:
        "Downloaded the Free ICP Clarity Checklist. Follow up with workshop or audit invitation.",
      source: "icp-checklist",
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
