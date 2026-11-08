import type { Metadata } from "next";
import { ProjectInstrument } from "@/components/work/ProjectInstrument";
export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore the VAIS portfolio through an interactive field of civic, institutional and enterprise intelligence systems.",
};
export default function WorkPage() {
  return <ProjectInstrument />;
}
