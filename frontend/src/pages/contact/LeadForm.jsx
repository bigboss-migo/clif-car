import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { formatUsd } from "@/lib/format";
import site from "@/config/site";
import { initialLeadState, validateStep1, validateStep2 } from "@/pages/contact/leadForm";
import { Step1 } from "@/pages/contact/Step1";
import { Step2 } from "@/pages/contact/Step2";

const Progress = ({ step }) => (
  <div
    role="progressbar"
    aria-label="Form progress"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={step * 50}
    data-testid="lead-progress"
    className="mt-6 h-1.5 w-full bg-border"
  >
    <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${step * 50}%` }} />
  </div>
);

const QuotedNote = ({ value }) => {
  const n = Number(String(value).replace(/[$,\s]/g, ""));
  const shown = Number.isFinite(n) && n > 0 ? `${formatUsd(n)}/mo` : value;
  return (
    <div data-testid="quoted-payment-note" className="mb-8 border-l-4 border-primary bg-primary/10 px-5 py-4 text-sm">
      Quoted payment from the calculator: <span className="font-bold">{shown}</span>
    </div>
  );
};

const Step2Actions = ({ onBack }) => (
  <div className="mt-10">
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <SecondaryButton onClick={onBack} className="sm:w-40" data-testid="lead-back-btn">Back</SecondaryButton>
      <PrimaryButton type="submit" className="flex-1 py-4" data-testid="lead-submit-btn">Send My Request</PrimaryButton>
    </div>
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Prefer to apply for financing directly? Use {site.prequalLabel} above.
    </p>
  </div>
);

export const LeadForm = () => {
  const [params] = useSearchParams();
  const [values, setValues] = useState(() => initialLeadState(params));
  const [errors, setErrors] = useState({});
  const [showBanner, setShowBanner] = useState(false);
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  const setField = (key, v) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  };
  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const goTo = (n) => {
    setStep(n);
    scrollToTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = step === 1 ? validateStep1(values) : validateStep2(values);
    setErrors(errs);
    const invalid = Object.keys(errs).length > 0;
    setShowBanner(invalid);
    if (invalid) return scrollToTop();
    if (step === 1) goTo(2);
    // Step 2 valid: final submission is wired in the next prompt.
  };
  const back = () => {
    setErrors({});
    setShowBanner(false);
    goTo(1);
  };

  return (
    <div ref={topRef}>
      <Eyebrow>Get Started</Eyebrow>
      <h2 className="mt-4 text-3xl md:text-5xl">Build your deal</h2>
      <p data-testid="lead-step-text" className="mt-4 text-muted-foreground">
        Takes about two minutes. Everything you send goes straight to the team. (Step {step} of 2)
      </p>
      <Progress step={step} />
      <form noValidate onSubmit={handleSubmit} data-testid="lead-form" className="mt-10">
        {values.quotedPayment && <QuotedNote value={values.quotedPayment} />}
        {showBanner && Object.keys(errors).length > 0 && (
          <div role="alert" data-testid="lead-error-banner" className="mb-8 flex items-center gap-3 border border-destructive bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive">
            <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Please fix the highlighted fields.
          </div>
        )}
        {step === 1 ? (
          <>
            <Step1 values={values} errors={errors} setField={setField} />
            <PrimaryButton type="submit" className="mt-10 w-full py-4" data-testid="lead-next-btn">
              Next: Vehicle Details
            </PrimaryButton>
          </>
        ) : (
          <>
            <Step2 values={values} errors={errors} setField={setField} />
            <Step2Actions onBack={back} />
          </>
        )}
      </form>
    </div>
  );
};
