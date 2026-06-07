"use client";

import Link from "next/link";
import { useState } from "react";

const DOWNLOAD_URL = "/resources/free-icp-clarity-checklist.html";

export default function LeadMagnetForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong");
      }
      setStatus("ok");
      (
        window as typeof window & {
          gtag?: (command: string, eventName: string, params?: object) => void;
        }
      ).gtag?.("event", "checklist_download", {
        event_category: "Lead magnet",
        event_label: "ICP checklist",
      });
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="card-base bg-white p-7" role="status" aria-live="polite">
        <div className="sec-tag">Checklist ready</div>
        <h3 className="mt-2 font-serif text-2xl font-bold text-navy">
          Your ICP checklist is ready.
        </h3>
        <p className="mt-3 text-sm text-muted">
          Open it now, print it, or save it as PDF from your browser.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open Checklist
          </a>
          <Link href="/workshop" className="btn btn-ghost">
            See Workshop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-base bg-white p-7">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {!compact && (
        <>
          <div className="sec-tag">Free download</div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-navy">
            Get the Free ICP Clarity Checklist
          </h3>
          <p className="mt-2 text-sm text-muted">
            Use it to define your best customer, clarify your message, and plan
            your next 7 days of marketing.
          </p>
        </>
      )}

      <label className="label" htmlFor="lead-name">
        Name
      </label>
      <input
        id="lead-name"
        name="name"
        className="field"
        placeholder="Your name"
        required
      />

      <label className="label" htmlFor="lead-email">
        Email
      </label>
      <input
        id="lead-email"
        name="email"
        type="email"
        className="field"
        placeholder="you@email.com"
        required
      />

      <label className="label" htmlFor="lead-phone">
        Phone / WhatsApp
      </label>
      <input
        id="lead-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        className="field"
        placeholder="+91 98765 43210"
        required
      />

      {status === "error" && (
        <p
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary mt-5 w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Download Free Checklist"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        No spam. You can use this checklist immediately.
      </p>
    </form>
  );
}
