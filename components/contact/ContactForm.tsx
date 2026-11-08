"use client";

import { useMemo, useState } from "react";
import { company } from "@/data/company";

const fieldClass = "enquiry-field";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [status, setStatus] = useState("");
  const [submittedAt, setSubmittedAt] = useState(0);

  const typeOptions = useMemo(
    () => ["Government", "Institutional", "Enterprise", "Press"],
    [],
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const now = Date.now();
    const honeypot = form.get("website");
    const timeDelta = now - submittedAt;

    if (honeypot) {
      setStatus("Submission rejected.");
      setState("error");
      return;
    }

    if (timeDelta < 5000) {
      setStatus("Please wait a moment before sending.");
      setState("error");
      return;
    }

    setState("sending");
    setStatus("Sending your enquiry…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setState("sent");
      setSubmittedAt(now);
      setStatus("Message queued. VAIS will respond soon.");
    } catch (error) {
      setState("error");
      setStatus(
        error instanceof Error
          ? error.message
          : "The message did not send. Please retry or email us directly.",
      );
    }
  }

  if (state === "sent") {
    return (
      <div className="topographic-surface border border-rule p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-green">
          Signal received
        </p>
        <p className="mt-4 font-display text-4xl text-ink">
          Thank you. We&apos;ll be in touch.
        </p>
        <p className="mt-3 text-base text-ink/75">
          Direct line: {company.phonePrimary}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="grid gap-7">
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            minLength={2}
            required
            className={fieldClass}
          />
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          Email address
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@organisation.com"
            required
            className={fieldClass}
          />
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          Enquiry type
          <select
            name="type"
            defaultValue="Government"
            className={`${fieldClass} appearance-none`}
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="hidden">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          What should the system do?
          <textarea
            name="message"
            placeholder="The challenge, the context, and what better could look like..."
            minLength={21}
            required
            rows={4}
            className={fieldClass}
          />
        </label>

        <button
          disabled={state === "sending"}
          className="studio-button dark-button justify-self-start disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className="min-h-[1.5rem] text-sm text-ink/75"
        >
          {status}
        </p>
      </div>
    </form>
  );
}
