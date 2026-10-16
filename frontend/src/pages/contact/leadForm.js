import { getCountry } from "@/config/countries";
import { OTHER_MODEL, REFERRAL_OPTION, budgetBrackets, budgetOptions, vehicleMakes } from "@/config/formOptions";
import { getModels } from "@/config/vehicleModels";
import { isPhoneComplete } from "@/lib/phone";

export const contactOptions = ["Phone call", "Text message", "Email", "WhatsApp"];

const PREFILL_KEYS = ["vehicleMake", "vehicleModel", "budget", "quotedPayment"];

// Single form-state object shared by both steps; keys mirror the /api/lead "lead" payload.
export const initialLeadState = (params) => {
  const us = getCountry("US");
  const state = {
    type: "lead",
    firstName: "",
    lastName: "",
    email: "",
    countryIso: us.iso,
    countryCode: us.dial,
    phone: "",
    city: "",
    state: "",
    contactPreference: "",
    consent: false,
    newsletterOptIn: false,
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleModelCustom: "",
    vehicleColor: "",
    acquisition: "",
    budget: "",
    downPayment: "",
    creditRange: "",
    timeline: "",
    tradeIn: "",
    heardAbout: "",
    referralName: "",
    notes: "",
    quotedPayment: "",
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    source: "contact-page",
    website: "",
  };
  PREFILL_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) state[k] = v.slice(0, 200);
  });
  return normalizePrefill(state);
};

const budgetFromNumber = (raw) => {
  const n = Number(String(raw).replace(/[$,\s]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return "";
  return budgetOptions[budgetBrackets.findIndex((max) => n < max)];
};

// Map free-text query prefill onto the Step 2 select options.
const normalizePrefill = (state) => {
  const make = vehicleMakes.find((m) => m.toLowerCase() === state.vehicleMake.toLowerCase());
  if (state.vehicleMake && !make) {
    state.vehicleModelCustom = [state.vehicleMake, state.vehicleModel].filter(Boolean).join(" ");
    state.vehicleMake = "Other";
    state.vehicleModel = OTHER_MODEL;
  } else if (make) {
    state.vehicleMake = make;
    const model = getModels(make).find((m) => m.toLowerCase() === state.vehicleModel.toLowerCase());
    if (state.vehicleModel && !model) {
      state.vehicleModelCustom = state.vehicleModel;
      state.vehicleModel = OTHER_MODEL;
    } else if (model) state.vehicleModel = model;
  } else state.vehicleModel = "";
  if (state.budget && !budgetOptions.includes(state.budget)) state.budget = budgetFromNumber(state.budget);
  return state;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateStep1 = (v) => {
  const e = {};
  if (!v.firstName.trim()) e.firstName = "First name is required.";
  if (!v.lastName.trim()) e.lastName = "Last name is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!isPhoneComplete(v.phone, v.countryIso)) e.phone = "Enter a complete phone number.";
  if (!v.city.trim()) e.city = "City is required.";
  if (!v.state) e.state = "Select a state or region.";
  if (!v.contactPreference) e.contactPreference = "Pick at least one way to reach you.";
  if (!v.consent) e.consent = "Please agree so we can contact you.";
  return e;
};

const STEP2_REQUIRED = {
  vehicleYear: "Select a year.",
  vehicleMake: "Select a make.",
  vehicleModel: "Select a model.",
  vehicleColor: "Select a color.",
  acquisition: "Select how you'd like to buy.",
  budget: "Select a budget.",
  downPayment: "Select a down payment.",
  creditRange: "Select a credit profile.",
  timeline: "Select a timeline.",
  tradeIn: "Select a trade-in option.",
  heardAbout: "Let us know how you heard about us.",
};

export const validateStep2 = (v) => {
  const e = {};
  Object.entries(STEP2_REQUIRED).forEach(([k, msg]) => {
    if (!v[k]) e[k] = msg;
  });
  if (v.vehicleModel === OTHER_MODEL && !v.vehicleModelCustom.trim()) e.vehicleModelCustom = "Enter the model.";
  if (v.heardAbout === REFERRAL_OPTION && !v.referralName.trim()) e.referralName = "Let us know who sent you.";
  return e;
};

// Shape the form state into the /api/lead "lead" payload.
export const buildLeadPayload = (v) => {
  const { vehicleModelCustom, ...rest } = v;
  return {
    ...rest,
    type: "lead",
    source: "contact",
    vehicleModel: v.vehicleModel === OTHER_MODEL ? vehicleModelCustom.trim() : v.vehicleModel,
    referralName: v.heardAbout === REFERRAL_OPTION ? v.referralName.trim() : "",
  };
};
