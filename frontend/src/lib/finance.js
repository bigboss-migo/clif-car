import site from "@/config/site";
import {
  calculatorDefaults,
  creditTiers,
  defaultLeaseTaxMethod,
  leaseTaxMethods,
  stateFees,
  unknownStateFees,
} from "@/config/finance";

// Coerce to a finite, non-negative number; anything else becomes the fallback.
const money = (v, fallback = 0) => {
  const n = typeof v === "string" ? Number(v.replace(/[$,\s]/g, "")) : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};

const termOf = (v, fallback) => Math.max(Math.round(money(v, fallback)), 1);

export const getTier = (id) =>
  creditTiers.find((t) => t.id === id) ?? creditTiers.find((t) => t.id === calculatorDefaults.creditTier);

export const getStateFees = (state) => stateFees[state] ?? unknownStateFees;

export const getLeaseTaxMethod = (state) => leaseTaxMethods[state] ?? defaultLeaseTaxMethod;

export function calcFinance(inputs = {}) {
  const price = money(inputs.price);
  const cashDown = money(inputs.cashDown);
  const tradeIn = money(inputs.tradeIn);
  const incentives = money(inputs.incentives);
  const n = termOf(inputs.term, calculatorDefaults.finance.term);
  const tier = getTier(inputs.creditTier);
  const { tax, doc, titleReg } = getStateFees(inputs.state);
  const brokerFee = money(site.brokerFee);

  const salesTax = Math.max(price - tradeIn, 0) * tax;
  const base = price + salesTax + doc + titleReg + brokerFee;
  const amountFinanced = Math.max(base - cashDown - tradeIn - incentives, 0);
  const apr = tier.financeApr;
  const r = apr / 100 / 12;
  const monthly = r === 0 ? amountFinanced / n : (amountFinanced * r) / (1 - (1 + r) ** -n);
  const totalOfPayments = monthly * n;

  return {
    type: "finance",
    monthly,
    amountFinanced,
    totalOfPayments,
    totalInterest: totalOfPayments - amountFinanced,
    dueAtSigning: cashDown,
    salesTax,
    base,
    apr,
    term: n,
    tier,
    fees: { taxRate: tax, doc, titleReg, brokerFee },
  };
}

const leaseTax = (method, { baseMonthly, n, selling, cashDown, tax }) => {
  if (method === "upfront_total") return { monthlyTax: 0, upfrontTax: (baseMonthly * n + cashDown) * tax };
  if (method === "upfront_selling") return { monthlyTax: 0, upfrontTax: selling * tax };
  return { monthlyTax: baseMonthly * tax, upfrontTax: 0 };
};

export function calcLease(inputs = {}) {
  const d = calculatorDefaults.lease;
  const price = money(inputs.price);
  const cashDown = money(inputs.cashDown);
  const tradeIn = money(inputs.tradeIn);
  const incentives = money(inputs.incentives);
  const n = termOf(inputs.term, d.term);
  const annualMiles = money(inputs.annualMiles, d.annualMiles);
  const residualSlider = money(inputs.residualSlider, d.residualPct);
  const acquisitionFee = money(inputs.acquisitionFee, d.acquisitionFee);
  const tier = getTier(inputs.creditTier);
  const { tax, doc, titleReg } = getStateFees(inputs.state);
  const taxMethod = getLeaseTaxMethod(inputs.state);
  const brokerFee = money(site.brokerFee);

  const msrp = money(inputs.msrp) > 0 ? money(inputs.msrp) : price;
  const selling = price;
  const discount = Math.max(msrp - selling, 0);
  const customMF = [null, undefined, ""].includes(inputs.customMF) ? null : money(inputs.customMF, null);
  const mf = customMF ?? tier.leaseMoneyFactor;
  const mileageAdj = ((annualMiles - 10000) / 1000) * 0.005;
  const residualPct = Math.max(residualSlider / 100 - mileageAdj, 0.05);
  const residual = msrp * residualPct;
  const grossCap = selling + acquisitionFee + doc + brokerFee;
  const capReduction = cashDown + tradeIn + incentives;
  const adjCap = Math.max(grossCap - capReduction, 0);
  const depreciation = Math.max(adjCap - residual, 0) / n;
  const rentCharge = (adjCap + residual) * mf;
  const baseMonthly = depreciation + rentCharge;
  const { monthlyTax, upfrontTax } = leaseTax(taxMethod, { baseMonthly, n, selling, cashDown, tax });
  const monthly = baseMonthly + monthlyTax;
  const totalOfPayments = monthly * n;
  const dueAtSigning = cashDown + monthly + upfrontTax + titleReg;

  return {
    type: "lease",
    monthly,
    baseMonthly,
    monthlyTax,
    upfrontTax,
    dueAtSigning,
    totalOfPayments,
    totalLeaseCost: totalOfPayments + cashDown + upfrontTax + titleReg,
    depreciation,
    rentCharge,
    residual,
    residualPct,
    mileageAdj,
    msrp,
    selling,
    discount,
    grossCap,
    capReduction,
    adjCap,
    moneyFactor: mf,
    aprEquivalent: mf * 2400,
    term: n,
    taxMethod,
    tier,
    fees: { taxRate: tax, doc, titleReg, acquisitionFee, brokerFee },
  };
}
