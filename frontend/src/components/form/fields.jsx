import { cn } from "@/lib/utils";

export const fieldClass = (invalid) =>
  cn(
    "block w-full border bg-background px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:ring-2",
    invalid ? "border-destructive focus:ring-destructive/30" : "border-input focus:border-primary focus:ring-primary/30",
  );

const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

const a11y = (id, error, hint) => ({
  id,
  "aria-invalid": Boolean(error),
  "aria-describedby": describedBy(id, error, hint),
  "data-testid": `field-${id}`,
});

export const Field = ({ id, label, error, hint, optional, className, children }) => (
  <div className={className}>
    <label id={`${id}-label`} htmlFor={id} className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.16em]">
      {label}
      {optional && <span className="ml-1.5 font-semibold normal-case tracking-normal text-muted-foreground">(optional)</span>}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} data-testid={`error-${id}`} className="mt-2 text-sm font-medium text-destructive">{error}</p>
    ) : hint ? (
      <p id={`${id}-hint`} className="mt-2 text-xs text-muted-foreground">{hint}</p>
    ) : null}
  </div>
);

export const TextInput = ({ id, error, hint, className, ...props }) => (
  <input {...a11y(id, error, hint)} className={cn(fieldClass(error), className)} {...props} />
);

export const SelectInput = ({ id, error, hint, className, children, ...props }) => (
  <select {...a11y(id, error, hint)} className={cn(fieldClass(error), className)} {...props}>
    {children}
  </select>
);

export const TextArea = ({ id, error, hint, className, ...props }) => (
  <textarea {...a11y(id, error, hint)} className={cn(fieldClass(error), "min-h-[120px]", className)} {...props} />
);

export const Checkbox = ({ id, checked, onChange, error, children }) => (
  <div>
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...a11y(id, error)}
        className={cn("mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]", error && "outline outline-2 outline-destructive")}
      />
      <span className="text-sm leading-relaxed text-muted-foreground">{children}</span>
    </label>
    {error && <p id={`${id}-error`} data-testid={`error-${id}`} className="mt-2 text-sm font-medium text-destructive">{error}</p>}
  </div>
);

export const ToggleGroup = ({ id, options, selected, onToggle, error, hint }) => (
  <div role="group" aria-labelledby={`${id}-label`} aria-describedby={describedBy(id, error, hint)} data-testid={`field-${id}`} className="flex flex-wrap gap-2">
    {options.map((o) => {
      const on = selected.includes(o);
      return (
        <button
          key={o}
          type="button"
          aria-pressed={on}
          onClick={() => onToggle(o)}
          data-testid={`toggle-${id}-${o.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "border px-4 py-2.5 text-sm font-semibold transition-colors",
            on ? "border-primary bg-primary text-primary-foreground" : error ? "border-destructive" : "border-input hover:border-foreground",
          )}
        >
          {o}
        </button>
      );
    })}
  </div>
);
