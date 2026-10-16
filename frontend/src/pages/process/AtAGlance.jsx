import { Eyebrow } from "@/components/Eyebrow";
import { glanceSteps } from "@/pages/process/processContent";

export const AtAGlance = () => (
  <section data-testid="process-at-a-glance" className="border-b border-border">
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <Eyebrow>At a glance</Eyebrow>
      <h2 className="mt-4 text-3xl md:text-5xl">Three steps to the keys</h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {glanceSteps.map((step, i) => (
          <li key={step.title} data-testid={`glance-step-${i + 1}`} className="border-t-2 border-foreground pt-6">
            <span aria-hidden="true" className="font-display block text-6xl leading-none text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-lg leading-tight">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
