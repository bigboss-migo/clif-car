import { Field, SelectInput, TextArea, TextInput } from "@/components/form/fields";
import {
  OTHER_MODEL,
  REFERRAL_OPTION,
  acquisitionOptions,
  budgetOptions,
  creditRangeOptions,
  downPaymentOptions,
  heardAboutOptions,
  timelineOptions,
  tradeInOptions,
  vehicleColors,
  vehicleMakes,
  vehicleYears,
} from "@/config/formOptions";
import { getModels } from "@/config/vehicleModels";

const CREDIT_HINT = "No credit? The Entrepreneur Loan still works.";
const NOTES_HINT = "Specs, wheels, interior, must-have options, or a direct link to a listing you like.";

const Select = ({ id, label, options, values, errors, setField, hint, disabled, placeholder = "Select…" }) => (
  <Field id={id} label={label} error={errors[id]} hint={hint}>
    <SelectInput id={id} value={values[id]} onChange={(e) => setField(id, e.target.value)} error={errors[id]} hint={hint} disabled={disabled} className="disabled:cursor-not-allowed disabled:opacity-50">
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </SelectInput>
  </Field>
);

const Text = ({ id, label, values, errors, setField, ...props }) => (
  <Field id={id} label={label} error={errors[id]}>
    <TextInput id={id} value={values[id]} onChange={(e) => setField(id, e.target.value)} error={errors[id]} maxLength={200} {...props} />
  </Field>
);

export const Step2 = (props) => {
  const { values, errors, setField } = props;
  const changeMake = (make) => {
    setField("vehicleMake", make);
    setField("vehicleModel", "");
    setField("vehicleModelCustom", "");
  };
  const changeHeard = (v) => {
    setField("heardAbout", v);
    if (v !== REFERRAL_OPTION) setField("referralName", "");
  };

  return (
    <div data-testid="lead-step-2" className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <Select id="vehicleYear" label="Vehicle year" options={vehicleYears} {...props} />
        <Select id="vehicleMake" label="Vehicle make" options={vehicleMakes} {...props} setField={(_, v) => changeMake(v)} />
        <Select
          id="vehicleModel"
          label="Vehicle model"
          options={[...getModels(values.vehicleMake), OTHER_MODEL]}
          disabled={!values.vehicleMake}
          placeholder={values.vehicleMake ? "Select…" : "Choose a make first"}
          {...props}
        />
      </div>
      {values.vehicleModel === OTHER_MODEL && (
        <Text id="vehicleModelCustom" label="Model" placeholder="Type the model and trim" {...props} />
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Select id="vehicleColor" label="Vehicle color" options={vehicleColors} {...props} />
        <Select id="acquisition" label="Acquisition type" options={acquisitionOptions} {...props} />
        <Select id="budget" label="Target budget" options={budgetOptions} {...props} />
        <Select id="downPayment" label="Down payment available" options={downPaymentOptions} {...props} />
        <Select id="creditRange" label="Credit profile" options={creditRangeOptions} hint={CREDIT_HINT} {...props} />
        <Select id="timeline" label="Timeline" options={timelineOptions} {...props} />
        <Select id="tradeIn" label="Trade-in" options={tradeInOptions} {...props} />
        <Select id="heardAbout" label="Heard about us" options={heardAboutOptions} {...props} setField={(_, v) => changeHeard(v)} />
      </div>
      {values.heardAbout === REFERRAL_OPTION && (
        <Text id="referralName" label="Who referred you?" placeholder="Full name of the person who sent you" autoComplete="off" {...props} />
      )}
      <Field id="notes" label="Notes" optional error={errors.notes} hint={NOTES_HINT}>
        <TextArea id="notes" value={values.notes} onChange={(e) => setField("notes", e.target.value)} error={errors.notes} hint={NOTES_HINT} maxLength={2000} />
      </Field>
    </div>
  );
};
