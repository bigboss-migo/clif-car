import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { audiences } from "@/pages/entrepreneur/content";

export const WhoItsFor = () => (
  <Section data-testid="entrepreneur-who-its-for" className="bg-surface">
    <Eyebrow>Who it's for</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl">Built for people who earn differently</h2>
    <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map(({ icon: Icon, title, body }, i) => (
        <li key={title} data-testid={`audience-card-${i + 1}`} className="bg-card p-6 md:p-8">
          <Icon aria-hidden="true" className="h-7 w-7 text-primary" />
          <h3 className="mt-6 text-lg leading-tight">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </li>
      ))}
    </ul>
  </Section>
);
