import { Banknote, Briefcase, Receipt, TrendingUp } from "lucide-react";

export const facts = [
  { label: "Built for", value: "Business & 1099 income" },
  { label: "Score requirement", value: "No perfect credit needed" },
  { label: "Where it works", value: "All 50 states" },
];

export const whatItIs = [
  "Traditional auto lending leans almost entirely on a handful of credit bureau signals. If your income doesn't come on a W-2, that picture rarely tells the whole story.",
  "The Entrepreneur Loan starts somewhere else: your business activity, your deposits and the real context behind what you earn.",
  "We package that file and present it to lenders who actively fund entrepreneurs, so it lands in front of people who understand how business owners get paid.",
  "It isn't tied to one region, either. You can use it on a vehicle registered in any state.",
];

export const audiences = [
  {
    icon: Briefcase,
    title: "Business owners",
    body: "You run a company and your income shows up in business accounts rather than on a pay stub.",
  },
  {
    icon: Receipt,
    title: "1099 and self-employed buyers",
    body: "Contractors, freelancers and gig earners whose tax returns understate what they actually bring in.",
  },
  {
    icon: TrendingUp,
    title: "Thin or bruised credit",
    body: "A short credit history or a few past setbacks shouldn't outweigh steady, provable income today.",
  },
  {
    icon: Banknote,
    title: "Cash-heavy earners",
    body: "Strong earners with non-traditional paperwork who need a lender willing to look at deposits.",
  },
];

export const steps = [
  {
    title: "Tell us about your income and the car you want.",
    body: "Share how you earn, what you’re looking for, and what you’re comfortable spending.",
  },
  {
    title: "Find out what to prepare.",
    body: "We’ll help you understand what a lender may request to verify your income and review your application.",
  },
  {
    title: "Review any offers you receive.",
    body: "Compare the rate, loan term, down payment, and total cost before deciding. If you move forward, we’ll help coordinate the vehicle purchase.",
  },
];

// [CONFIRM] markers flag details the owner must verify before launch.
export const faqs = [
  {
    q: "What documents will I need?",
    a: "Depending on the lender, you may be asked for bank statements, tax returns, or other proof of income.",
  },
  {
    q: "Will there be a credit check?",
    a: "A lender may check your credit. Review the application disclosures before submitting to see what you’re authorizing.",
  },
  {
    q: "Will you run a credit check?",
    a: "Lenders may review your credit as part of their decision. We'll explain what kind of inquiry is involved before your file goes out, so there are no surprises. [CONFIRM: soft vs. hard inquiry policy]",
  },
  {
    q: "How long does approval take?",
    a: "Timing and availability vary by lender. Tell us where you plan to register the car so we can discuss your options.",
  },
  {
    q: "Is there a minimum credit score or time in business?",
    a: "Requirements vary by lender. Tell us how long you've been in business on the first call and we'll point you toward the lenders that fit.",
  },
  {
    q: "Can I use it outside my home state?",
    a: "Yes. The Entrepreneur Loan can be used on a vehicle registered in any of the 50 states.",
  },
];
