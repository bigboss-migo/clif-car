import { getCountry } from "@/config/countries";
import { formatUsd } from "@/lib/format";
import { isPhoneComplete } from "@/lib/phone";

// Single state object for the whole form; keys mirror the /api/lead "lead" payload.
export const initialQuoteState = () => {
  const us = getCountry("US");
  return {
    carType: "",
    condition: "",
    bodyStyle: "",
    transmission: "",
    colorChoice1: "",
    colorChoice2: "",
    colorChoice3: "",
    acquisition: "",
    downPayment: "", // digits only
    tradeIn: "", // "yes" | "no"
    tradeInYear: "",
    tradeInMake: "",
    tradeInMileage: "", // digits only
    tradeInVin: "",
    tradeInHasLoan: "", // "yes" | "no"
    tradeInAmountOwed: "", // digits only
    firstName: "",
    lastName: "",
    email: "",
    countryIso: us.iso,
    countryCode: us.dial,
    phone: "",
    consent: false,
    newsletterOptIn: false,
    website: "", // honeypot
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/; // 17 chars, no I, O or Q

const REQUIRED = {
  carType: "Select a type of car.",
  condition: "Select a condition.",
  bodyStyle: "Select a body style.",
  transmission: "Select a transmission.",
  colorChoice1: "Tell us your first color choice.",
  acquisition: "Select how you'll get your vehicle.",
  downPayment: "Enter your down payment (0 if none).",
  tradeIn: "Let us know if you're trading in.",
};

const TRADE_REQUIRED = {
  tradeInYear: "Select the year.",
  tradeInMake: "Select the make.",
  tradeInMileage: "Enter the mileage.",
  tradeInHasLoan: "Is there an outstanding loan?",
};

export const validateQuote = (v) => {
  const e = {};
  Object.entries(REQUIRED).forEach(([k, msg]) => {
    if (!String(v[k]).trim()) e[k] = msg;
  });
  if (v.tradeIn === "yes") {
    Object.entries(TRADE_REQUIRED).forEach(([k, msg]) => {
      if (!String(v[k]).trim()) e[k] = msg;
    });
    if (v.tradeInVin.trim() && !VIN_RE.test(v.tradeInVin.trim().toUpperCase())) {
      e.tradeInVin = "A VIN is 17 letters and numbers (no I, O or Q).";
    }
    if (v.tradeInHasLoan === "yes" && !v.tradeInAmountOwed) e.tradeInAmountOwed = "Enter the amount owed.";
  }
  if (!v.firstName.trim()) e.firstName = "First name is required.";
  if (!v.lastName.trim()) e.lastName = "Last name is required.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!isPhoneComplete(v.phone, v.countryIso)) e.phone = "Enter a complete phone number.";
  if (!v.consent) e.consent = "Please agree so we can contact you.";
  return e;
};

export const digitsOnly = (s) => String(s).replace(/\D/g, "").slice(0, 9);
export const money = (digits) => (digits === "" ? "" : formatUsd(Number(digits)));

// photos: array of bare base64 strings already prepared by lib/photos.js
export const buildQuotePayload = (v, photos) => {
  const trading = v.tradeIn === "yes";
  const loan = trading && v.tradeInHasLoan === "yes";
  return {
    type: "lead",
    source: "process-page",
    website: v.website,
    firstName: v.firstName.trim(),
    lastName: v.lastName.trim(),
    email: v.email.trim(),
    countryIso: v.countryIso,
    countryCode: v.countryCode,
    phone: v.phone,
    consent: v.consent,
    newsletterOptIn: v.newsletterOptIn,
    carType: v.carType,
    condition: v.condition,
    bodyStyle: v.bodyStyle,
    transmission: v.transmission,
    colorChoice1: v.colorChoice1.trim(),
    colorChoice2: v.colorChoice2.trim(),
    colorChoice3: v.colorChoice3.trim(),
    acquisition: v.acquisition,
    downPayment: money(v.downPayment),
    tradeIn: trading,
    ...(trading && {
      tradeInYear: v.tradeInYear,
      tradeInMake: v.tradeInMake,
      tradeInMileage: Number(v.tradeInMileage).toLocaleString("en-US"),
      tradeInVin: v.tradeInVin.trim().toUpperCase(),
      tradeInHasLoan: loan,
      tradeInAmountOwed: loan ? money(v.tradeInAmountOwed) : "",
      photos,
    }),
  };
};
