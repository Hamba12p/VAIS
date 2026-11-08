export type DemoKind = "operations" | "bookings" | "inventory" | "pipeline";
export type DemoConcept = {
  kind: DemoKind;
  name: string;
  brief: string;
  revision: number;
};

export const demoPatterns: Record<
  DemoKind,
  {
    title: string;
    description: string;
    capabilities: string[];
    example: string;
  }
> = {
  operations: {
    title: "Team workspace",
    description: "A clearer place for the work that needs doing.",
    capabilities: [
      "Shared task list",
      "Progress at a glance",
      "A visible handover",
    ],
    example:
      "Our team needs one place to track jobs, mark work complete and see what still needs attention.",
  },
  bookings: {
    title: "Booking desk",
    description:
      "Make availability easy to see and appointments easy to manage.",
    capabilities: [
      "Available time slots",
      "Booking and cancellation",
      "A simple capacity overview",
    ],
    example:
      "We run a clinic and need appointment bookings, a clear schedule and a way to cancel or reschedule visits.",
  },
  inventory: {
    title: "Stock workspace",
    description: "Keep quantities and low-stock items in view.",
    capabilities: [
      "Stock quantities",
      "Low-stock indicators",
      "Simple stock adjustments",
    ],
    example:
      "Our shop needs to track inventory, identify low stock and update quantities when supplies arrive or are used.",
  },
  pipeline: {
    title: "Client pipeline",
    description: "Keep each enquiry moving towards a clear next step.",
    capabilities: [
      "Client enquiry list",
      "Editable sales stages",
      "Open and won opportunity counts",
    ],
    example:
      "Our consultancy needs a CRM to manage incoming leads, follow up with clients and track proposals through to won work.",
  },
};

/** Transparent, local template matching. This is not an AI generation service. */
export function suggestDemo(brief: string): DemoKind {
  const text = brief.toLowerCase();
  const candidates: [DemoKind, RegExp][] = [
    [
      "bookings",
      /\b(bookings?|appointments?|reservations?|scheduling|schedule|reschedule)\b/g,
    ],
    [
      "inventory",
      /\b(inventory|stock|warehouse|quantities|supplies|restock)\b/g,
    ],
    ["pipeline", /\b(crm|leads?|sales|proposals?|pipeline|follow.up)\b/g],
  ];
  let choice: DemoKind = "operations";
  let score = 0;
  for (const [kind, pattern] of candidates) {
    const matches = text.match(pattern)?.length ?? 0;
    if (matches > score) {
      choice = kind;
      score = matches;
    }
  }
  return choice;
}

export function conceptEnquiry(concept: DemoConcept) {
  return [
    `Business: ${concept.name || "Not specified"}`,
    `Business needs: ${concept.brief}`,
    `Starting concept: ${demoPatterns[concept.kind].title}`,
    `Features to discuss: ${demoPatterns[concept.kind].capabilities.join("; ")}.`,
  ].join("\n\n");
}
