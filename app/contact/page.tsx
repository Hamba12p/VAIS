import type { Metadata } from "next";
import { ContactExperience } from "@/components/contact/ContactExperience";
export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Describe your business needs, try an interactive concept and discuss your project with VAIS in Kampala, Uganda.",
};
export default function ContactPage() {
  return <ContactExperience />;
}
