import { site } from "@/lib/site";

type LeadNotification = {
  name: string;
  email: string;
  phone?: string | null;
  business?: string | null;
  need?: string | null;
  message?: string | null;
  source: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string | null) {
  const safeValue = value ? escapeHtml(value) : "-";
  return `
    <tr>
      <td style="padding:8px 12px;color:#64748b;font-weight:700;width:130px;">${label}</td>
      <td style="padding:8px 12px;color:#0b1b33;">${safeValue}</td>
    </tr>
  `;
}

function buildHtml(lead: LeadNotification) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="background:#0b1b33;color:#ffffff;padding:22px 24px;">
          <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#7dd3d8;font-weight:800;">New website lead</div>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;">${escapeHtml(lead.name)} submitted a form</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${row("Source", lead.source)}
          ${row("Name", lead.name)}
          ${row("Email", lead.email)}
          ${row("Phone", lead.phone)}
          ${row("Business", lead.business)}
          ${row("Need", lead.need)}
          ${row("Message", lead.message)}
        </table>
        <div style="padding:18px 24px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
          Reply quickly while the lead is warm. This notification was sent from ${escapeHtml(site.url)}.
        </div>
      </div>
    </div>
  `;
}

export async function notifyLeadSubmitted(lead: LeadNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_TO || site.email;
  const from =
    process.env.LEAD_ALERT_FROM || "Harshit Gupta Website <onboarding@resend.dev>";

  if (!apiKey) {
    return;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `New website lead: ${lead.name} (${lead.source})`,
        html: buildHtml(lead),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("resend lead notification error", response.status, text);
    }
  } catch (err) {
    console.error("resend lead notification error", err);
  }
}
