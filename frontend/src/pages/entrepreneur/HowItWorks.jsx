import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { getStartedHref } from "@/config/nav";
import { steps } from "@/pages/entrepreneur/content";

export const HowItWorks = () => (
  <Section data-testid="entrepreneur-how-it-works">
    <Eyebrow>How it works</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl">Four steps from first call to keys</h2>
    <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((s, i) => (
        <li key={s.title} data-testid={`how-step-${i + 1}`} className="border-t-2 border-foreground pt-6">
          <span aria-hidden="true" className="font-display block text-5xl leading-none text-primary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg leading-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
    <div className="mt-12 flex flex-col gap-3 sm:flex-row">
      <PrimaryButton to={getStartedHref} data-testid="entrepreneur-get-started-btn">Start my Entrepreneur Loan</PrimaryButton>
      <SecondaryButton to="/calculator" data-testid="entrepreneur-calculator-btn">Estimate my payment</SecondaryButton>
    </div>
  </Section>
);
