const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatUsd = (n) => usd0.format(Number.isFinite(n) ? n : 0);
export const formatUsdCents = (n) => usd2.format(Number.isFinite(n) ? n : 0);
export const formatPct = (n, digits = 1) => `${(Number.isFinite(n) ? n : 0).toFixed(digits)}%`;
