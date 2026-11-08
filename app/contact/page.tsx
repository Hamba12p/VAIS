import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/data/company";
export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Discuss your institutional or enterprise systems challenge with VAIS in Kampala, Uganda.",
};
export default function ContactPage() {
  return (
    <section className="studio-container contact-page">
      <div className="contact-introduction">
        <p className="eyebrow">Work with VAIS</p>
        <h1>
          What needs
          <br />
          to work
          <br />
          <span className="serif-accent">differently?</span>
        </h1>
        <p className="contact-lead">
          Bring the complexity. Tell us about the decisions, the constraints and
          the possibilities you see. We’ll start there.
        </p>
        <div className="contact-direct">
          <span className="eyebrow">Or reach us directly</span>
          <a href={`mailto:${company.email}`}>
            {company.email}
            <ArrowUpRight size={18} />
          </a>
          <a href="tel:+256704758195">+256 704 758 195</a>
          <a href="tel:+256776866921">+256 776 866 921</a>
          <p>{company.address}</p>
        </div>
      </div>
      <div className="contact-form-wrap">
        <div className="contact-form-header">
          <span className="eyebrow">Tell us about your project</span>
          <span className="eyebrow">All fields required</span>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
