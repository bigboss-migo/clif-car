// ILLUSTRATIVE VALUES ONLY. All rates, money factors, taxes and fees below are placeholders.
// The owner must review and replace them with real, verified, business-approved values before launch.

export const creditTiers = [
  { id: "super", label: "Super Prime", range: "780+", financeApr: 5.9, leaseMoneyFactor: 0.00225 },
  { id: "prime", label: "Prime", range: "720 - 779", financeApr: 7.4, leaseMoneyFactor: 0.00285 },
  { id: "near", label: "Near Prime", range: "660 - 719", financeApr: 9.9, leaseMoneyFactor: 0.00375 },
  { id: "sub", label: "Building Credit", range: "600 - 659", financeApr: 13.9, leaseMoneyFactor: 0.0052 },
  { id: "rebuild", label: "Rebuilding", range: "580 - 599", financeApr: 17.9, leaseMoneyFactor: 0.0068 },
  { id: "entrepreneur", label: "Entrepreneur Loan", range: "No credit needed", financeApr: 11.9, leaseMoneyFactor: 0.0044 },
];

// Used when the state is missing or not in the table below.
export const unknownStateFees = { tax: 0.07, doc: 399, titleReg: 160 };

// PROVISIONAL STATE TABLE: approximate combined sales-tax rates, typical dealer doc fees and title/registration.
// These are rough illustrative estimates, NOT verified figures. Review and replace every row with
// business-approved values before launch. tax = decimal rate, doc/titleReg = USD.
export const stateFees = {
  Alabama: { tax: 0.04, doc: 485, titleReg: 125 },
  Alaska: { tax: 0, doc: 300, titleReg: 120 },
  Arizona: { tax: 0.084, doc: 499, titleReg: 160 },
  Arkansas: { tax: 0.065, doc: 129, titleReg: 110 },
  California: { tax: 0.0825, doc: 85, titleReg: 450 },
  Colorado: { tax: 0.077, doc: 599, titleReg: 400 },
  Connecticut: { tax: 0.0635, doc: 599, titleReg: 250 },
  Delaware: { tax: 0.0425, doc: 499, titleReg: 75 },
  "District of Columbia": { tax: 0.07, doc: 399, titleReg: 300 },
  Florida: { tax: 0.07, doc: 999, titleReg: 400 },
  Georgia: { tax: 0.07, doc: 699, titleReg: 40 },
  Hawaii: { tax: 0.045, doc: 399, titleReg: 300 },
  Idaho: { tax: 0.06, doc: 399, titleReg: 120 },
  Illinois: { tax: 0.0885, doc: 358, titleReg: 316 },
  Indiana: { tax: 0.07, doc: 250, titleReg: 150 },
  Iowa: { tax: 0.05, doc: 180, titleReg: 250 },
  Kansas: { tax: 0.087, doc: 499, titleReg: 100 },
  Kentucky: { tax: 0.06, doc: 499, titleReg: 70 },
  Louisiana: { tax: 0.0955, doc: 425, titleReg: 140 },
  Maine: { tax: 0.055, doc: 499, titleReg: 75 },
  Maryland: { tax: 0.06, doc: 800, titleReg: 250 },
  Massachusetts: { tax: 0.0625, doc: 450, titleReg: 135 },
  Michigan: { tax: 0.06, doc: 260, titleReg: 200 },
  Minnesota: { tax: 0.07375, doc: 350, titleReg: 250 },
  Mississippi: { tax: 0.05, doc: 425, titleReg: 75 },
  Missouri: { tax: 0.0825, doc: 500, titleReg: 100 },
  Montana: { tax: 0, doc: 399, titleReg: 250 },
  Nebraska: { tax: 0.0695, doc: 399, titleReg: 100 },
  Nevada: { tax: 0.0825, doc: 499, titleReg: 250 },
  "New Hampshire": { tax: 0, doc: 399, titleReg: 250 },
  "New Jersey": { tax: 0.06625, doc: 599, titleReg: 250 },
  "New Mexico": { tax: 0.04, doc: 399, titleReg: 150 },
  "New York": { tax: 0.0853, doc: 175, titleReg: 250 },
  "North Carolina": { tax: 0.03, doc: 699, titleReg: 150 },
  "North Dakota": { tax: 0.05, doc: 399, titleReg: 150 },
  Ohio: { tax: 0.0725, doc: 387, titleReg: 75 },
  Oklahoma: { tax: 0.0325, doc: 399, titleReg: 120 },
  Oregon: { tax: 0.005, doc: 150, titleReg: 450 },
  Pennsylvania: { tax: 0.0634, doc: 477, titleReg: 200 },
  "Rhode Island": { tax: 0.07, doc: 399, titleReg: 150 },
  "South Carolina": { tax: 0.05, doc: 499, titleReg: 100 },
  "South Dakota": { tax: 0.04, doc: 399, titleReg: 100 },
  Tennessee: { tax: 0.0955, doc: 699, titleReg: 120 },
  Texas: { tax: 0.0625, doc: 225, titleReg: 120 },
  Utah: { tax: 0.0725, doc: 399, titleReg: 200 },
  Vermont: { tax: 0.06, doc: 399, titleReg: 150 },
  Virginia: { tax: 0.0415, doc: 899, titleReg: 120 },
  Washington: { tax: 0.0938, doc: 200, titleReg: 400 },
  "West Virginia": { tax: 0.06, doc: 499, titleReg: 100 },
  Wisconsin: { tax: 0.055, doc: 399, titleReg: 250 },
  Wyoming: { tax: 0.054, doc: 399, titleReg: 100 },
};

export const stateNames = Object.keys(stateFees);

// How lease tax is applied: "upfront_total" = tax on total lease payments due at signing,
// "upfront_selling" = tax on the selling price due at signing, "monthly" = tax added to each payment.
export const leaseTaxMethods = {
  "New York": "upfront_total",
  "New Jersey": "upfront_total",
  Ohio: "upfront_total",
  Minnesota: "upfront_total",
  Texas: "upfront_selling",
  Georgia: "upfront_selling",
};
export const defaultLeaseTaxMethod = "monthly";

export const leaseTaxMethodLabels = {
  monthly: "Tax added to each monthly payment",
  upfront_total: "Tax on total lease payments, due at signing",
  upfront_selling: "Tax on the selling price, due at signing",
};

// Editable calculator defaults and option lists (illustrative).
export const calculatorDefaults = {
  creditTier: "prime",
  finance: { term: 72, termOptions: [36, 48, 60, 72, 84] },
  lease: {
    term: 36,
    termOptions: [24, 36, 39, 48],
    annualMiles: 10000,
    mileageOptions: [7500, 10000, 12000, 15000],
    residualPct: 58,
    residualRange: { min: 40, max: 75 },
    acquisitionFee: 995,
  },
};
