import { getCountry, otherCountries, priorityCountries } from "@/config/countries";
import { formatPhone, phonePlaceholder } from "@/lib/phone";
import { Field, SelectInput, TextInput } from "@/components/form/fields";

const countryLabel = (c) => `${c.name} (${c.dial})`;

export const CountryPhoneFields = ({ values, errors, setField }) => {
  const changeCountry = (iso) => {
    const c = getCountry(iso);
    setField("countryIso", c.iso);
    setField("countryCode", c.dial);
    setField("phone", formatPhone(values.phone, c.iso));
  };

  return (
    <>
      <Field id="countryIso" label="Country" error={errors.countryIso}>
        <SelectInput id="countryIso" value={values.countryIso} onChange={(e) => changeCountry(e.target.value)} autoComplete="country">
          {priorityCountries.map((c) => (
            <option key={c.iso} value={c.iso}>{countryLabel(c)}</option>
          ))}
          <option disabled>──────────</option>
          {otherCountries.map((c) => (
            <option key={c.iso} value={c.iso}>{countryLabel(c)}</option>
          ))}
        </SelectInput>
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <div className="relative">
          <span
            aria-hidden="true"
            data-testid="phone-dial-prefix"
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-input px-3.5 text-sm font-semibold text-muted-foreground"
          >
            {values.countryCode}
          </span>
          <TextInput
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={phonePlaceholder(values.countryIso)}
            value={values.phone}
            onChange={(e) => setField("phone", formatPhone(e.target.value, values.countryIso))}
            error={errors.phone}
            style={{ paddingLeft: `${values.countryCode.length * 0.6 + 2}rem` }}
          />
        </div>
      </Field>
    </>
  );
};
