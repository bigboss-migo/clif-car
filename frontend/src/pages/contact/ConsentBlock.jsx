import site from "@/config/site";
import { Checkbox } from "@/components/form/fields";

// LEGAL: placeholder consent language. The owner's attorney must review this text before launch.
export const ConsentBlock = ({ values, errors, setField }) => (
  <div className="space-y-6">
    <Checkbox id="consent" checked={values.consent} onChange={(v) => setField("consent", v)} error={errors.consent}>
      By checking this box, I agree that {site.brandName} may contact me by phone call, text/SMS or email at the
      details above about vehicle options, financing and deals. Message and data rates may apply. Consent is not a
      condition of purchase. Reply STOP to opt out at any time. See our{" "}
      <a href="#" className="font-semibold text-foreground underline underline-offset-2">Privacy Policy</a> and{" "}
      <a href="#" className="font-semibold text-foreground underline underline-offset-2">Disclosures</a>.
    </Checkbox>
    <div className="border-t border-border pt-6">
      <Checkbox id="newsletterOptIn" checked={values.newsletterOptIn} onChange={(v) => setField("newsletterOptIn", v)}>
        Also add me to the Monthly Deal Drop — first look at standout vehicle deals and member-only offers. Unsubscribe
        anytime. <span className="font-semibold">(Optional)</span>
      </Checkbox>
    </div>
  </div>
);
