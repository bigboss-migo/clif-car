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
    title: "Tell us about the business",
    body: "A quick conversation about what you do, how you get paid and the car you have in mind.",
  },
  {
    title: "We build the file",
    body: "We organize your deposits, statements and income context into a clear, lender-ready package.",
  },
  {
    title: "We shop the network",
    body: "Your file goes to lenders who specialize in entrepreneurs, and we compare the offers side by side.",
  },
  {
    title: "Approval and delivery",
    body: "Once terms are set, we source the vehicle and deliver it to your door.",
  },
];
