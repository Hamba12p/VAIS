import type { Project } from "@/types/project";

const edited: Record<
  string,
  { src: string; alt: string; caption: string; position?: string }
> = {
  "apex-nexus": {
    src: "/images/design/apex-parliament.webp",
    alt: "An AI-adapted editorial image of Parliament of Uganda, based on the APEX repository photograph",
    caption: "Parliament of Uganda · Adapted repository image",
    position: "center 45%",
  },
  ugems: {
    src: "/images/design/ugems-school.webp",
    alt: "An architectural miniature of a school in layered green terrain",
    caption: "Education infrastructure · Concept illustration",
  },
  sentect: {
    src: "/images/design/sentect-tower.webp",
    alt: "A sculptural telecommunications mast surrounded by fine copper signal arcs",
    caption: "Network intelligence · Concept illustration",
  },
  yeracle: {
    src: "/images/design/sentect-tower.webp",
    alt: "A conceptual telecommunications model on sculpted terrain",
    caption: "Network architecture · Concept illustration",
    position: "65% center",
  },
};
const sectors: Record<string, string> = {
  "civic-government": "office",
  "security-intelligence": "sentect-tower",
  health: "clinic",
  agriculture: "field",
  "education-institutions": "ugems-school",
  "fintech-payments": "bank",
  "automotive-iot": "sentect-tower",
  "supply-chain": "office",
  platform: "sentect-tower",
};

export function projectVisual(project: Project) {
  return (
    edited[project.slug] ?? {
      src: `/images/design/${project.slug === "ugadon" ? "bank" : (sectors[project.category[0]] ?? "office")}.webp`,
      alt: `Concept illustration for ${project.name}`,
      caption: "System architecture · Concept illustration",
      position: "center",
    }
  );
}

export const featuredStories = [
  {
    slug: "apex-nexus",
    headline: "A clearer view from the centre.",
    copy: "Directives, field evidence and reviewed briefings, brought into the same frame.",
  },
  {
    slug: "ugems",
    headline: "The school comes first.",
    copy: "Education records that stay useful when the connection drops. Designed from the school outwards.",
  },
  {
    slug: "sentect",
    headline: "The pattern between the signals.",
    copy: "A security blueprint that treats disconnected threats as part of one trust graph.",
  },
];
