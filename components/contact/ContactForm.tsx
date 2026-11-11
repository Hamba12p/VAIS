"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { company } from "@/data/company";

const fieldClass = "enquiry-field";

export function ContactForm({
  draft,
}: {
  draft?: { message: string; revision: number };
}) {
  const [message, setMessage] = useState("");
  const appliedBrief = useRef("");
  useEffect(() => {
    if (!draft) return;
    const previous = appliedBrief.current;
    setMessage((current) =>
      previous && current.includes(previous)
        ? current.replace(previous, draft.message)
        : current.trim()
          ? `${current}\n\n${draft.message}`
          : draft.message,
    );
    appliedBrief.current = draft.message;
    setState(current => current === "sent" ? "idle" : current);
  }, [draft]);
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
        throw new Error(data?.error === "Contact endpoint is not configured."
          ? `We couldn't send your enquiry. Please email ${company.email} directly.`
          : data?.error || "The enquiry could not be sent. Please try again or email us directly.");
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
            maxLength={120}
            required
            className={fieldClass}
          />
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          Email address
          <input
            type="email"
            maxLength={254}
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
            defaultValue="Enterprise"
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
            id="enquiry-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="The challenge, the context, and what better could look like..."
            minLength={21}
            maxLength={5000}
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
          {state === "sending" ? (
            <LoaderCircle
              size={17}
              className="button-loading"
              aria-hidden="true"
            />
          ) : (
            <ArrowUpRight size={17} aria-hidden="true" />
          )}
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
