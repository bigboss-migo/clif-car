import { calculatorDefaults } from "@/config/finance";
import { formatUsd } from "@/lib/format";

const { min, max } = calculatorDefaults.lease.residualRange;

export const ResidualSlider = ({ value, onChange, residualPct, residual }) => (
  <div data-testid="residual-field">
    <div className="flex items-baseline justify-between">
      <label htmlFor="residualSlider" className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Residual
      </label>
      <span data-testid="residual-value" className="font-display text-lg tabular-nums">{Number(value) || 0}%</span>
    </div>
    <input
      id="residualSlider"
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid="calc-input-residualSlider"
      className="mt-3 w-full accent-[var(--primary)]"
    />
    <p data-testid="residual-hint" className="mt-1.5 text-xs text-muted-foreground">
      Effective residual {(residualPct * 100).toFixed(1)}% after mileage = {formatUsd(residual)} at lease end.
    </p>
  </div>
);
