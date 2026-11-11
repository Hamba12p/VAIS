"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ConceptStudio } from "./ConceptStudio";
import { ContactForm } from "./ContactForm";
import { company } from "@/data/company";

export function ContactExperience() {
  const [draft, setDraft] = useState<
    { message: string; revision: number } | undefined
  >();
  const useBrief = (message: string) => {
    setDraft((current) => ({
      message,
      revision: (current?.revision ?? 0) + 1,
    }));
    requestAnimationFrame(() => {
      document
        .getElementById("send-enquiry")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      document
        .getElementById("enquiry-message")
        ?.focus({ preventScroll: true });
    });
  };
  return (
    <>
      <section className="contact-opening studio-container">
        <div>
          <p className="eyebrow">Work with VAIS</p>
          <h1>
            What needs to work
            <br />
            <span className="serif-accent">differently?</span>
          </h1>
        </div>
        <div>
          <p>
            Start with the challenge. Explore a small working concept, or tell
            us directly what you have in mind.
          </p>
          <a href="#send-enquiry" className="text-link">
            Go straight to an enquiry <ArrowDown size={17} />
          </a>
        </div>
      </section>
      <ConceptStudio onUseBrief={useBrief} />
      <section className="studio-container contact-page" id="send-enquiry">
        <div className="contact-introduction">
          <p className="eyebrow">Let’s take it further</p>
          <h2 className="contact-enquiry-title">
            From a first idea
            <br />
            <span className="serif-accent">to a useful conversation.</span>
          </h2>
          <p className="contact-lead">
            Tell us about the people, the constraints and the outcome you’re
            working towards. Your concept is a starting point for the
            discussion.
          </p>
          <div className="contact-direct">
            <span className="eyebrow">Or reach us directly</span>
            <a href={`mailto:${company.email}`}>
              {company.email}
              <ArrowUpRight size={18} />
            </a>
            <a href="tel:+256704758195">+256 704 758 195</a>
            <p>{company.address}</p>
          </div>
        </div>
        <div className="contact-form-wrap">
          <div className="contact-form-header">
            <span className="eyebrow">Tell us about your project</span>
            <span className="eyebrow">All fields required</span>
          </div>
          <ContactForm draft={draft} />
        </div>
      </section>
    </>
  );
}
