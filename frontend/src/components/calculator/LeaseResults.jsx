import { formatPct, formatUsd, formatUsdCents } from "@/lib/format";
import { Row } from "@/components/calculator/FinanceResults";

const Summary = ({ result }) => {
  const effective = result.totalLeaseCost / result.term;
  const per1k = result.msrp > 0 ? result.monthly / (result.msrp / 1000) : 0;
  return (
    <div data-testid="lease-summary" className="mt-8 grid grid-cols-2 divide-x divide-ink-foreground/10 rounded-lg border border-ink-foreground/15">
      <div className="p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink-muted">Effective payment</p>
        <p data-testid="lease-effective" className="font-display mt-2 text-2xl tabular-nums">{formatUsd(effective)}</p>
        <p className="mt-1 text-xs text-ink-muted">All costs ÷ term</p>
      </div>
      <div className="p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink-muted">Per $1,000 MSRP</p>
        <p data-testid="lease-per-1k" className="font-display mt-2 text-2xl tabular-nums">{formatUsdCents(per1k)}</p>
        <p data-testid="lease-one-pct" className={`mt-1 text-xs font-semibold ${result.msrp > 0 && per1k <= 10 ? "text-primary" : "text-ink-muted"}`}>
          {result.msrp <= 0 ? "Enter an MSRP" : per1k <= 10 ? "Beats the 1% rule" : "Above the 1% rule"}
        </p>
      </div>
    </div>
  );
};

export const LeaseResults = ({ result, miles }) => {
  const rows = [
    ["MSRP", result.msrp, "msrp"],
    ["Selling price", result.selling, "selling"],
    ["Discount off MSRP", result.discount, "discount"],
    ["Gross cap cost", result.grossCap, "gross-cap", true],
    ["Cap reduction", result.capReduction, "cap-reduction"],
    ["Adjusted cap cost", result.adjCap, "adj-cap", true],
    ["Residual value", result.residual, "residual"],
    ["Depreciation / mo", result.depreciation, "depreciation"],
    ["Rent charge / mo", result.rentCharge, "rent-charge"],
    ["Monthly tax", result.monthlyTax, "monthly-tax"],
    ["Upfront tax", result.upfrontTax, "upfront-tax"],
    ["Acquisition fee", result.fees.acquisitionFee, "acq-fee"],
    ["Dealer doc fee", result.fees.doc, "lease-doc-fee"],
    ["Title & registration", result.fees.titleReg, "lease-title-reg"],
    ["Broker fee", result.fees.brokerFee, "lease-broker-fee"],
    ["Due at signing", result.dueAtSigning, "lease-due-at-signing", true],
    ["Total of payments", result.totalOfPayments, "lease-total-payments"],
    ["Total lease cost", result.totalLeaseCost, "total-lease-cost", true],
  ];
  return (
    <div data-testid="lease-results">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.32em] text-primary">Monthly lease payment</p>
      <p aria-live="polite" data-testid="calc-monthly" className="font-display mt-3 text-6xl leading-none tabular-nums md:text-7xl">
        {formatUsd(result.monthly)}
        <span className="ml-1 text-xl text-ink-muted">/mo</span>
      </p>
      <p data-testid="calc-subline" className="mt-3 text-sm text-ink-muted">
        {result.term} mo · {miles.toLocaleString("en-US")} mi/yr · MF {result.moneyFactor.toFixed(5)} ({formatPct(result.aprEquivalent, 2)} APR)
      </p>
      <Summary result={result} />
      <dl className="mt-6">
        {rows.map(([label, value, id, strong]) => (
          <Row key={id} label={label} value={formatUsd(value)} strong={strong} testId={`calc-row-${id}`} />
        ))}
      </dl>
    </div>
  );
};
