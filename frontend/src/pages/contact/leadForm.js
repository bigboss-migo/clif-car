import { getCountry } from "@/config/countries";
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
