const control =
  "block w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
    {children}
  </label>
);

export const NumberField = ({ id, label, value, onChange, prefix = "$", step = 100 }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <div className="relative mt-2">
      {prefix && (
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`calc-input-${id}`}
        className={`${control} ${prefix ? "pl-7" : ""}`}
      />
    </div>
  </div>
);

export const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid={`calc-select-${id}`}
      className={`mt-2 ${control}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);
