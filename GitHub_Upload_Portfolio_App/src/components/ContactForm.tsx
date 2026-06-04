"use client";

import { useState } from "react";
import { needOptions } from "@/lib/site";

export default function ContactForm({
  defaultNeed = "",
}: {
  defaultNeed?: string;
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="card-base bg-white p-8 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-2xl text-teal-deep">
          &#10003;
        </div>
        <h3 className="font-serif text-xl font-bold text-navy">
          Request received.
        </h3>
        <p className="mt-2 text-muted">
          Thanks - I&apos;ll review your details and reply within 1 business day.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-5">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-base bg-white p-7">
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="field"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            placeholder="you@email.com"
            required
          />
        </div>
      </div>

      <label className="label" htmlFor="business">
        Business / Website
      </label>
      <input
        id="business"
        name="business"
        className="field"
        placeholder="Brand name or link"
      />

      <label className="label" htmlFor="need">
        What do you need help with?
      </label>
      <select
        id="need"
        name="need"
        className="field"
        defaultValue={defaultNeed || needOptions[0]}
      >
        {needOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <label className="label" htmlFor="message">
        A few details
      </label>
      <textarea
        id="message"
        name="message"
        className="field min-h-[110px] resize-y"
        placeholder="What are you trying to improve right now?"
      />

      {status === "error" && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary mt-5 w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        I usually reply within 1 business day.
      </p>
    </form>
  );
}
