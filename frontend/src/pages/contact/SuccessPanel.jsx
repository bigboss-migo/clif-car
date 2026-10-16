import { CheckCircle2 } from "lucide-react";
import site from "@/config/site";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";

export const SuccessPanel = ({ firstName }) => (
  <div data-testid="lead-success" className="border border-border bg-card p-8 md:p-12">
    <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-primary" />
    <h2 data-testid="lead-success-heading" className="mt-6 text-3xl md:text-5xl">Thanks, {firstName}</h2>
    <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
      Your request is with the team. Someone will reach out the same day using the contact options you picked. Need us
      sooner? Give us a call.
    </p>
    <a href={site.phoneHref} data-testid="lead-success-phone" className="font-display mt-6 inline-block text-3xl transition-colors hover:text-primary">
      {site.phone}
    </a>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <PrimaryButton to="/process" data-testid="lead-success-process-link">See how the process works</PrimaryButton>
      <SecondaryButton to="/calculator" data-testid="lead-success-calculator-link">Estimate a payment</SecondaryButton>
    </div>
  </div>
);
