import { Field, SelectInput, TextInput } from "@/components/form/fields";
import { cn } from "@/lib/utils";
import { digitsOnly, money } from "@/pages/process/quote/quoteForm";

export const Select = ({ id, label, options, values, errors, setField, placeholder = "Select…" }) => (
  <Field id={id} label={label} error={errors[id]}>
    <SelectInput id={id} value={values[id]} onChange={(e) => setField(id, e.target.value)} error={errors[id]}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </SelectInput>
  </Field>
);

export const Text = ({ id, label, values, errors, setField, optional, hint, ...props }) => (
  <Field id={id} label={label} error={errors[id]} optional={optional} hint={hint}>
    <TextInput id={id} value={values[id]} onChange={(e) => setField(id, e.target.value)} error={errors[id]} hint={hint} maxLength={200} {...props} />
  </Field>
);

// Stores digits only; shows "$12,500".
export const MoneyInput = ({ id, label, values, errors, setField, hint }) => (
  <Field id={id} label={label} error={errors[id]} hint={hint}>
    <TextInput
      id={id}
      inputMode="numeric"
      autoComplete="off"
      placeholder="$0"
      value={money(values[id])}
      onChange={(e) => setField(id, digitsOnly(e.target.value))}
      error={errors[id]}
      hint={hint}
    />
  </Field>
);

// Stores digits only; shows "64,000".
export const NumberInput = ({ id, label, values, errors, setField, placeholder }) => (
  <Field id={id} label={label} error={errors[id]}>
    <TextInput
      id={id}
      inputMode="numeric"
      autoComplete="off"
      placeholder={placeholder}
      value={values[id] === "" ? "" : Number(values[id]).toLocaleString("en-US")}
      onChange={(e) => setField(id, digitsOnly(e.target.value))}
      error={errors[id]}
    />
  </Field>
);

export const YesNo = ({ id, label, value, onChange, error }) => (
  <div id={`${id}-group`} tabIndex={-1} className="outline-none">
    <p id={`${id}-label`} className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.16em]">{label}</p>
    <div role="radiogroup" aria-labelledby={`${id}-label`} className="grid max-w-sm grid-cols-2 gap-3">
      {[["yes", "Yes"], ["no", "No"]].map(([val, text]) => (
        <label
          key={val}
          className={cn(
            "flex h-12 cursor-pointer items-center justify-center border text-xs font-bold uppercase tracking-[0.2em] transition-colors focus-within:ring-2 focus-within:ring-primary/30",
            value === val ? "border-primary bg-primary text-primary-foreground" : error ? "border-destructive" : "border-input hover:border-primary",
          )}
        >
          <input type="radio" name={id} value={val} checked={value === val} onChange={() => onChange(val)} data-testid={`${id}-${val}`} className="sr-only" />
          {text}
        </label>
      ))}
    </div>
    {error && <p data-testid={`error-${id}`} className="mt-2 text-sm font-medium text-destructive">{error}</p>}
  </div>
);
