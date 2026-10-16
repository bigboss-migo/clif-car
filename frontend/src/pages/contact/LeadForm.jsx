import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { formatUsd } from "@/lib/format";
import site from "@/config/site";
import { submitLead } from "@/lib/submitLead";
import { buildLeadPayload, initialLeadState, validateStep1, validateStep2 } from "@/pages/contact/leadForm";
import { OVERLAY_MIN_MS, SendingOverlay } from "@/pages/contact/SendingOverlay";
import { SuccessPanel } from "@/pages/contact/SuccessPanel";
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

const Step2Actions = ({ onBack, sending }) => (
  <div className="mt-10">
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <SecondaryButton onClick={onBack} className="sm:w-40" data-testid="lead-back-btn">Back</SecondaryButton>
      <PrimaryButton type="submit" disabled={sending} className="flex-1 py-4 disabled:opacity-60" data-testid="lead-submit-btn">
        Send My Request
      </PrimaryButton>
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
  const [status, setStatus] = useState("idle");
  const [sendError, setSendError] = useState("");
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

  const fail = (errs, toStep) => {
    setErrors(errs);
    setShowBanner(true);
    setStep(toStep);
    scrollToTop();
  };

  const send = async () => {
    setSendError("");
    setStatus("sending");
    const wait = new Promise((r) => setTimeout(r, OVERLAY_MIN_MS));
    const [result] = await Promise.all([submitLead(buildLeadPayload(values)), wait]);
    if (result.ok) {
      setStatus("success");
      scrollToTop();
      return;
    }
    setStatus("idle");
    setSendError(`Something went wrong sending your details. Please call ${site.phone} and we'll take it from there.`);
    scrollToTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs1 = validateStep1(values);
    if (Object.keys(errs1).length) return fail(errs1, 1);
    if (step === 1) {
      setErrors({});
      setShowBanner(false);
      return goTo(2);
    }
    const errs2 = validateStep2(values);
    if (Object.keys(errs2).length) return fail(errs2, 2);
    setErrors({});
    setShowBanner(false);
    send();
  };
  const back = () => {
    setErrors({});
    setShowBanner(false);
    goTo(1);
  };

  if (status === "success") {
    return (
      <div ref={topRef}>
        <SuccessPanel firstName={values.firstName.trim()} />
      </div>
    );
  }

  return (
    <div ref={topRef}>
      {status === "sending" && <SendingOverlay />}
      <Eyebrow>Get Started</Eyebrow>
      <h2 className="mt-4 text-3xl md:text-5xl">Build your deal</h2>
      <p data-testid="lead-step-text" className="mt-4 text-muted-foreground">
        Takes about two minutes. Everything you send goes straight to the team. (Step {step} of 2)
      </p>
      <Progress step={step} />
      <form noValidate onSubmit={handleSubmit} data-testid="lead-form" className="mt-10">
        {values.quotedPayment && <QuotedNote value={values.quotedPayment} />}
        {sendError && (
          <div role="alert" data-testid="lead-send-error" className="mb-8 flex items-start gap-3 border border-destructive bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              Something went wrong sending your details. Please call{" "}
              <a href={site.phoneHref} className="underline underline-offset-2">{site.phone}</a> and we'll take it from there.
            </span>
          </div>
        )}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
            data-testid="field-website"
          />
        </div>
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
            <Step2Actions onBack={back} sending={status === "sending"} />
          </>
        )}
      </form>
    </div>
  );
};
