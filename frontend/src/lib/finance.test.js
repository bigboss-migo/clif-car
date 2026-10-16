import { describe, expect, it } from "vitest";
import site from "@/config/site";
import { unknownStateFees } from "@/config/finance";
import { calcFinance, calcLease, getStateFees, getLeaseTaxMethod } from "@/lib/finance";

describe("calcFinance", () => {
  it("computes a Texas prime 60-month loan", () => {
    const r = calcFinance({ price: 40000, cashDown: 5000, term: 60, creditTier: "prime", state: "Texas" });
    expect(r.salesTax).toBeCloseTo(2500, 6);
    expect(r.base).toBeCloseTo(40000 + 2500 + 225 + 120 + site.brokerFee, 6);
    expect(r.amountFinanced).toBeCloseTo(38840, 6);
    expect(r.apr).toBe(7.4);
    expect(r.monthly).toBeCloseTo(776.43, 2);
    expect(r.totalInterest).toBeCloseTo(7745.77, 2);
    expect(r.dueAtSigning).toBe(5000);
  });

  it("uses the unknown-state fallback", () => {
    expect(getStateFees("Atlantis")).toEqual(unknownStateFees);
    const r = calcFinance({ price: 30000, term: 72, creditTier: "rebuild", state: "Atlantis" });
    expect(r.fees).toMatchObject({ taxRate: 0.07, doc: 399, titleReg: 160 });
    expect(r.amountFinanced).toBeCloseTo(33654, 6);
    expect(r.monthly).toBeCloseTo(765.67, 2);
  });

  it("handles a zero sales-tax state", () => {
    const r = calcFinance({ price: 12000, term: 12, creditTier: "prime", state: "Alaska" });
    expect(r.salesTax).toBe(0);
    expect(Number.isFinite(r.monthly)).toBe(true);
  });
});

describe("calcLease", () => {
  it("computes a California monthly-tax lease", () => {
    const r = calcLease({
      price: 45000, msrp: 48000, cashDown: 3000, term: 36, creditTier: "super",
      annualMiles: 12000, residualSlider: 58, acquisitionFee: 895, state: "California",
    });
    expect(r.taxMethod).toBe("monthly");
    expect(r.discount).toBe(3000);
    expect(r.residualPct).toBeCloseTo(0.57, 10);
    expect(r.residual).toBeCloseTo(27360, 6);
    expect(r.adjCap).toBeCloseTo(43975, 6);
    expect(r.baseMonthly).toBeCloseTo(622.03, 2);
    expect(r.monthly).toBeCloseTo(673.35, 2);
    expect(r.upfrontTax).toBe(0);
    expect(r.dueAtSigning).toBeCloseTo(4123.35, 2);
  });

  it("taxes total payments up front in New York", () => {
    const r = calcLease({
      price: 45000, msrp: 48000, cashDown: 3000, term: 36, creditTier: "super",
      annualMiles: 12000, residualSlider: 58, acquisitionFee: 895, state: "New York",
    });
    expect(r.taxMethod).toBe("upfront_total");
    expect(r.monthly).toBeCloseTo(r.baseMonthly, 10);
    expect(r.upfrontTax).toBeCloseTo(2174.33, 2);
  });

  it("maps lease tax methods", () => {
    expect(getLeaseTaxMethod("Texas")).toBe("upfront_selling");
    expect(getLeaseTaxMethod("Ohio")).toBe("upfront_total");
    expect(getLeaseTaxMethod("Florida")).toBe("monthly");
    expect(getLeaseTaxMethod(undefined)).toBe("monthly");
  });

  it("prefers a custom money factor and ignores blank ones", () => {
    expect(calcLease({ price: 30000, customMF: 0.001 }).moneyFactor).toBe(0.001);
    expect(calcLease({ price: 30000, customMF: "" }).moneyFactor).toBe(0.00285);
  });
});

describe("defensive inputs", () => {
  it("does not crash or return NaN on empty, zero or junk input", () => {
    for (const inputs of [undefined, {}, { price: 0, term: 0 }, { price: "abc", term: -5, cashDown: -100, creditTier: "nope" }]) {
      const f = calcFinance(inputs);
      const l = calcLease(inputs);
      for (const v of [f.monthly, f.amountFinanced, f.totalInterest, l.monthly, l.dueAtSigning, l.residual]) {
        expect(Number.isFinite(v)).toBe(true);
      }
      expect(f.term).toBeGreaterThanOrEqual(1);
      expect(l.term).toBeGreaterThanOrEqual(1);
    }
  });

  it("never finances a negative amount", () => {
    const r = calcFinance({ price: 10000, cashDown: 50000, state: "Texas" });
    expect(r.amountFinanced).toBe(0);
    expect(r.monthly).toBe(0);
  });

  it("parses formatted currency strings", () => {
    expect(calcFinance({ price: "$40,000", cashDown: "5,000", term: 60, state: "Texas" }).amountFinanced).toBeCloseTo(38840, 6);
  });
});
