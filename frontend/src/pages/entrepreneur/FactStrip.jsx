import { facts } from "@/pages/entrepreneur/content";

export const FactStrip = () => (
  <section data-testid="entrepreneur-fact-strip" className="border-b border-border bg-ink text-ink-foreground">
    <dl className="mx-auto grid max-w-7xl divide-y divide-ink-foreground/10 px-5 md:grid-cols-3 md:divide-x md:divide-y-0">
      {facts.map((f, i) => (
        <div key={f.label} data-testid={`fact-${i + 1}`} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
          <dt className="text-[0.7rem] font-bold uppercase tracking-[0.32em] text-primary">{f.label}</dt>
          <dd className="font-display mt-3 text-2xl md:text-3xl">{f.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
