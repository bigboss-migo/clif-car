import { useMemo, useState } from "react";
import { calculatorDefaults } from "@/config/finance";
import { calcFinance, calcLease } from "@/lib/finance";
import { ModeToggle } from "@/components/calculator/ModeToggle";
import { FinanceFields } from "@/components/calculator/FinanceFields";
import { FinanceResults } from "@/components/calculator/FinanceResults";
import { LeaseFields } from "@/components/calculator/LeaseFields";
import { LeaseResults } from "@/components/calculator/LeaseResults";

const toNum = (v) => Number(v) || 0;
const { finance: financeDefaults, lease: leaseDefaults } = calculatorDefaults;

// Shared: tradeIn, incentives, state, creditTier. Mode-specific keys keep finance and lease independent.
const initialValues = (initialPrice, defaultTier) => ({
  tradeIn: "0",
  incentives: "0",
  state: "New York",
  creditTier: defaultTier,
  price: String(initialPrice),
  cashDown: String(Math.round(initialPrice * 0.1)),
  term: String(financeDefaults.term),
  msrp: String(Math.round(initialPrice * 1.06)),
  leasePrice: String(initialPrice),
  leaseCashDown: String(Math.round(initialPrice * 0.1)),
  leaseTerm: String(leaseDefaults.term),
  annualMiles: String(leaseDefaults.annualMiles),
  residualSlider: String(leaseDefaults.residualPct),
  acquisitionFee: String(leaseDefaults.acquisitionFee),
  mfCustom: false,
  customMF: "",
});

const useCalculations = (v) =>
  useMemo(() => {
    const shared = { tradeIn: toNum(v.tradeIn), incentives: toNum(v.incentives), state: v.state, creditTier: v.creditTier };
    return {
      finance: calcFinance({ ...shared, price: toNum(v.price), cashDown: toNum(v.cashDown), term: toNum(v.term) }),
      lease: calcLease({
        ...shared,
        price: toNum(v.leasePrice),
        msrp: toNum(v.msrp),
        cashDown: toNum(v.leaseCashDown),
        term: toNum(v.leaseTerm),
        annualMiles: toNum(v.annualMiles),
        residualSlider: toNum(v.residualSlider),
        acquisitionFee: toNum(v.acquisitionFee),
        customMF: v.mfCustom ? v.customMF : null,
      }),
    };
  }, [v]);

export const PaymentCalculator = ({ initialPrice = 150000, defaultTier = calculatorDefaults.creditTier, vehicleLabel }) => {
  const [mode, setMode] = useState("finance");
  const [values, setValues] = useState(() => initialValues(initialPrice, defaultTier));
  const set = (key) => (v) => setValues((prev) => ({ ...prev, [key]: v }));
  const { finance, lease } = useCalculations(values);

  const mfEdit = () => setValues((p) => ({ ...p, mfCustom: true, customMF: String(lease.tier.leaseMoneyFactor) }));
  const mfAuto = () => setValues((p) => ({ ...p, mfCustom: false, customMF: "" }));

  return (
    <div data-testid="payment-calculator" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <ModeToggle mode={mode} onChange={setMode} />
        {vehicleLabel && (
          <p data-testid="calc-vehicle-label" className="mt-5 text-sm text-muted-foreground">
            Estimating for <span className="font-semibold text-foreground">{vehicleLabel}</span>
          </p>
        )}
        <div className="mt-6">
          {mode === "finance" ? (
            <FinanceFields values={values} set={set} />
          ) : (
            <LeaseFields values={values} set={set} result={lease} onMfEdit={mfEdit} onMfAuto={mfAuto} />
          )}
        </div>
      </div>
      <div className="self-start rounded-lg bg-ink p-6 text-ink-foreground md:p-8 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
        {mode === "finance" ? (
          <FinanceResults result={finance} />
        ) : (
          <LeaseResults result={lease} miles={toNum(values.annualMiles)} />
        )}
      </div>
    </div>
  );
};
