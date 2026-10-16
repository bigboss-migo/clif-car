import { isNanp } from "@/config/countries";

export const phoneDigits = (v) => String(v ?? "").replace(/\D/g, "");

const formatNanp = (d) => {
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const formatPhone = (value, iso) => {
  const d = phoneDigits(value);
  return isNanp(iso) ? formatNanp(d.slice(0, 10)) : d.slice(0, 14);
};

export const phonePlaceholder = (iso) => (isNanp(iso) ? "(555) 123-4567" : "123 456 789");

export const isPhoneComplete = (value, iso) => {
  const n = phoneDigits(value).length;
  return isNanp(iso) ? n === 10 : n >= 6 && n <= 14;
};
