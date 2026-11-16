import { Link } from "react-router-dom";
import { Section } from "@/components/Section";
import { Eyebrow } from "@/components/Eyebrow";

// Renders a legal document from structured content (see src/pages/legal/*Content.js).
// Block types inside a section's `body`:
//   "text"                                -> paragraph
//   { p: ["text ", {to,label}, {href,label}, " more"] }  -> paragraph with inline links
//   { list: ["a", { term: "Lead-in.", text: "rest" }] }  -> bulleted list
//   { ordered: ["a", "b"] }               -> numbered list
//   { subheading: "Text" }                -> h3
const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

const Rich = ({ parts }) =>
  parts.map((part, i) => {
    if (typeof part === "string") return part;
    if (part.to) return <Link key={i} to={part.to} className={linkClass}>{part.label}</Link>;
    return <a key={i} href={part.href} className={linkClass}>{part.label}</a>;
  });

const Item = ({ item }) =>
  typeof item === "string" ? item : (
    <>
      <strong className="font-semibold text-foreground">{item.term}</strong> {item.text}
    </>
  );

const Block = ({ block }) => {
  if (typeof block === "string") {
    return <p className="leading-relaxed text-muted-foreground">{block}</p>;
  }
  if (block.p) {
    return <p className="leading-relaxed text-muted-foreground"><Rich parts={block.p} /></p>;
  }
  if (block.subheading) {
    return <h3 className="mt-2 text-lg text-foreground">{block.subheading}</h3>;
  }
  if (block.list) {
    return (
      <ul className="list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground marker:text-primary">
        {block.list.map((item, i) => <li key={i}><Item item={item} /></li>)}
      </ul>
    );
  }
  if (block.ordered) {
    return (
      <ol className="list-decimal space-y-3 pl-6 leading-relaxed text-muted-foreground marker:text-primary">
        {block.ordered.map((item, i) => <li key={i}><Item item={item} /></li>)}
      </ol>
    );
  }
  return null;
};

export const LegalDocument = ({ id, effectiveDate, intro, sections }) => (
  <Section data-testid={`${id}-document`}>
    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
        <Eyebrow>On this page</Eyebrow>
        <nav aria-label="Table of contents" data-testid={`${id}-toc`} className="mt-4">
          <ol className="space-y-3 border-l border-border pl-4 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted-foreground transition-colors hover:text-primary">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <article data-testid={`${id}-content`} className="max-w-3xl">
        {effectiveDate && (
          <p data-testid={`${id}-effective-date`} className="text-sm font-semibold text-foreground">
            Effective date: {effectiveDate}
          </p>
        )}
        {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
        <div className="mt-10 space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} data-testid={`${id}-section-${s.id}`}>
              <h2 className="text-2xl md:text-3xl">{s.title}</h2>
              <div className="mt-5 space-y-4">
                {s.body.map((block, i) => <Block key={i} block={block} />)}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  </Section>
);
