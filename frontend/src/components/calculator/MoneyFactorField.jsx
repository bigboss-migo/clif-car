import { calcControl } from "@/components/calculator/fields";

export const MoneyFactorField = ({ tierMf, effectiveMf, custom, value, onEdit, onAuto, onChange }) => {
  const mf = effectiveMf;
  return (
    <div data-testid="mf-field">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Money factor</span>
        <button
          type="button"
          onClick={custom ? onAuto : onEdit}
          data-testid="mf-toggle"
          className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-primary hover:underline"
        >
          {custom ? "Auto" : "Edit"}
        </button>
      </div>
      {custom ? (
        <input
          id="customMF"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.00001"
          aria-label="Custom money factor"
          value={value}
          onChange={(e) => onChange(e.target.value.replace("-", ""))}
          onKeyDown={(e) => ["-", "e", "E", "+"].includes(e.key) && e.preventDefault()}
          data-testid="calc-input-customMF"
          className={`mt-2 ${calcControl}`}
        />
      ) : (
        <div
          data-testid="mf-readonly"
          className="mt-2 flex items-center justify-between rounded-md border border-input bg-muted px-3 py-2.5 text-base tabular-nums"
        >
          {tierMf.toFixed(5)}
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Auto</span>
        </div>
      )}
      <p className="mt-1.5 text-xs text-muted-foreground">≈ {(mf * 2400).toFixed(2)}% APR equivalent</p>
    </div>
  );
};
