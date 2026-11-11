import { projectContext, research } from "@/data/research";

export function ResearchContext({ slug }: { slug: string }) {
  const context = projectContext[slug];
  if (!context) return null;
  const fact = research[context.source];
  return (
    <section
      className="research-context studio-container"
      aria-label="Research and design context"
    >
      <div className="research-number">
        <p className="eyebrow">Field reference / {context.source}</p>
        <strong>{fact.value}</strong>
        <p>{fact.label}</p>
        <span>{fact.scope}</span>
      </div>
      <div className="research-reading">
        <p className="eyebrow">Design notes / Why it is built this way</p>
        <h2>{context.title}</h2>
        <p>{context.copy}</p>
        <a href={fact.href} target="_blank" rel="noreferrer">
          Read the source: {fact.source} ↗
        </a>
        <small>
          External context and our design interpretation. These figures do not
          measure this product’s performance or imply endorsement.
        </small>
      </div>
    </section>
  );
}
