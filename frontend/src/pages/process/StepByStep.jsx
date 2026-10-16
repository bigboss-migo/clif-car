import { Check } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { timeline } from "@/pages/process/processContent";

const TimelineRow = ({ row, index }) => (
  <li data-testid={`timeline-row-${index + 1}`} className="grid gap-4 border-t border-border py-10 md:grid-cols-[220px_1fr] md:gap-12">
    <div>
      <p className="font-display text-2xl text-primary">{row.when}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{row.phase}</p>
    </div>
    <div>
      <h3 className="text-2xl leading-tight md:text-3xl">{row.title}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{row.body}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {row.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm font-semibold">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  </li>
);

export const StepByStep = () => (
  <Section data-testid="process-step-by-step" className="bg-surface">
    <Eyebrow>Step by step</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl">What actually happens, and when</h2>
    <ol className="mt-12 border-b border-border">
      {timeline.map((row, i) => (
        <TimelineRow key={row.title} row={row} index={i} />
      ))}
    </ol>
  </Section>
);
