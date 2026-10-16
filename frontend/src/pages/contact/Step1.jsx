import { stateNames } from "@/config/finance";
import { Field, SelectInput, TextInput, ToggleGroup } from "@/components/form/fields";
import { contactOptions } from "@/pages/contact/leadForm";
import { CountryPhoneFields } from "@/pages/contact/CountryPhoneFields";
import { ConsentBlock } from "@/pages/contact/ConsentBlock";

const DC = "District of Columbia";
const regionOptions = [...stateNames.filter((s) => s !== DC), DC, "Outside the United States"];
const PREF_HINT = "Pick as many as you like — we'll use whichever you prefer.";

const Text = ({ id, label, values, errors, setField, ...props }) => (
  <Field id={id} label={label} error={errors[id]}>
    <TextInput id={id} value={values[id]} onChange={(e) => setField(id, e.target.value)} error={errors[id]} maxLength={200} {...props} />
  </Field>
);

export const Step1 = (props) => {
  const { values, errors, setField } = props;
  const selected = values.contactPreference ? values.contactPreference.split(", ") : [];
  const toggle = (o) => {
    const next = selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o];
    setField("contactPreference", contactOptions.filter((c) => next.includes(c)).join(", "));
  };

  return (
    <div data-testid="lead-step-1" className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Text id="firstName" label="First name" autoComplete="given-name" {...props} />
        <Text id="lastName" label="Last name" autoComplete="family-name" {...props} />
      </div>
      <Text id="email" label="Email" type="email" inputMode="email" autoComplete="email" {...props} />
      <div className="grid gap-6 sm:grid-cols-2">
        <CountryPhoneFields {...props} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Text id="city" label="City" autoComplete="address-level2" {...props} />
        <Field id="state" label="State / region" error={errors.state}>
          <SelectInput id="state" value={values.state} onChange={(e) => setField("state", e.target.value)} error={errors.state}>
            <option value="">Select a state</option>
            {regionOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field id="contactPreference" label="Best ways to reach you" error={errors.contactPreference} hint={PREF_HINT}>
        <ToggleGroup id="contactPreference" options={contactOptions} selected={selected} onToggle={toggle} error={errors.contactPreference} hint={PREF_HINT} />
      </Field>
      <ConsentBlock {...props} />
    </div>
  );
};
