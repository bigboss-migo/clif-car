import { useMemo, useState } from "react";
import { calculatorDefaults } from "@/config/finance";
import { calcFinance } from "@/lib/finance";
import { ModeToggle } from "@/components/calculator/ModeToggle";
import { FinanceFields } from "@/components/calculator/FinanceFields";
import { FinanceResults } from "@/components/calculator/FinanceResults";

const toNum = (v) => Number(v) || 0;

const initialValues = (initialPrice, defaultTier) => ({
  price: String(initialPrice),
  cashDown: String(Math.round(initialPrice * 0.1)),
  tradeIn: "0",
  incentives: "0",
  state: "New York",
  creditTier: defaultTier,
  term: String(calculatorDefaults.finance.term),
});

const LeasePending = () => (
  <p data-testid="lease-pending" className="text-sm leading-relaxed text-muted-foreground">
    Lease estimates are coming soon. Switch to Finance to see a live payment.
  </p>
);

export const PaymentCalculator = ({ initialPrice = 150000, defaultTier = calculatorDefaults.creditTier, vehicleLabel }) => {
  const [mode, setMode] = useState("finance");
  const [values, setValues] = useState(() => initialValues(initialPrice, defaultTier));
  const set = (key) => (v) => setValues((prev) => ({ ...prev, [key]: v }));

  const finance = useMemo(
    () =>
      calcFinance({
        price: toNum(values.price),
        cashDown: toNum(values.cashDown),
        tradeIn: toNum(values.tradeIn),
        incentives: toNum(values.incentives),
        state: values.state,
        creditTier: values.creditTier,
        term: toNum(values.term),
      }),
    [values],
  );

  return (
    <div data-testid="payment-calculator" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <ModeToggle mode={mode} onChange={setMode} />
        {vehicleLabel && (
          <p data-testid="calc-vehicle-label" className="mt-5 text-sm text-muted-foreground">
            Estimating for <span className="font-semibold text-foreground">{vehicleLabel}</span>
          </p>
        )}
        <div className="mt-6">{mode === "finance" ? <FinanceFields values={values} set={set} /> : <LeasePending />}</div>
      </div>
      <div className="self-start rounded-lg bg-ink p-6 text-ink-foreground md:p-8 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
        {mode === "finance" ? <FinanceResults result={finance} /> : <p className="text-sm text-ink-muted">Lease results will appear here.</p>}
      </div>
    </div>
  );
};
