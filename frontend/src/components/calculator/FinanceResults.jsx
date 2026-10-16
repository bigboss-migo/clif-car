import { formatPct, formatUsd } from "@/lib/format";

const Row = ({ label, value, strong, testId }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-ink-foreground/10 py-3 last:border-b-0">
    <dt className="text-sm text-ink-muted">{label}</dt>
    <dd data-testid={testId} className={`tabular-nums ${strong ? "font-bold text-ink-foreground" : "text-ink-foreground"}`}>
      {value}
    </dd>
  </div>
);

export const FinanceResults = ({ result }) => {
  const rows = [
    ["Amount financed", result.amountFinanced, "amount-financed", true],
    ["Sales tax", result.salesTax, "sales-tax"],
    ["Dealer doc fee", result.fees.doc, "doc-fee"],
    ["Title & registration", result.fees.titleReg, "title-reg"],
    ["Broker fee", result.fees.brokerFee, "broker-fee"],
    ["Due at signing", result.dueAtSigning, "due-at-signing", true],
    ["Total interest", result.totalInterest, "total-interest"],
    ["Total of payments", result.totalOfPayments, "total-of-payments", true],
  ];
  return (
    <div data-testid="finance-results">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.32em] text-primary">Estimated monthly payment</p>
      <p aria-live="polite" data-testid="calc-monthly" className="font-display mt-3 text-6xl leading-none tabular-nums md:text-7xl">
        {formatUsd(result.monthly)}
        <span className="ml-1 text-xl text-ink-muted">/mo</span>
      </p>
      <p data-testid="calc-subline" className="mt-3 text-sm text-ink-muted">
        {result.term} months at {formatPct(result.apr)} APR
      </p>
      <dl className="mt-8">
        {rows.map(([label, value, id, strong]) => (
          <Row key={id} label={label} value={formatUsd(value)} strong={strong} testId={`calc-row-${id}`} />
        ))}
      </dl>
    </div>
  );
};
