import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import site from "@/config/site";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { PrimaryButton } from "@/components/buttons";
import {
  acquisitionOptions,
  bodyStyleOptions,
  carTypeOptions,
  conditionOptions,
  transmissionOptions,
} from "@/config/formOptions";
import { submitLead } from "@/lib/submitLead";
import { CountryPhoneFields } from "@/pages/contact/CountryPhoneFields";
import { ConsentBlock } from "@/pages/contact/ConsentBlock";
import { MoneyInput, Select, Text, YesNo } from "@/pages/process/quote/controls";
import { TradeInFields } from "@/pages/process/quote/TradeInFields";
import { buildQuotePayload, initialQuoteState, validateQuote } from "@/pages/process/quote/quoteForm";

const GroupTitle = ({ children }) => (
  <h3 className="border-b border-border pb-3 text-xl md:text-2xl">{children}</h3>
);

const Success = ({ firstName }) => (
  <div data-testid="quote-success" role="status" className="border border-border bg-card p-8 md:p-12">
    <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-primary" />
    <h2 className="mt-6 text-3xl md:text-5xl">Thanks, {firstName}</h2>
    <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
      Your request is with the team and someone will be in touch shortly. Need us sooner? Give us a call.
    </p>
    <a href={site.phoneHref} className="font-display mt-6 inline-block text-3xl transition-colors hover:text-primary">{site.phone}</a>
  </div>
);

export const QuoteForm = () => {
  const [values, setValues] = useState(initialQuoteState);
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [sendError, setSendError] = useState(false);
  const topRef = useRef(null);

  const setField = (key, v) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  };
  const props = { values, errors, setField };
  const trading = values.tradeIn === "yes";
  const preparing = trading && photos.some((p) => !p.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending" || preparing) return;
    const errs = validateQuote(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      const el = document.getElementById(first) || document.getElementById(`${first}-group`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    setSendError(false);
    setStatus("sending");
    const result = await submitLead(buildQuotePayload(values, photos.map((p) => p.data)));
    if (result.ok) {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
      setStatus("success");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setStatus("idle");
      setSendError(true);
    }
  };

  return (
    <Section id="get-quote" data-testid="process-quote" className="bg-surface">
      <div ref={topRef} className="mx-auto max-w-3xl">
        {status === "success" ? (
          <Success firstName={values.firstName.trim()} />
        ) : (
          <>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">Tell us about your dream car</h2>
            <p className="mt-4 text-muted-foreground">Answer a few quick questions and the team will take it from there.</p>

            <form noValidate onSubmit={handleSubmit} data-testid="quote-form" className="mt-10 space-y-12">
              {/* honeypot: bots fill it, the backend silently drops those submissions */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setField("website", e.target.value)} />
              </div>

              <div className="space-y-6">
                <GroupTitle>The car</GroupTitle>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Select id="carType" label="Type of car" options={carTypeOptions} {...props} />
                  <Select id="condition" label="Condition" options={conditionOptions} {...props} />
                  <Select id="bodyStyle" label="Body style" options={bodyStyleOptions} {...props} />
                  <Select id="transmission" label="Transmission" options={transmissionOptions} {...props} />
                </div>
              </div>

              <div className="space-y-6">
                <GroupTitle>Color preferences</GroupTitle>
                <div className="grid gap-6 sm:grid-cols-3">
                  <Text id="colorChoice1" label="First choice" placeholder="e.g. Black" {...props} />
                  <Text id="colorChoice2" label="Second choice" optional placeholder="e.g. Grey" {...props} />
                  <Text id="colorChoice3" label="Third choice" optional placeholder="e.g. White" {...props} />
                </div>
              </div>

              <div className="space-y-6">
                <GroupTitle>Payment</GroupTitle>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Select id="acquisition" label="How will you get your vehicle?" options={acquisitionOptions} {...props} />
                  <MoneyInput id="downPayment" label="Down payment" hint="Enter $0 if you don't plan to put money down." {...props} />
                </div>
              </div>

              <div className="space-y-6">
                <GroupTitle>Trade-in</GroupTitle>
                <YesNo id="tradeIn" label="Are you trading in a vehicle?" value={values.tradeIn} onChange={(v) => setField("tradeIn", v)} error={errors.tradeIn} />
                {trading && <TradeInFields photos={photos} setPhotos={setPhotos} {...props} />}
              </div>

              <div className="space-y-6">
                <GroupTitle>How can we reach you?</GroupTitle>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Text id="firstName" label="First name" autoComplete="given-name" {...props} />
                  <Text id="lastName" label="Last name" autoComplete="family-name" {...props} />
                </div>
                <Text id="email" label="Email" type="email" inputMode="email" autoComplete="email" {...props} />
                <div className="grid gap-6 sm:grid-cols-2">
                  <CountryPhoneFields {...props} />
                </div>
                <ConsentBlock {...props} />
              </div>

              {sendError && (
                <div role="alert" data-testid="quote-send-error" className="flex items-start gap-3 border border-destructive bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive">
                  <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Something went wrong sending your details. Please try again, or call{" "}
                    <a href={site.phoneHref} className="underline underline-offset-2">{site.phone}</a>.
                  </span>
                </div>
              )}
              {Object.keys(errors).length > 0 && (
                <div role="alert" className="flex items-center gap-3 border border-destructive bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive">
                  <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
                  Please fix the highlighted fields.
                </div>
              )}

              <PrimaryButton type="submit" disabled={status === "sending" || preparing} data-testid="quote-submit-btn" className="w-full py-4 disabled:opacity-60">
                {status === "sending" ? "Sending…" : preparing ? "Preparing photos…" : "Send My Request"}
              </PrimaryButton>
            </form>
          </>
        )}
      </div>
    </Section>
  );
};
